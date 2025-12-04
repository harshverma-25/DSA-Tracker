import { useEffect, useState } from "react";
import axios from "axios";

const AdminAllSheets = () => {
  const [sheets, setSheets] = useState([]);
  const token = localStorage.getItem("adminToken");

  // ✅ Fetch all sheets from DB
  const fetchSheets = async () => {
    try {
      const res = await axios.get("https://dsa-tracker-0exz.onrender.com/api/sheets");
      setSheets(res.data.sheets);
    } catch (error) {
      console.error("Fetch sheets error:", error);
      alert("❌ Failed to fetch sheets");
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  // ✅ DELETE SHEET FUNCTION
  const deleteSheet = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sheet?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://dsa-tracker-0exz.onrender.com/api/sheets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Sheet deleted successfully");

      // ✅ Instantly remove from UI
      setSheets(sheets.filter((sheet) => sheet._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete sheet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">📄 All Sheets</h1>

      {sheets.length === 0 ? (
        <p className="text-gray-600">No Sheets Found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sheets.map((sheet) => (
            <div
              key={sheet._id}
              className="bg-white p-6 rounded shadow"
            >
              {sheet.image && (
                <img
                  src={sheet.image}
                  alt={sheet.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}

              <h2 className="text-xl font-bold mb-2">{sheet.title}</h2>
              <p className="text-gray-600 mb-4">
                {sheet.description}
              </p>

              <button
                onClick={() => deleteSheet(sheet._id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                ❌ Delete Sheet
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllSheets;
