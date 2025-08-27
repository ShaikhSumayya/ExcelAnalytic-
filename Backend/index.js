import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './db/dbConnection.js';
import Userrouter from './routes/reglog.js';
import excelRoutes from "./routes/excelRoutes.js";
import multer from 'multer';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/user', Userrouter);
// app.use('/api', excelUploadRoute);


app.use("/api", excelRoutes); 

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ⚠️ Must come after your routes
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message?.includes("Only .xls or .xlsx files are allowed!")) {
    return res.status(400).json({ message: err.message });
  }

  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


// app.use("/api", userRoutes);
app.use("/api/users", userRoutes);





app.listen(port, () => {
  console.log(`✅ Server started at http://localhost:${port}`);
});