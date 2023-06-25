import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import noImagen from "../../../../assets/Sitios/no-imagen.jpg";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Heart from "react-animated-heart";
import { useAuth } from "../../../../hooks/useAuth";
import sitiosService from "../../../../services/sitios.services";

const SitioCard = ({ sitio, listaFavs, setListaFavs }) => {
  const [isClick, setClick] = useState(listaFavs.includes(sitio.cve_sitio));
  const { auth } = useAuth();

  const handleFav = async (cve) => {
    try {
      const nuevosFav = await sitiosService.addToFavoritos(
        cve,
        auth.correo_usuario
      );
      setListaFavs(nuevosFav.sitios_favoritos);
    } catch (error) {
      console.log(error);
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
              src={
                sitio?.imagenes?.length > 0
                  ? sitio.imagenes[0].link_imagen
                  : noImagen
              }
              alt="Card image cap"
              style={{ width: "100%", height: "200px" }}
            />
            {auth.cve_tipo_usuario === 1 && (
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
            <ReactStars
              count={5}
              value={sitio.calificacion}
              edit={false}
              size={20}
              activeColor="#ffd700"
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
            />
            <p class="card-text">Costo promedio: {sitio.costo_promedio}</p>
            <p class="card-text">Direccion: {sitio.direccion}</p>
            {/*<p class="card-text">{sitio.descripcion}</p>*/}
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
