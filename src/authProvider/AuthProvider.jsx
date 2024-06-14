import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user information
  const getUserInfo = async () => {
    try {
      if (!email) {
        setUser(null);
        setLoading(false);
        return; // No email, no need to fetch user info
      }

      const response = await fetch(
        `https://inventory-backend-ooh5.onrender.com/api/v1/user/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }
      const userData = await response.json();
      setUser(userData.data); // Update user state
      setLoading(false);
      return userData;
    } catch (error) {
      console.error("Error fetching user information:", error.message);
      setLoading(false);
      throw error;
    }
  };

  // Effect to fetch user info on component mount and when email changes
  useEffect(() => {
    getUserInfo();
  }, [email]);

  // Function to handle logout
  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    setEmail(null);
    setToken(null);
  };

  // Function to update user information after successful login
  const updateUserAfterLogin = async (loggedInEmail) => {
    setEmail(loggedInEmail);
    await getUserInfo();
  };

  // Provide auth information to consumers
  const authInfo = {
    user,
    logOut,
    loading,
    token,
    updateUserAfterLogin, // Function to update user info after login
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
