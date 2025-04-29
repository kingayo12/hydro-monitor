// components/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase"; // Import the auth service from your firebase.js file
import { onAuthStateChanged } from "firebase/auth"; // Import specific auth functions
import LoadingAnimation from "./LoadingAnimation"; // Import your LoadingAnimation component

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    // ... other auth-related values/functions
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <LoadingAnimation />}
    </AuthContext.Provider>
  );
};
