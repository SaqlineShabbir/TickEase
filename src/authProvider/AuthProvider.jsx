import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async (email) => {
    try {
      const response = await fetch(
        `https://inventory-backend-ooh5.onrender.com/api/v1/user/${email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }
      const userData = await response.json();
      console.log(userData);
      setUser(userData.data);
      return userData;
    } catch (error) {
      console.error("Error fetching user information:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUserInfo(email);
  }, [email]);
  //get token
  useEffect(() => {
    // Retrieve token from localStorage on component mount
    const storedUserId = localStorage.getItem("email");
    if (storedUserId) {
      setEmail(storedUserId);
    }
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token, email, getUserInfo]);
  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    getUserInfo(user?.email);
  };

  const authInfo = {
    user,
    logOut,
    token,
    getUserInfo,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
