import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { 
  User, 
  Mail, 
  Trophy, 
  Target, 
  LogOut, 
  Calendar, 
  CheckCircle,
  TrendingUp,
  Award,
  Shield,
  Bookmark,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [solvedCount, setSolvedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          "https://dsa-tracker-0exz.onrender.com/api/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const progressData = res.data.progress || [];
        const solved = progressData.filter((p) => p.isSolved === true);
        
        setSolvedCount(solved.length);
        setTotalCount(progressData.length);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProgress();
    }
  }, [token]);

  const completionRate = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Check if user has Google profile picture
  const hasGooglePicture = user?.picture || user?.avatar || user?.profilePic;
  
  // Get first letter of name for fallback avatar
  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-12">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    {/* Profile Picture */}
                    {hasGooglePicture ? (
                      <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 overflow-hidden">
                        <img 
                          src={user.picture || user.avatar || user.profilePic} 
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    )}
                    
                    {/* Google Badge if picture exists */}
                    {hasGooglePicture && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-blue-500">
                        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                    )}
                    
                    {/* Default Badge if no Google picture */}
                    {!hasGooglePicture && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-1">
                      {user?.name || "DSA Learner"}
                    </h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                      <Mail className="w-4 h-4" />
                      <p className="text-sm">{user?.email || "No email available"}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20">
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm font-medium">DSA Learner</span>
                      </div>
                      {hasGooglePicture && (
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20">
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm font-medium">Google Account</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              
            </div>

            {/* Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Username</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user?.name || "Not available"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Email</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white truncate ml-2">
                    {user?.email || "Not available"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    {hasGooglePicture ? (
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    ) : (
                      <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">Login Method</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hasGooglePicture 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {hasGooglePicture ? 'Google Account' : 'Regular Account'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Account Status</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/progress")}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-white">View Progress</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Check your statistics</div>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/bookmarks")}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/30 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800 dark:text-white">Bookmarks</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Saved problems</div>
                  </div>
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full mt-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-600 dark:text-red-400">Logout</div>
                  <div className="text-sm text-red-500/70 dark:text-red-400/70">Sign out from your account</div>
                </div>
              </button>
            </div>

            {/* Achievement Preview */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Achievement Preview
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">Problem Solver</div>
                    <div className="text-sm text-gray-300">
                      Solved {solvedCount} problems
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">Consistency</div>
                    <div className="text-sm text-gray-300">
                      {completionRate >= 50 ? "Great progress!" : "Keep going!"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-center text-gray-300 text-sm">
                  {solvedCount === 0 
                    ? "Start solving problems to unlock achievements!" 
                    : solvedCount < 10 
                    ? "You're just getting started! Keep solving!" 
                    : "You're on fire! Keep up the great work!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;