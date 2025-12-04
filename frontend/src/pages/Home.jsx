import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Target, BarChart3, Users, CheckCircle2, BookOpen, Trophy, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* ✅ HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20 pt-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>Your Ultimate DSA Companion</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              Master DSA
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100">
              Like Never Before
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Track solved questions, visualize your progress, and accelerate your interview preparation journey with intelligent progress tracking.
          </p>

          {/* Stats Row */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Target, label: "Progress Tracking", value: "Visual" },
              { icon: Users, label: "Community", value: "Active" },
              { icon: CheckCircle2, label: "Solutions", value: "Tracked" },
              { icon: TrendingUp, label: "Analytics", value: "Smart" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/sheets")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-3">
                Browse DSA Sheets
                <BookOpen className="group-hover:scale-110 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/progress")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center justify-center gap-3">
                View Progress
                <BarChart3 className="group-hover:scale-110 transition-transform" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* ✅ FEATURES SECTION */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Why Choose DSA Tracker?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to master Data Structures & Algorithms efficiently
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Progress Tracking",
                description: "Visualize your learning journey with detailed progress charts and statistics",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50 dark:bg-blue-900/20",
                borderColor: "border-blue-200 dark:border-blue-700/30"
              },
              {
                icon: Trophy,
                title: "Achievements",
                description: "Unlock achievements and milestones as you solve more problems",
                color: "from-amber-500 to-orange-500",
                bgColor: "bg-amber-50 dark:bg-amber-900/20",
                borderColor: "border-amber-200 dark:border-amber-700/30"
              },
              {
                icon: BookOpen,
                title: "Curated Sheets",
                description: "Access structured DSA sheets categorized by difficulty and topics",
                color: "from-emerald-500 to-green-500",
                bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
                borderColor: "border-emerald-200 dark:border-emerald-700/30"
              },
              {
                icon: Zap,
                title: "Quick Analytics",
                description: "Get insights on your strengths and areas needing improvement",
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-50 dark:bg-purple-900/20",
                borderColor: "border-purple-200 dark:border-purple-700/30"
              },
              {
                icon: CheckCircle2,
                title: "Problem Tracking",
                description: "Mark problems as solved and track your completion rate",
                color: "from-green-500 to-teal-500",
                bgColor: "bg-green-50 dark:bg-green-900/20",
                borderColor: "border-green-200 dark:border-green-700/30"
              },
              {
                icon: BarChart3,
                title: "Performance Insights",
                description: "Detailed analytics to optimize your learning strategy",
                color: "from-indigo-500 to-purple-500",
                bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
                borderColor: "border-indigo-200 dark:border-indigo-700/30"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${feature.bgColor} border ${feature.borderColor} shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
       
      </div>
    </div>
  );
};

export default Home;