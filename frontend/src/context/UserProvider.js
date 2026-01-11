import React, { createContext, useState, useEffect } from "react"; // Added useEffect
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(API_PATHS.USER.PROFILE);
      setUser(res.data);
    } catch (err) {
      console.error("Profile fetch failed", err);
      localStorage.removeItem("token"); // Clear invalid tokens
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, fetchUserProfile, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;