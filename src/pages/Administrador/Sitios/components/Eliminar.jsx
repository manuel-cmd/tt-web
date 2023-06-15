import React, { useState } from "react";
import EliminarIcono from "../../../../assets/Iconos/eliminar.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import sitiosService from "../../../../services/sitios.services";

const Eliminar = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const eliminarSitio = () => {
    try {
      sitiosService.removeServicios(id).then((response) => {
        //setListaSitios(response);
        console.log(response);
        setIsLoading(false);
        navigate(`/${ROUTES.INICIO}`);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div onClick={() => eliminarSitio()} className="bntAccion">
      <img src={EliminarIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Eliminar;
