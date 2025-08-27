import React from "react";

const InfoSection = () => {
  return (
    <section className="w-full bg-violet-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-violet-700 mb-4">
          Simplify Excel Data Upload & Visualization
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Discover seamless tools that help you analyze, visualize, and manage your Excel data with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">One-Click Excel Upload</h3>
            <p className="text-gray-600">
              Easily drag and drop your .xls or .xlsx files to start exploring. No complex imports or formatting required.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">Real-Time Charts</h3>
            <p className="text-gray-600">
              Generate live visualizations like bar, line, and pie charts that update as your data evolves.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">Download & Share</h3>
            <p className="text-gray-600">
              Export your visuals as images or PDFs for quick sharing with teams or clients.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">Upload History</h3>
            <p className="text-gray-600">
              Track and manage your previously uploaded files in a personal timeline view.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">Custom Chart Views</h3>
            <p className="text-gray-600">
              Choose from 2D/3D charts, adjust settings, and dive into details with intuitive controls.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-violet-600 mb-2">AI-Powered Summaries</h3>
            <p className="text-gray-600">
              Let built-in AI analyze patterns, highlight trends, and generate natural language summaries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
