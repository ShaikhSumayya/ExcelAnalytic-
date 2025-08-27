// import ExcelRecord from "../models/excelModel.js";

export const getLineChartData = async (req, res) => {
  try {
    const records = await ExcelRecord.find();
    const chartData = {};

    records.forEach((rec) => {
      const name = rec.fileName;
      if (!chartData[name]) {
        chartData[name] = { name, pv: 0, uv: 0 };
      }
      chartData[name].pv += 1; // row count
      chartData[name].uv += Object.keys(rec.data || {}).length; // field count
    });

    res.json(Object.values(chartData));
  } catch (err) {
    console.error("Error building chart data:", err);
    res.status(500).json({ message: "Failed to load chart data" });
  }
};
