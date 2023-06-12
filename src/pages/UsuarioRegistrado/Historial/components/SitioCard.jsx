import React, { useEffect, useState } from "react";
import noImagen from "../../../../assets/Sitios/no-imagen.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

const SitioCard = ({ sitio }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div class="col-3 h-100 mb-3">
        <div class="card">
          <div>
            <img
              class="card-img-top"
              src={
                sitio?.imagenes?.length > 0
                  ? sitio.imagenes[0].link_imagen
                  : noImagen
              }
              alt="Card image cap"
            />
          </div>

          <div class="card-body">
            <h5 class="card-title">{sitio.nombre_sitio}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="card-body" className="d-flex flex-row ">
            <button
              className="btn primario btn-primary btn-block"
              onClick={() => navigate(`/sitio/${sitio.cve_sitio}`)}
            >
              Visitar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitioCard;
