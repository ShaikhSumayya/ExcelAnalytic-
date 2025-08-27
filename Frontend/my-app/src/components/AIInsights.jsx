import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AIInsights() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [selectedColumn, setSelectedColumn] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils
        .sheet_to_json(worksheet, { defval: "" })
        .map((row) => {
          const fixedRow = {};
          Object.keys(row).forEach((key) => {
            const val = row[key];
            fixedRow[key] = isNaN(val) ? val : Number(val);
          });
          return fixedRow;
        });

      setData(parsedData);

      //  Remove __EMPTY headers & only keep real headers
      const cleanHeaders = parsedData.length
        ? Object.keys(parsedData[0]).filter(
            (h) => h && !h.startsWith("__EMPTY")
          )
        : [];

      setHeaders(cleanHeaders);
    };
    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    if (!data.length) {
      toast.error("⚠️ Please upload a file before downloading!");
      return;
    }

    const summary = headers.map((header) => {
      const stats = getStats(header);
      return stats
        ? {
            Column: header,
            Average: stats.avg.toFixed(2),
            Min: stats.min,
            Max: stats.max,
          }
        : { Column: header, Note: "Non-numeric column" };
    });

    const workbook = XLSX.utils.book_new();
    const sheetData = XLSX.utils.json_to_sheet(data);
    const sheetSummary = XLSX.utils.json_to_sheet(summary);

    XLSX.utils.book_append_sheet(workbook, sheetData, "Raw Data");
    XLSX.utils.book_append_sheet(workbook, sheetSummary, "AI Insights");

    XLSX.writeFile(workbook, "AI_Insights_Export.xlsx");

    //  Reset UI
    setData([]);
    setHeaders([]);
    setSelectedColumn("");
    setChartType("line");
    if (fileInputRef.current) fileInputRef.current.value = "";

    toast.success("AI Insights exported successfully!");
  };

  const isNumeric = (val) => typeof val === "number" && !isNaN(val);

  const getStats = (key) => {
    const values = data.map((row) => row[key]).filter(isNumeric);
    if (!values.length) return null;
    const total = values.reduce((a, b) => a + b, 0);
    const avg = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { avg, min, max };
  };

  const chartData = data.map((row, index) => ({
    index,
    value: row[selectedColumn]
  }));

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">AI Insights from Excel</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {headers.length > 0 && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600 font-semibold">🧾 Headers: {headers.join(", ")}</p>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download Data
            </button>
          </div>

          <div className="mb-4">
            <label className="mr-2 font-medium">📊 Chart Column:</label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="">Select a numeric column</option>
              {headers.map((header) =>
                getStats(header) ? (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ) : null
              )}
            </select>

            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="ml-2 border p-1 rounded"
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
          </div>

          {selectedColumn && getStats(selectedColumn) && (
            <div className="mb-4">
              <p className="text-gray-700">
                📈 <strong>{selectedColumn}:</strong> Avg: {getStats(selectedColumn).avg.toFixed(2)} |
                Min: {getStats(selectedColumn).min} | Max: {getStats(selectedColumn).max}
              </p>
            </div>
          )}

          {selectedColumn && getStats(selectedColumn) && (
            <div className="bg-gray-100 p-4 rounded">
              {chartType === "line" ? (
                <LineChart width={500} height={300} data={chartData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              ) : (
                <BarChart width={500} height={300} data={chartData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="index" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              )}
            </div>
          )}
        </>
      )}

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
