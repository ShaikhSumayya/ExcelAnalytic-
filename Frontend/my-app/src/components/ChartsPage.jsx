import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import toast, { Toaster } from "react-hot-toast";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', taskCompleted: 5, workCompleted: 10, pending: 3, continue: 2, need1Month: 1, hr1: 2, hr2: 4, hr3: 1, hr24: 1 },
  { name: 'Feb', taskCompleted: 8, workCompleted: 12, pending: 5, continue: 3, need1Month: 2, hr1: 3, hr2: 5, hr3: 2, hr24: 1 },
  { name: 'Mar', taskCompleted: 10, workCompleted: 15, pending: 2, continue: 4, need1Month: 1, hr1: 2, hr2: 3, hr3: 3, hr24: 2 },
  { name: 'Apr', taskCompleted: 6, workCompleted: 9, pending: 4, continue: 1, need1Month: 3, hr1: 1, hr2: 2, hr3: 4, hr24: 1 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function ChartsPage() {
  const [chartType, setChartType] = useState('');
  const [xAxisKey, setXAxisKey] = useState('');
  const [yAxisKey, setYAxisKey] = useState('');

  const downloadChart = () => {
    const node = document.getElementById('chart-container');
    if (!node) return;

    htmlToImage.toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${chartType}_chart_${xAxisKey}_${yAxisKey}.png`;
        link.href = dataUrl;
        link.click();

        toast.success("Chart downloaded!");

        // Reset selections after download
        setChartType('');
        setXAxisKey('');
        setYAxisKey('');
      })
      .catch((err) => {
        console.error("Download failed", err);
        toast.error("❌ Download failed. Try again!");
      });
  };

  const xAxisLabels = {
    "": "-- Select X-Axis --",
    taskCompleted: '✅ Task Completed',
    pending: '⏳ Pending',
    continue: '🔁 Continue',
    need1Month: '📆 Need 1 Month',
  };

  const yAxisLabels = {
    "": "-- Select Y-Axis --",
    hr1: '🕐 1 hr',
    hr2: '🕑 2 hr',
    hr3: '🕒 3 hr',
    hr24: '⏰ 24 hr',
  };

  const chartTypeLabel = {
    line: '📈 Line',
    bar: '📊 Bar',
    pie: '🥧 Pie',
    radar: '🧭 Radar',
  };

  // Button enabled only when all selected
  const isDownloadEnabled = chartType && xAxisKey && yAxisKey;

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false}/>

      <h2 className="text-2xl font-bold mb-6 text-indigo-700">📊 Data Visualization Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Chart Type</label>
          <select
            className="p-2 rounded bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="line">📈 Line</option>
            <option value="bar">📊 Bar</option>
            <option value="pie">🥧 Pie</option>
            <option value="radar">🧭 Radar</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">X-Axis</label>
          <select
            className="p-2 rounded bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
            value={xAxisKey}
            onChange={(e) => setXAxisKey(e.target.value)}
          >
            {Object.entries(xAxisLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Y-Axis</label>
          <select
            className="p-2 rounded bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-400"
            value={yAxisKey}
            onChange={(e) => setYAxisKey(e.target.value)}
          >
            {Object.entries(yAxisLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={downloadChart}
          disabled={!isDownloadEnabled}
          className={`px-4 py-2 rounded transition ${
            isDownloadEnabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          ⬇️ Download Chart
        </button>
      </div>

      {isDownloadEnabled && (
        <div
          id="chart-container"
          className="bg-white p-6 rounded-lg shadow-md w-full space-y-4"
        >
          {/* Display Selections */}
          <div className="text-gray-800 space-y-2 text-sm md:text-base">
            <p><strong>Chart Type:</strong> {chartTypeLabel[chartType]}</p>
            <p><strong>X-Axis:</strong> {xAxisLabels[xAxisKey]}</p>
            <p><strong>Y-Axis:</strong> {yAxisLabels[yAxisKey]}</p>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' && (
              <LineChart data={chartData}>
                <Line type="monotone" dataKey={yAxisKey} stroke="#3b82f6" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            )}

            {chartType === 'bar' && (
              <BarChart data={chartData}>
                <Bar dataKey={yAxisKey} fill="#10b981" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </BarChart>
            )}

            {chartType === 'pie' && (
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey={xAxisKey}
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}

            {chartType === 'radar' && (
              <RadarChart outerRadius={150} width={730} height={400} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name="Hours" dataKey={yAxisKey} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
