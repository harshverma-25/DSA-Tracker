import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, User, LogOut, Bookmark, Home, BarChart3, Trophy, BookOpen } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user has Google profile picture
  const hasGooglePicture = user?.picture || user?.avatar || user?.profilePic;
  
  // Get first letter of name for fallback avatar
  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <>
      {/* ✅ GLASS NAVBAR - Enhanced */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* ✅ LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DSA Tracker
              </span>
            </div>

            {/* ✅ DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Home className="w-4 h-4" />
                Home
              </button>

              {/* ✅ DSA SHEETS LINK - Added */}
              <button
                onClick={() => navigate("/sheets")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <BookOpen className="w-4 h-4" />
                DSA Sheets
              </button>

              <button
                onClick={() => navigate("/bookmarks")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Bookmark className="w-4 h-4" />
                Bookmarks
              </button>

              {/* ✅ PROGRESS LINK - Only show when user is logged in */}
              {user && (
                <button
                  onClick={() => navigate("/progress")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <BarChart3 className="w-4 h-4" />
                  Progress
                </button>
              )}

              {/* ✅ AUTH AREA */}
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  Login / Signup
                </button>
              ) : (
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    {/* Profile Picture - Google or Fallback */}
                    {hasGooglePicture ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-300">
                        <img 
                          src={user.picture || user.avatar || user.profilePic} 
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {userInitial}
                      </div>
                    )}
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {user?.name || "User"}
                    </span>
                  </button>

                  {/* ✅ DROPDOWN MENU */}
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
                      <div className="p-2">
                        {/* User Info with Profile Picture */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-3 mb-2">
                            {/* Profile Picture in Dropdown */}
                            {hasGooglePicture ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img 
                                  src={user.picture || user.avatar || user.profilePic} 
                                  alt={user.name || "User"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                {userInitial}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || ""}</p>
                            </div>
                          </div>
                          {hasGooglePicture && (
                            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                              <svg className="w-3 h-3" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              <span>Google Account</span>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setShowMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/bookmarks");
                            setShowMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Bookmarks</span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/progress");
                            setShowMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Progress</span>
                        </button>

                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                        <button
                          onClick={() => {
                            logout();
                            setShowMenu(false);
                            navigate("/");
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ✅ MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* ✅ MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 animate-slideDown">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <Home className="w-5 h-5" />
                  Home
                </button>

                {/* ✅ DSA SHEETS LINK - Mobile - Added */}
                <button
                  onClick={() => {
                    navigate("/sheets");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <BookOpen className="w-5 h-5" />
                  DSA Sheets
                </button>

                <button
                  onClick={() => {
                    navigate("/bookmarks");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <Bookmark className="w-5 h-5" />
                  Bookmarks
                </button>

                {/* ✅ PROGRESS LINK - Mobile - Only show when user is logged in */}
                {user && (
                  <button
                    onClick={() => {
                      navigate("/progress");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Progress
                  </button>
                )}

                {/* ✅ AUTH BUTTONS - Mobile */}
                {!user ? (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg"
                  >
                    Login / Signup
                  </button>
                ) : (
                  <>
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 mt-4">
                      <div className="flex items-center gap-3 mb-4">
                        {/* Profile Picture in Mobile Menu */}
                        {hasGooglePicture ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                            <img 
                              src={user.picture || user.avatar || user.profilePic} 
                              alt={user.name || "User"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {userInitial}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
                          {hasGooglePicture && (
                            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-1">
                              <svg className="w-3 h-3" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              <span>Google Account</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 mb-2"
                      >
                        <User className="w-5 h-5" />
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                          navigate("/");
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;