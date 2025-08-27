import mongoose from "mongoose";

const excelRecordSchema = new mongoose.Schema(
  {
    fileName: String,              // original uploaded file name
    uploadedBy: String,           // user ID, email, or name (optional)
    tags: [String],               // optional array of tags
    data: mongoose.Schema.Types.Mixed, // Excel row contents
  },
  { timestamps: true }
);

const ExcelRecord = mongoose.model("ExcelRecord", excelRecordSchema);
export default ExcelRecord;
