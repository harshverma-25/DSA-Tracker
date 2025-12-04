import { useEffect, useState } from "react";
import axios from "axios";

const AdminImportFromFile = () => {
  const [sheets, setSheets] = useState([]);
  const [sheetId, setSheetId] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  // ✅ Fetch all sheets for dropdown
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await axios.get("https://dsa-tracker-0exz.onrender.com/api/sheets");
        setSheets(res.data.sheets);
      } catch (error) {
        console.error("Fetch sheets error:", error);
      }
    };

    fetchSheets();
  }, []);

  const handleImport = async (e) => {
    e.preventDefault();

    if (!sheetId || !fileName) {
      return alert("Please select a sheet and enter file name");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://dsa-tracker-0exz.onrender.com/api/questions/seed-from-file",
        {
          sheetId,
          fileName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "✅ Import successful");
      setFileName("");
    } catch (error) {
      console.error("Import error:", error);
      alert(error.response?.data?.message || "Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          📁 Import Questions From File
        </h1>

        <form onSubmit={handleImport} className="space-y-4">
          {/* ✅ SELECT SHEET */}
          <select
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select a Sheet</option>
            {sheets.map((sheet) => (
              <option key={sheet._id} value={sheet._id}>
                {sheet.title}
              </option>
            ))}
          </select>

          {/* ✅ FILE NAME INPUT */}
          <input
            type="text"
            placeholder="Enter file name (e.g. testSheet.json)"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          {/* ✅ SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Importing..." : "✅ Import Questions"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          File must exist in <b>backend/seedData/</b>
        </p>
      </div>
    </div>
  );
};

export default AdminImportFromFile;
