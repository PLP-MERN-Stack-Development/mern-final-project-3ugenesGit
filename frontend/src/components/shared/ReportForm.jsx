import { useState } from 'react';
import { queueOfflineReport } from '@/features/reports/reportSlice';
import { useDispatch } from 'react-redux';
import { useReports } from '@/hooks/useReports';
import { useGeoLocation } from '@/hooks/useGeoLocation';

const categories = ['plastic', 'organic', 'metal', 'glass', 'e-waste', 'hazardous'];

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const ReportForm = () => {
  const dispatch = useDispatch();
  const { submitReport } = useReports({ mine: true });
  const { position } = useGeoLocation();
  const [form, setForm] = useState({
    category: 'plastic',
    quantity: 1,
    notes: '',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      location: {
        coordinates: position ? [position.lng, position.lat] : [0, 0],
        address: 'Captured via GPS',
      },
      photo,
    };

    if (!navigator.onLine) {
      const offlinePayload = { ...payload };
      if (photo) {
        offlinePayload.photoDataUrl = await fileToDataUrl(photo);
      }
      delete offlinePayload.photo;
      dispatch(queueOfflineReport(offlinePayload));
      return;
    }
    setLoading(true);
    await submitReport(payload);
    setLoading(false);
    setForm({ category: 'plastic', quantity: 1, notes: '' });
    setPhoto(null);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-4"
    >
      <div>
        <label className="text-sm font-semibold text-slate-600">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600">Quantity (kg)</label>
        <input
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) => setForm((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600">Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
          rows={3}
          placeholder="Include extra details for collectors"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600">Photo evidence</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0])}
          className="mt-1 w-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-primary-500 py-2 font-semibold text-white shadow-lg shadow-primary-500/30"
        disabled={loading}
      >
        {loading ? 'Submitting…' : 'Submit report'}
      </button>
    </form>
  );
};

