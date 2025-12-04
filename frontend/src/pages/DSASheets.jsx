import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  Filter, 
  Search,
  TrendingUp,
  Target,
  BookOpen,
  Layers
} from "lucide-react";

const DSASheets = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await axios.get("https://dsa-tracker-0exz.onrender.com/api/sheets");
        setSheets(res.data.sheets);
      } catch (error) {
        console.error("Fetch sheets error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  // Filter sheets based on search and difficulty
  const filteredSheets = sheets.filter(sheet => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sheet.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === "all" || 
                             sheet.difficulty?.toLowerCase() === selectedDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'from-emerald-500 to-green-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Loading DSA sheets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

        {/* Sheets Grid */}
        {filteredSheets.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No sheets found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSheets.map((sheet, index) => (
              <motion.div
                key={sheet._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/sheet/${sheet._id}`)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(sheet.difficulty)} text-white text-xs font-semibold`}>
                    {sheet.difficulty || "All Levels"}
                  </div>
                </div>

                {/* Image */}
                {sheet.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sheet.image}
                      alt={sheet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {sheet.title}
                    </h3>
                    <BarChart3 className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {sheet.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{sheet.problems?.length || "150+"} Problems</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Trackable</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Start practicing
                      </span>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                        <span>Open Sheet</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DSASheets;