import React from "react";

const TipoSitio = ({ nombre, icono, active, handleActivo, cve }) => {
  return (
    <div class="col-4 p-1 mb-1">
      <div
        onClick={() => handleActivo(cve)}
        className={`d-flex justify-content-between align-items-center p-3 tipoSitio ${
          cve === active ? "activeSitio" : ""
        }`}
        style={{ height: "50px", width: "100%" }}
      >
        <p style={{ marginBottom: "0px", fontSize: "14px" }}>{nombre}</p>
        <img src={icono} style={{ height: "24px", width: "24px" }} />
      </div>
    </div>
  );
};

export default TipoSitio;
