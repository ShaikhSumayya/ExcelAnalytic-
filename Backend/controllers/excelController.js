import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import ExcelRecord from "../models/ExcelUserModel.js";

const uploadExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join("uploads", req.file.filename);

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (!jsonData.length) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Uploaded file is empty." });
    }

    // Extract metadata from request
    const fileName = req.file.originalname;
    const uploadedBy = req.body.uploadedBy || "anonymous";
    let tags = [];

    try {
      tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    } catch (parseError) {
      return res.status(400).json({ message: "Invalid JSON in 'tags' field." });
    }

    // Prepare data to insert
    const wrappedData = jsonData.map(row => ({
      fileName,
      uploadedBy,
      tags,
      data: row,
    }));

    await ExcelRecord.insertMany(wrappedData);

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: "Excel data Saved",
      count: wrappedData.length,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Failed to upload and process Excel file" });
  }
};





 const exportToExcel = async (req, res) => {
  try {
    const records = await ExcelRecord.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    const data = records.map(r => r.data);
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Failed to export data" });
  }
};


export {uploadExcel, exportToExcel };