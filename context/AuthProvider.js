import { AuthContext } from "./AuthContext";
import { useState , useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </AuthContext.Provider>
  );
}

export default AuthProvider;
