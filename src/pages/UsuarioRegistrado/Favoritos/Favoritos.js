import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const Favoritos = () => {
  const { auth } = useAuth();
  return <div>Favoritosss{auth.access_token}</div>;
};

export default Favoritos;
