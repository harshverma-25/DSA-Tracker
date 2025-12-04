import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ RESTORE AUTH FROM LOCALSTORAGE ON PAGE RELOAD
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser)); // ✅ RESTORE FULL USER OBJECT
    }
  }, []);

  // ✅ LOGOUT FUNCTION (CLEAN EVERYTHING)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ IMPORTANT
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
