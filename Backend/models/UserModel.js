import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

// const excelSchema = new mongoose.Schema({}, { strict: false });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
// const ExcelData = mongoose.models.ExcelData || mongoose.model("ExcelData", excelSchema);

export default UserModel;
