import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex">
      {/* ✅ SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6">👑 Admin Panel</h2>

        <button
          onClick={() => navigate("/admin/create-sheet")}
          className="text-left px-4 py-2 hover:bg-gray-700 rounded"
        >
          ➕ Create Sheet
        </button>

        <button
  onClick={() => navigate("/admin/import-from-file")}
  className="text-left px-4 py-2 hover:bg-gray-700 rounded"
>
  📁 Import From File
</button>


        <button
        onClick={() => navigate("/admin/all-sheets")}
          className="text-left px-4 py-2 hover:bg-gray-700 rounded"
        >
          📄 All Sheets
        </button>

        <button
          onClick={logout}
          className="mt-auto text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          🚪 Logout
        </button>
      </div>

      {/* ✅ MAIN AREA */}
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">
          Welcome Admin 👑
        </h1>

        <p className="text-gray-600">
          Select any option from the left to manage your DSA Tracker.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
