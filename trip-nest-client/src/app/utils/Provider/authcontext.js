"use client"
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (username, password, email, cookie) => {
    setUser({ username, password, email, cookie });
  };

  const checkUser = () => {
    console.log("user:  " + user.email);
    console.log("user:  " + user.cookie);
    if (user.email != null && user.cookie != null) {
      return true;
    } else {
      return false;
    }
  };
  const homego = () => {
    router.push("/");
  };
  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setUser(null);
      document.cookie = null;

      router.push("/");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser, homego }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
