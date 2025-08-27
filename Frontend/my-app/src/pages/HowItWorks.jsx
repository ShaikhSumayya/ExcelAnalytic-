import React from "react";
import { motion } from "framer-motion";
import { FaFileExcel, FaChartBar, FaLightbulb } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileExcel className="text-3xl text-violet-600" />,
      title: "1. Upload Your Excel File",
      description: "Drag and drop or browse your system to upload .xls or .xlsx files instantly.",
    },
    {
      icon: <FaChartBar className="text-3xl text-violet-600" />,
      title: "2. Generate Interactive Charts",
      description: "Watch your data turn into dynamic charts — bar, line, pie, and even 3D.",
    },
    {
      icon: <FaLightbulb className="text-3xl text-violet-600" />,
      title: "3. Gain Smart Insights",
      description: "Use AI-powered tools to summarize key trends and discover hidden patterns.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-violet-50 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-violet-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
