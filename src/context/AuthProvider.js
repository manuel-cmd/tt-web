import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const initialState = () => {
  const currentAuth = localStorage.getItem("usuario");

  return currentAuth ? JSON.parse(currentAuth) : {};
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
