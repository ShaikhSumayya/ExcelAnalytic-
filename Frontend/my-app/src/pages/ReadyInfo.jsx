import React from "react";
import info from '../assets/excel2.png';
import { motion } from "framer-motion";

const ReadyInfo = () => {
  return (
    <section className="w-full bg-gradient-to-br from-violet-50 to-violet-100 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={info} alt="Excel Analytics Visual" className="w-full max-w-md" />
        </motion.div>

        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
           <motion.h1
    className="text-4xl md:text-5xl font-bold text-violet-800 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    Ready to Analyze Smarter?
  </motion.h1>
          <p className="text-gray-700 text-lg mb-4">
            Upload Excel files and watch real-time visualizations bring your data to life. Gain insights, create reports, and make smarter decisions instantly.
          </p>
          <p className="text-sm text-gray-600 mb-6">Start for free — no account required.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition shadow-md"
          >
            Explore Dashboard
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyInfo;