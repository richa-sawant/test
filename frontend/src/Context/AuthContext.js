import { createContext, useEffect, useState } from "react";
import { checkAuthentication } from "../utils/checkAuthentication";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authData, setAuthData] = useState({ isAuthenticated: false, user: null });

  const setAuthenticated = (value) => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      isAuthenticated: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthResponse = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/isAuth`);
        const isAuthData = await isAuthResponse.json();
        console.log('isAuthData:', isAuthData);
        setAuthenticated(isAuthData.isAuthenticated);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [setAuthenticated]);
  

  if (authData.isAuthenticated === null) {
    return (
      <div className="flex bg-slate-900 justify-center items-center h-screen flex-col gap-2">
        <img src="/load.png" alt="loading" className="animate-spin w-10" />
        <p className="font-oswald font-semibold">"LEMME COOK"</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...authData, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
