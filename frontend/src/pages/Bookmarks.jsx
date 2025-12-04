import { useEffect, useState } from "react";
import axios from "axios";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [solvedMap, setSolvedMap] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Get bookmarks
        const bookmarkRes = await axios.get(
          "https://dsa-tracker-0exz.onrender.com/api/bookmarks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookmarks(bookmarkRes.data.bookmarks);

        // ✅ Get solved progress
        const progressRes = await axios.get(
          "https://dsa-tracker-0exz.onrender.com/api/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const map = {};
        progressRes.data.progress.forEach((p) => {
          map[p.questionId] = p.isSolved;
        });

        setSolvedMap(map);
      } catch (error) {
        console.error("Error loading bookmark data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // ✅ REMOVE BOOKMARK (unchanged)
  const removeBookmark = async (questionId) => {
    try {
      await axios.delete(
        `https://dsa-tracker-0exz.onrender.com/api/bookmarks/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookmarks((prev) =>
        prev.filter((b) => b.questionId._id !== questionId)
      );
    } catch (error) {
      console.error("Remove bookmark error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* ✅ PAGE HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10">
        ⭐ Your Bookmarked Questions
      </h1>

      {/* ✅ TABLE HEADER */}
      <div className="grid grid-cols-6 gap-4 text-sm text-[var(--color-muted)] border-b border-[var(--color-border)] pb-3 mb-4">
        <div className="text-center">Status</div>
        <div className="col-span-2">Problem</div>
        <div className="text-center">Practice</div>
        <div className="text-center">Remove</div>
        <div className="text-center">Difficulty</div>
      </div>

      {bookmarks.length === 0 ? (
        <p className="text-center text-[var(--color-muted)] mt-20">
          You have no bookmarked questions.
        </p>
      ) : (
        <div className="space-y-3 max-w-5xl mx-auto">
          {bookmarks.map((b) => {
            const q = b.questionId;
            const isSolved = solvedMap[q._id];

            return (
              <div
                key={b._id}
                className="grid grid-cols-6 gap-4 items-center bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-xl hover:shadow-[var(--shadow-glow)] transition"
              >
                {/* ✅ STATUS */}
                <div className="flex justify-center text-xl">
                  {isSolved ? "✅" : "⬜"}
                </div>

                {/* ✅ PROBLEM */}
                <div className="col-span-2 font-medium">
                  {q.title}
                </div>

                {/* ✅ PRACTICE */}
                <div className="flex justify-center">
                  <a
                    href={q.practiceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-[var(--color-primary)] text-white rounded text-xs hover:opacity-90"
                  >
                    Practice
                  </a>
                </div>

                {/* ✅ REMOVE BOOKMARK */}
                <div className="flex justify-center">
                  <button
                    onClick={() => removeBookmark(q._id)}
                    className="text-red-400 text-xl hover:scale-110 transition"
                  >
                    ❌
                  </button>
                </div>

                {/* ✅ DIFFICULTY */}
                <div className="flex justify-center">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      q.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : q.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
