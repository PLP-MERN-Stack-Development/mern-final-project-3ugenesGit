import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ImpactTrendChart = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Reports',
        data: labels.map(() => Math.round(Math.random() * 20) + 10),
        borderColor: '#0f91d2',
        backgroundColor: 'rgba(15,145,210,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { display: false }, beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Weekly impact</h3>
        <span className="text-xs text-slate-400">Reports/day</span>
      </div>
      <Line data={data} options={options} height={120} />
    </div>
  );
};

