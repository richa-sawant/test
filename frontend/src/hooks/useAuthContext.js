import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
