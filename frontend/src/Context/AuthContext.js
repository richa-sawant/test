import { createContext, useEffect, useState } from "react";
import { checkAuthentication , refreshAccessToken } from "../utils/checkAuthentication";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState({ isAuthenticated: false, user: null });

  const setAuthenticated = (value) => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      isAuthenticated: value,
    }));
  };

  const fetchUserData = async () => {
    try {
      const isAuthResponse = await checkAuthentication();
      const isAuthData = await isAuthResponse.json();

      if (isAuthData.isAuthenticated) {
        setAuthenticated(true);
      } else {
        // Token expired or not authenticated
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refreshUserToken = async () => {
    try {
      await refreshAccessToken();
      await fetchUserData();
    } catch (error) {
      console.error('Error refreshing user token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authData, setAuthenticated, refreshUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
