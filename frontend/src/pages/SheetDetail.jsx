import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SheetDetail = () => {
  const { sheetId } = useParams();

  const [sheet, setSheet] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState({});
  const [solved, setSolved] = useState({});
  const [openTopic, setOpenTopic] = useState(null); // ✅ which topic is expanded

  const token = localStorage.getItem("token");

  // ✅ FETCH SHEET + QUESTIONS + SOLVED PROGRESS
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Sheet info
        const sheetRes = await axios.get(
          `https://dsa-tracker-0exz.onrender.com/api/sheets/${sheetId}`
        );
        setSheet(sheetRes.data.sheet);

        // 2) Questions
        const quesRes = await axios.get(
          `https://dsa-tracker-0exz.onrender.com/api/questions/${sheetId}`
        );
        setQuestions(quesRes.data.questions);

        // 3) Solved progress (only if logged in)
        if (token) {
          const progressRes = await axios.get(
            "https://dsa-tracker-0exz.onrender.com/api/progress",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const solvedMapFromDB = {};
          progressRes.data.progress.forEach((p) => {
            solvedMapFromDB[p.questionId] = p.isSolved;
          });

          setSolved(solvedMapFromDB);
        }
      } catch (error) {
        console.error("Sheet detail error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetId, token]);

  // ✅ TOGGLE SOLVED
  const toggleSolved = async (questionId) => {
    try {
      const res = await axios.post(
        "https://dsa-tracker-0exz.onrender.com/api/progress",
        { questionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSolved((prev) => ({
        ...prev,
        [questionId]: res.data.progress.isSolved,
      }));
    } catch (error) {
      console.error("Toggle solved error:", error);
    }
  };

  // ✅ ADD BOOKMARK
  const addBookmark = async (questionId) => {
    try {
      await axios.post(
        "https://dsa-tracker-0exz.onrender.com/api/bookmarks",
        { questionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookmarked((prev) => ({
        ...prev,
        [questionId]: true,
      }));
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  // ✅ REMOVE BOOKMARK
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

      setBookmarked((prev) => ({
        ...prev,
        [questionId]: false,
      }));
    } catch (error) {
      console.error("Remove bookmark error:", error);
    }
  };

  // ✅ GROUP QUESTIONS BY TOPIC
  const groupedByTopic = questions.reduce((acc, q) => {
    const topic = q.topic || "Other"; // make sure your JSON has `topic`
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(q);
    return acc;
  }, {});

  const topics = Object.keys(groupedByTopic);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-white">
        Loading sheet...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* ✅ SHEET HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10">
        📄 {sheet?.title}
      </h1>

      {topics.length === 0 ? (
        <p className="text-center text-[var(--color-muted)]">
          No questions found.
        </p>
      ) : (
        <div className="space-y-6 max-w-6xl mx-auto">
          {topics.map((topic) => {
            const topicQuestions = groupedByTopic[topic];
            const solvedCount = topicQuestions.filter(
              (q) => solved[q._id]
            ).length;
            const isOpen = openTopic === topic;

            return (
              <div
                key={topic}
                className="border border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]/70 shadow-[var(--shadow-soft)]"
              >
                {/* ✅ TOPIC ROW (CLICK TO TOGGLE) */}
                <button
                  onClick={() =>
                    setOpenTopic((prev) => (prev === topic ? null : topic))
                  }
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      {topic}
                    </h2>
                    <p className="text-xs text-[var(--color-muted)] mt-1">
                      {solvedCount}/{topicQuestions.length} solved
                    </p>
                  </div>

                  <span className="text-sm text-[var(--color-muted)]">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>

                {/* ✅ QUESTIONS LIST (ONLY IF OPEN) */}
                {isOpen && (
                  <div className="px-5 pb-5">
                    {/* table header */}
                    <div className="grid grid-cols-6 gap-4 text-xs text-[var(--color-muted)] border-t border-[var(--color-border)] pt-3 pb-2">
                      <div className="text-center">Status</div>
                      <div className="col-span-2">Problem</div>
                      <div className="text-center">Practice</div>
                      <div className="text-center">Bookmark</div>
                      <div className="text-center">Difficulty</div>
                    </div>

                    {/* rows */}
                    <div className="space-y-3 mt-1">
                      {topicQuestions.map((q) => (
                        <div
                          key={q._id}
                          className="grid grid-cols-6 gap-4 items-center bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-xl hover:shadow-[var(--shadow-glow)] transition"
                        >
                          {/* STATUS */}
                          <div className="flex justify-center">
                            <input
                              type="checkbox"
                              checked={solved[q._id] || false}
                              onChange={() => toggleSolved(q._id)}
                              className="w-5 h-5 accent-green-500"
                            />
                          </div>

                          {/* PROBLEM */}
                          <div className="col-span-2 text-sm font-medium">
                            {q.title}
                          </div>

                          {/* PRACTICE */}
                          <div className="flex justify-center">
                            <a
                              href={q.practiceLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1 bg-[var(--color-primary)] text-white rounded text-xs text-center hover:opacity-90"
                            >
                              Practice
                            </a>
                          </div>

                          {/* BOOKMARK */}
                          <div className="flex justify-center">
                            {bookmarked[q._id] ? (
                              <button
                                onClick={() => removeBookmark(q._id)}
                                className="text-yellow-400 text-xl"
                              >
                                ⭐
                              </button>
                            ) : (
                              <button
                                onClick={() => addBookmark(q._id)}
                                className="text-gray-500 text-xl hover:text-yellow-400"
                              >
                                ☆
                              </button>
                            )}
                          </div>

                          {/* DIFFICULTY */}
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
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SheetDetail;
