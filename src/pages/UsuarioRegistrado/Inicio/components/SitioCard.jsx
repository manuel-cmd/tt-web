import React, { useState } from "react";
import { Container } from "reactstrap";
import noImagen from "../../../../assets/Sitios/no-imagen.jpg";
import { useNavigate } from "react-router-dom";
import Heart from "react-animated-heart";
import { useAuth } from "../../../../hooks/useAuth";

const SitioCard = ({ sitio, listaFavs, setListaFavs }) => {
  const [isClick, setClick] = useState(listaFavs.includes(sitio.cve_sitio));
  const { auth } = useAuth();

  const handleFav = (cve) => {
    if (listaFavs.includes(cve)) {
      const myArray = [...listaFavs];
      const newArray = myArray.filter((item) => item != cve);
      console.log("Nuevo:", newArray);
      setListaFavs(newArray);
    } else {
      setListaFavs([...listaFavs, cve]);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div class="col-3 h-100 mb-3">
        <div class="card">
          <div>
            <img
              class="card-img-top"
              src={sitio?.imagenes?.lenght > 0 ? sitio.imagen[1] : noImagen}
              alt="Card image cap"
            />
            {auth.access_token && (
              <div
                style={{ position: "absolute", top: "-10px", right: "-10px" }}
              >
                <Heart
                  isClick={isClick}
                  onClick={() => handleFav(sitio.cve_sitio)}
                />
              </div>
            )}
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
