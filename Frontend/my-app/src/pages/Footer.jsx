import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-violet-600 text-white py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo + Description */}
        <div>
          <h1 className="text-2xl font-bold mb-2">ExcelAnalytics</h1>
          <p className="text-sm text-violet-200">
            Empowering you to turn Excel data into powerful, visual insights —
            effortlessly.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-1">Quick Links</h2>
          <a href="/" className="hover:underline text-sm">Home</a>
          <a href="/upload" className="hover:underline text-sm">Upload</a>
          <a href="/admindashboard" className="hover:underline text-sm">Dashboard</a>
          <a href="/login" className="hover:underline text-sm">Login</a>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4 text-white text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-violet-300"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-violet-300"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-violet-300"><FaLinkedinIn /></a>
            <a href="#" aria-label="GitHub" className="hover:text-violet-300"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-violet-300 mt-10">
        &copy; {new Date().getFullYear()} ExcelAnalytics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
