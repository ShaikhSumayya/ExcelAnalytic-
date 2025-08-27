import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login from context

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!form.email || !form.password) {
      toast.error("Please fill in both fields");
      return;
    }

    try {
  const res = await axios.post("/user/login", form);
  const { token, role, name } = res.data; // 👈 include name

  // ✅ Save to localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("username", name); // 👈 this line is missing

  // ✅ Update global auth state
  login();

  toast.success("Login successful! Redirecting...");

  // ✅ Navigate based on role
  setTimeout(() => {
    if (role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate("/dashboard");
    }
  }, 1500);

    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
      <Footer />
    </>
  );
}
