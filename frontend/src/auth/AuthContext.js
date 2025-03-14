import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, loginWithEmailAndPassword, logout } from './firebase';

// Create the auth context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial render
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Authentication error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setError(null);
    try {
      const { user } = await loginWithEmailAndPassword(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
      throw error;
    }
  };

  // Value to be provided by the context
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 