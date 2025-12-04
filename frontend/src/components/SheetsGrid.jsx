import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SheetsGrid = () => {
  const [sheets, setSheets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await axios.get("https://dsa-tracker-0exz.onrender.com/api/sheets");
        setSheets(res.data.sheets);
      } catch (error) {
        console.error("Error fetching sheets:", error);
      }
    };

    fetchSheets();
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* ✅ SECTION TITLE */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          📘 Popular DSA Sheets
        </h2>

        {/* ✅ GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sheets.map((sheet) => (
            <div
              key={sheet._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* ✅ SHEET IMAGE */}
              {sheet.image ? (
                <img
                  src={sheet.image}
                  alt={sheet.title}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* ✅ CARD CONTENT */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {sheet.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {sheet.description || "No description available"}
                </p>

                <button
                  onClick={() => navigate(`/sheet/${sheet._id}`)}
                  className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Open Sheet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SheetsGrid;
