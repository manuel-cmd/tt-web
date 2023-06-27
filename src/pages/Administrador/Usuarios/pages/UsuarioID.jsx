import React, { useEffect, useState } from "react";
import { Loader } from "../../../../components";
import usuariosService from "../../../../services/usuario.services";
import { useParams } from "react-router-dom";
const UsuarioID = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      usuariosService.getUsuarioID(id).then((response) => {
        setUsuario(response);
        console.log(response);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>El usuario es: {console.log(usuario)}</div>
      )}
    </>
  );
};

export default UsuarioID;
