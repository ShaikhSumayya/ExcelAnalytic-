import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {uploadExcel, exportToExcel} from "../controllers/excelController.js";
import { getLineChartData } from "../controllers/chartController.js";
const router = express.Router();

// Route to upload Excel file
router.post("/upload", upload.single("file"), uploadExcel);

// Route to export data as Excel file
router.get("/download", exportToExcel);



router.get("/line-chart-data", getLineChartData);



export default router;





