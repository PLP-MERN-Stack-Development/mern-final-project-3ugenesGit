import { useState } from 'react';

export const QrScanner = () => {
  const [result, setResult] = useState(null);

  const simulateScan = () => {
    setResult(`collector-${Math.random().toString(36).slice(2, 7)}`);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">QR verification</h3>
        <span className="text-xs text-slate-400">Beta</span>
      </div>
      <div className="mt-3 rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        <p>Use the WasteWise collector app to scan this QR.</p>
        <button
          onClick={simulateScan}
          className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-white text-xs font-semibold"
        >
          Simulate scan
        </button>
        {result && <p className="mt-2 text-emerald-600 font-semibold">Verified: {result}</p>}
      </div>
    </div>
  );
};

