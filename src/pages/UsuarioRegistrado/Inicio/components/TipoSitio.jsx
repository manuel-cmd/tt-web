import React from "react";

const TipoSitio = ({ nombre, icono, active, handleActivo, cve }) => {
  return (
    <div
      onClick={() => handleActivo(cve)}
      className={`d-flex flex-column justify-content-center align-items-center tipoSitio ${
        cve === active ? "activeSitio" : ""
      }`}
      style={{ height: "80px", width: "80px", marginInline: "15px" }}
    >
      <img src={icono} style={{ height: "24px", width: "24px" }} />
      <p style={{ marginBottom: "0px" }}>{nombre}</p>
    </div>
  );
};

export default TipoSitio;
