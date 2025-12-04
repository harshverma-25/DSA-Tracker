import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SheetDetail from "./pages/SheetDetail";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateSheet from "./pages/AdminCreateSheet";
import AdminImportFromFile from "./pages/AdminImportFromFile";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminAllSheets from "./pages/AdminAllSheets";
import DSASheets from "./pages/DSASheets";



function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sheets" element={<DSASheets />} />


        {/* ✅ PROTECTED USER ROUTES */}
        <Route
          path="/sheet/:sheetId"
          element={
            <ProtectedRoute>
              <SheetDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADMIN ROUTES (UNCHANGED) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-sheet" element={<AdminCreateSheet />} />
        <Route path="/admin/all-sheets" element={<AdminAllSheets />} />

        <Route
          path="/admin/import-from-file"
          element={<AdminImportFromFile />}
        />
      </Routes>
    </div>
  );
}

export default App;
