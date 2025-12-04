import { useState } from "react";
import axios from "axios";

const AdminCreateSheet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return alert("Please fill title and description");
    }

    try {
      setLoading(true);

      await axios.post(
        "https://dsa-tracker-0exz.onrender.com/api/sheets",
        { title, description, image }, // ✅ image sent
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Sheet created successfully");

      // ✅ Clear form
      setTitle("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.error("Create sheet error:", error);
      alert(error.response?.data?.message || "Failed to create sheet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          ➕ Create New Sheet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ TITLE */}
          <input
            type="text"
            placeholder="Sheet Title (e.g. Striver Sheet)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          {/* ✅ DESCRIPTION */}
          <textarea
            placeholder="Sheet Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            rows="4"
          />

          {/* ✅ IMAGE URL (NEW) */}
          <input
            type="text"
            placeholder="Sheet Image URL (https://...)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Sheet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateSheet;
