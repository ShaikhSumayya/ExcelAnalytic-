import heroimg from '../assets/vibrant.png';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 overflow-hidden px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Left Text Section */}
        <div className="space-y-6">
          <span className="inline-block bg-blue-100 text-black-700 text-sm px-3 py-1 rounded-full font-medium">
            No-Code Analytics
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Visualize Your Data
            <br />
            <span className="text-violet-700">With Ease & Precision</span>
          </h1>
          <p className="text-lg text-gray-600">
            Just upload your Excel file. Let our intelligent engine convert your raw data into stunning visualizations — all in a few clicks.
          </p>
          <div>
            <button className="bg-violet-600 hover:bg-violet-800 text-white px-6 py-3 rounded-lg text-lg transition duration-300">
              Get Started Now
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-200 rounded-full blur-3xl opacity-50"></div>
          <img
            src={heroimg}
            alt="Data Visualization Illustration"
            className="relative z-10 w-full max-w-md mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
