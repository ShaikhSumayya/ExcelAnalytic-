import React, { useState, useRef } from "react";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { UploadCloud } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [uploadedBy, setUploadedBy] = useState(""); // new
  const [tags, setTags] = useState("");             // new
  const fileInputRef = useRef(null);

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      toast.error("Please upload a valid Excel file (.xlsx or .xls)");
      return;
    }
    setFileName(file.name);
    setFile(file);
    parseExcel(file);
  };

  const handleInputChange = (e) => handleFileUpload(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleUploadToServer = async () => {
    if (!file) {
      toast.error("Please choose a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", uploadedBy || "anonymous");
    formData.append("tags", JSON.stringify(tags.split(",").map(t => t.trim()).filter(Boolean)));

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await res.json();
      toast.success(result.message || "Upload successful");

      setFile(null);
      setFileName("");
      setExcelData([]);
      setUploadedBy("");
      setTags("");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "Upload failed. Please try again.");
    }
  };

  const handleDownloadFromServer = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/download");

      if (!res.ok) throw new Error("Failed to download Excel");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ExportedData.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Download failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] px-4 py-12 flex items-center justify-center bg-gradient-to-br from-violet-100 to-white">
        <div className="w-full max-w-3xl bg-white/90 p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl font-extrabold text-violet-700 mb-6 animate-pulse">Upload Your Excel File</h2>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="cursor-pointer border-2 border-dashed border-violet-300 rounded-xl p-10 bg-white/60 hover:border-violet-500"
          >
            <UploadCloud className="mx-auto mb-3 w-12 h-12 text-violet-600 animate-bounce" />
            <p className="text-lg font-semibold text-gray-700">Drag & Drop or Click to Browse</p>
            <input type="file" accept=".xlsx,.xls" onChange={handleInputChange} ref={fileInputRef} className="hidden" />
          </div>

          {fileName && (
            <div className="mt-6 flex items-center justify-between bg-violet-50 border px-4 py-2 rounded-lg">
              <span>Selected File: <strong>{fileName}</strong></span>
              <button
                onClick={() => {
                  setFile(null);
                  setFileName("");
                  setExcelData([]);
                  fileInputRef.current.value = "";
                }}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </div>
          )}

          {/* Metadata inputs */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Uploaded By</label>
              <input
                type="text"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. finance, report, q2"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {file && (
              <button onClick={handleUploadToServer} className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700">Upload to Server</button>
            )}
            <button onClick={handleDownloadFromServer} className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Download from Server</button>
          </div>

          {excelData.length > 0 && (
            <div className="mt-10 overflow-auto max-h-80 border border-gray-200 rounded-md">
              <table className="min-w-full text-sm">
                <thead className="bg-violet-100">
                  <tr>
                    {excelData[0].map((col, i) => (
                      <th key={i} className="px-4 py-2 font-semibold border-b">{col || `Column ${i + 1}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.slice(1).map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-violet-50">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 border-b">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default Upload;
