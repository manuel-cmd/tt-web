import React, { useEffect, useState } from "react";
import EliminarIcono from "../../../../assets/Iconos/eliminar.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { ROUTES } from "../../../../constants/routes";
import sitiosService from "../../../../services/sitios.services";
import { useAuth } from "../../../../hooks/useAuth";

const Eliminar = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [deleteS, setDeleteS] = useState(false);
  const refresh = () => window.location.reload(false);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function demo() {
    for (let i = 0; i < 5; i++) {
      console.log(`Waiting ${i} seconds...`);
      await sleep(i * 1000);
    }
    console.log("Done");
  }

  const eliminarSitio = () => {
    try {
      sitiosService
        .removeServicios(auth.correo_usuario, id)
        .then((response) => {
          //setListaSitios(response);
          console.log(response);
          setIsLoading(false);
          toast.success(response.mensaje);
          demo();
          setDeleteS(true);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (deleteS != false) refresh();
  }, [deleteS]);

  return (
    <div onClick={() => eliminarSitio()} className="bntAccion">
      <img src={EliminarIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Eliminar;
