import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, Shield, ArrowLeft } from "lucide-react";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ If already logged in → redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
        
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Feature Tags */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Track Progress
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Save Bookmarks
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Login to Access All Features
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Join thousands of developers improving their DSA skills
              </p>
            </div>

            {/* Google Login */}
            <div className="space-y-6">
              <GoogleLoginButton />
              
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                    Secure login with Google
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Track solved problems visually</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Bookmark important questions</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Analyze your progress with charts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By logging in, you agree to our Terms and Privacy Policy
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your data is securely encrypted and protected
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;