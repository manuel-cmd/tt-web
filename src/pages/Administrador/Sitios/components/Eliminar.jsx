import React from "react";
import EliminarIcono from "../../../../assets/Iconos/eliminar.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const Eliminar = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${ROUTES.SITIOID}/${id}`)}
      className="bntAccion"
    >
      <img src={EliminarIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Eliminar;
