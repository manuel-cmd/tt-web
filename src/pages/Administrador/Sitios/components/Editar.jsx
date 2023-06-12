import React, { useState } from "react";
import EditarIcono from "../../../../assets/Iconos/editar.png";

const Editar = ({ sitioEditar, handleModalEditar }) => {
  const [modalNuevoSitio, setModalNuevoSitio] = useState(false);

  return (
    <div
      onClick={() => {
        console.log("Sitio a Editar", sitioEditar);
        handleModalEditar(sitioEditar);
      }}
      style={{ marginRight: "10px" }}
      className="bntAccion"
    >
      <img src={EditarIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Editar;
