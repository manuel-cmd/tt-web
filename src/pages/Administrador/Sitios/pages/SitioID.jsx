import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sitiosService from "../../../../services/sitios.services";
import {
  CarruselImagenes,
  Loader,
  MapaInformativo,
} from "../../../../components";
import Resena from "../components/Resena";
import ReactStars from "react-rating-stars-component";
import { useAuth } from "../../../../hooks/useAuth";
import ModalResena from "../components/ModalResena";
import Heart from "react-animated-heart";

const SitioID = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sitio, setSitio] = useState({});
  const [modalResena, setModalResena] = useState(false);
  const [nuevaResena, setNuevaResena] = useState("");
  const [resenaTemp, setResenaTemp] = useState("");
  const [isClick, setClick] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();

  const toggle = () => setModalResena(!modalResena);

  useEffect(() => {
    try {
      sitiosService.getServicioById(id).then((response) => {
        setIsLoading(false);
        console.log(response);
        setSitio(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(nuevaResena);
  }, [nuevaResena]);

  const AgregarReseña = () => {
    return (
      <>
        <button className="btn primario btn-primary" onClick={() => toggle()}>
          Agregar reseña
        </button>
      </>
    );
  };

  const enviarResena = (resena) => {
    setNuevaResena(resena);
    toggle();
  };

  /*const handleFav = (cve) => {
    if (listaFavs.includes(cve)) {
      const myArray = [...listaFavs];
      const newArray = myArray.filter((item) => item != cve);
      console.log("Nuevo:", newArray);
      setListaFavs(newArray);
    } else {
      setListaFavs([...listaFavs, cve]);
    }
  };*/

  const addFavoritos = (e) => {
    setClick(!isClick);
  };

  const ListaResenas = () => {
    return (
      <div className="row">
        {sitio.comentarios.length > 0 ? (
          <Resena />
        ) : (
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <p>No hay reseñas para este sitio :(</p>
            {auth.access_token && (
              <>
                <p>Se el primero y agrega una reseña</p>
                <AgregarReseña />
              </>
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ModalResena
            isOpen={modalResena}
            toggle={toggle}
            resena={resenaTemp}
            setResena={setResenaTemp}
            enviarResena={enviarResena}
          />
          <div className="container blog-detail-section">
            <div className="row">
              <div className="col-xl-6">
                <div className="sidebar">
                  <div className="panel panel-success">
                    <CarruselImagenes imagenes={sitio.fotos} />
                  </div>
                </div>
              </div>{" "}
              <div className="col-xl-6">
                <div className="blog-detail">
                  <div className="card">
                    <div className="card-body">
                      <div className=" d-flex flex-row justify-content-between">
                        <h5 className="card-title">{sitio.nombre_sitio}</h5>
                        <ReactStars
                          count={5}
                          value={5}
                          edit={false}
                          size={20}
                          activeColor="#ffd700"
                        />
                      </div>

                      <div className="content">
                        <p>
                          <strong>Telefono</strong> {sitio.telefono}
                        </p>
                        <p>
                          <strong>Ubicacion</strong>
                        </p>
                        {auth.access_token && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
                            }}
                          >
                            <br />
                            <br />
                            <Heart
                              isClick={isClick}
                              onClick={() => setClick(!isClick)}
                            />
                          </div>
                        )}
                        <div className="row">
                          <MapaInformativo
                            lat={sitio.latitud}
                            lng={sitio.longitud}
                          />
                        </div>
                        <p style={{ marginTop: "15px" }}>
                          <strong>Reseñas</strong>
                        </p>
                        <ListaResenas />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SitioID;
