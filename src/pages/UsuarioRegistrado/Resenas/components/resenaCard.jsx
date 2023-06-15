import React from "react";
import ReactStars from "react-rating-stars-component";

import noImagen from "../../../../assets/Sitios/no-imagen.jpg";
import { useAuth } from "../../../../hooks/useAuth";
import { useState } from "react";
//import ModalNuevoSitio from "../../../Administrador/Sitios/components/ModalNuevoSitio";
import ModalEditarResena from "./ModalEditarResena";

import "./resenaCard.css";
import { CarruselImagenes } from "../../../../components";

const ResenaCard = ({ sitio }) => {
  const { auth } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [listaSitios, setListaSitios] = useState([]);
  const [modalNuevoSitio, setModalNuevoSitio] = useState(false);
  const [resenaTemp, setResenaTemp] = useState("");
  const [calificacion, setCalificacion] = useState("0");
  const [imagenes, setImagenes] = useState([]);

  const toggle = () => setModalNuevoSitio(!modalNuevoSitio);

  const editarResena = (resena, calificacion, imagenes) => {
    console.log("la resena es: ", resena, calificacion, imagenes);
    // setNuevaResena(resena);
    toggle();
  };

  return (
    <>
      <div class=" mx-auto col-10 col-md-8 col-lg-8">
        <ModalEditarResena
          toggle={toggle}
          isOpen={modalNuevoSitio}
          resena={resenaTemp}
          setResena={setResenaTemp}
          calificacion={calificacion}
          setCalificacion={setCalificacion}
          imagenes={imagenes}
          setImagenes={setImagenes}
          editarResena={editarResena}
        />

        <div class="">
          <div>
            {auth.access_token && (
              <div
                style={{ position: "absolute", top: "-10px", right: "-10px" }}
              ></div>
            )}
          </div>

          <div class="form-group row">
            <h4 class="card-title">{sitio.nombre}</h4>
            <div className="estrellitas2">
              Fecha: 12/01/23
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
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-5">
              {/*
              <img
                class="card-img-top"
                src={sitio?.imagenes?.lenght > 0 ? sitio.imagen[1] : noImagen}
                alt="Card image cap"
            />*/}
              {sitio.fotos == undefined ? (
                <div>
                  <img class="card-img-top" src={noImagen}></img>
                  {console.log("caso 1")}
                </div>
              ) : (
                <CarruselImagenes imagenes={sitio.fotos} />
              )}
            </div>
            <div class="form-group col-md-7">
              <div class="">
                <p class="card-text">{sitio.comentario}</p>
              </div>
              <br />
              <div class="" className="mx-auto col-10 col-md-8 col-lg-8">
                <button
                  className="btn primario btn-primary btn-block"
                  onClick={() => toggle()}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResenaCard;
