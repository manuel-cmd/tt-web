import React from "react";
import VerIcono from "../../../../assets/Iconos/eye.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const Ver = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/${ROUTES.SITIOID}/${id}`)}>
      <img src={VerIcono} style={{ width: "18px", height: "18px" }} />
    </div>
  );
};

export default Ver;
