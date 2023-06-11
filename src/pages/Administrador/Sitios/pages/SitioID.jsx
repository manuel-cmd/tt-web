import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

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

import usuariosService from "../../../../services/usuario.services";

const SitioID = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sitio, setSitio] = useState({});
  const [modalResena, setModalResena] = useState(false);
  const [nuevaResena, setNuevaResena] = useState("");
  const [resenaTemp, setResenaTemp] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isClick, setClick] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();
  const { setAuth } = useAuth();

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

  const enviarResena = async (resena, calificacion, imagenes) => {
    console.log("la resena es: ", resena, calificacion, imagenes);
    setNuevaResena(resena);

    try {
      const formData = new FormData();
      formData.append("cve_sitio", id);
      formData.append("correo", auth?.correo_usuario);
      formData.append("comentario", resena);
      formData.append("calificacion", calificacion);
      formData.append("imagenes", imagenes);

      const response = await usuariosService.addResena(formData);
      console.log("response: ", response);
      //const { access_token, foto, tipo_usuario, usuario } = response;
      //const rol = response?.user?.rol
      //setAuth({ access_token, foto, tipo_usuario, usuario });

      toggle();
    } catch (err) {
      console.log(err);
      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
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

  const addVisita = async (cve) => {
    try {
      setIsSending(true);
      const response = await sitiosService.addToHistorial(
        cve,
        auth.correo_usuario
      );
      toast.success(response.mensaje);
    } catch (error) {
      console.log(error);
    }

    setIsSending(false);
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
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ModalResena
            isOpen={modalResena}
            toggle={toggle}
            resena={resenaTemp}
            setResena={setResenaTemp}
            calificacion={calificacion}
            setCalificacion={setCalificacion}
            imagenes={imagenes}
            setImagenes={setImagenes}
            enviarResena={enviarResena}
          />
          <div className="container blog-detail-section">
            <div className="row">
              <div className="col-xl-6">
                <div className="sidebar">
                  <div className="panel panel-success">
                    <CarruselImagenes imagenes={sitio.fotos} />
                    {auth.correo_usuario && (
                      <>
                        <button
                          disabled={isSending}
                          onClick={() => addVisita(sitio.cve_sitio)}
                          className="btn btn-primary primario btn-block"
                          style={{ height: "50px" }}
                        >
                          {isSending ? (
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            <>Registar Visita</>
                          )}
                        </button>
                      </>
                    )}
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
