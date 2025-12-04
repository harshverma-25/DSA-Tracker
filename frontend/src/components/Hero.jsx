const Hero = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* ✅ LEFT TEXT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Track Your <span className="text-blue-600">DSA Progress</span> Like a Pro 🚀
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Follow curated DSA sheets like Striver, TUF & Blind 75.
            Mark solved ✅, bookmark ⭐, and track your growth every day.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Start Practicing
            </button>

            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
              Explore Sheets
            </button>
          </div>
        </div>

        {/* ✅ RIGHT SIDE (OPTIONAL IMAGE / PLACEHOLDER) */}
        <div className="hidden md:flex justify-center">
          <div className="w-80 h-80 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-6xl">💻</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
