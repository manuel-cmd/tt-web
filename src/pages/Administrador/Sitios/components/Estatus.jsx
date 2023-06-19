import React, { useState } from "react";

import sitiosService from "../../../../services/sitios.services";
import { useAuth } from "../../../../hooks/useAuth";

import HabilitarIcon from "../../../../assets/Iconos/habilitado.png";
import DeshabilitarIcon from "../../../../assets/Iconos/deshabilitado.png";

const Estatus = ({ id, status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const [st, setSt] = useState(status);
  console.log("el estatus y sitio es:", status, id);
  const pStatus = () => {
    try {
      sitiosService
        .removeServicios(auth.correo_usuario, id)
        .then((response) => {
          setSt(response.habilitado);
          console.log(response);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        pStatus();
      }}
      style={{ marginRight: "10px" }}
      className="bntAccion"
    >
      {st == true && (
        <img src={HabilitarIcon} style={{ width: "18px", height: "18px" }} />
      )}
      {(st == false || st == undefined) && (
        <img src={DeshabilitarIcon} style={{ width: "18px", height: "18px" }} />
      )}
    </div>
  );
};

export default Estatus;
