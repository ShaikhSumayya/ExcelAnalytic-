import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB = async (url) => {
    if (!url) {
        console.error("Missing MongoDB URL or DB name");
        return;
    }

    try {
         await mongoose.connect(url, {
            dbName: "ExcelProject" // ✅ This tells Mongoose exactly where to store
        });
        console.log("✅ Connected to MongoDB Atlas successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
};

export default connectDB;
