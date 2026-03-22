import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, meRequest } from "../api/auth.api";

// Obteniendo el objeto de contexto 
// contiene el Provider (el que envía) y el Consumer (el que recibe)
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const login = async (credentials) => {
    const res = await loginRequest(credentials);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if(!token) {
        setLoading(false);
        return;
      }

      const res = await meRequest();
      setUser(res.data);
      

    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  },[]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);