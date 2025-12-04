import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const GoogleLoginButton = () => {
  const { setToken, setUser } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await axios.post(
        "https://dsa-tracker-0exz.onrender.com/api/auth/google-login",
        { token }
      );

      localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ ADD THIS

      setToken(res.data.token);
      setUser(res.data.user);

      console.log("✅ Logged in user:", res.data.user);
    } catch (error) {
      console.error("❌ Login Failed:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
