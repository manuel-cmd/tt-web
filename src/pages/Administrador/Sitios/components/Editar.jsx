import React from "react";
import EditarIcono from "../../../../assets/Iconos/editar.png";

const Editar = ({ id }) => {
  return (
    <div style={{ marginRight: "10px" }} className="bntAccion">
      <img src={EditarIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Editar;
