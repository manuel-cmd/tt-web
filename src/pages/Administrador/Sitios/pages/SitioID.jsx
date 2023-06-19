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
  const [visitado, setVisitado] = useState(false);
  const [resenas, setResenas] = useState([]);
  const [nuevaresenaU, setNuevaResenaU] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  const toggle = () => setModalResena(!modalResena);
  const refresh = () => window.location.reload(true);

  useEffect(() => {
    try {
      if (auth.correo_usuario) {
        sitiosService
          .getServicioById(id, auth.correo_usuario)
          .then((response) => {
            setIsLoading(false);
            console.log("SitioID", response);
            setSitio(response);
            setVisitado(response.visitado);
            setResenas(response.comentarios);
          });
        //consegirResenas();
        sitiosService.getResenas(auth.correo_usuario).then((response) => {
          //setIsLoading(false);
          console.log("resenas", response);
          //setResenas(response);
        });
      } else {
        sitiosService.getServicioById(id).then((response) => {
          setIsLoading(false);
          console.log("SitioID", response);
          setSitio(response);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const AgregarReseña = () => {
    return (
      <>
        <button className="btn primario btn-primary" onClick={() => toggle()}>
          Agregar reseña
        </button>
      </>
    );
  };

  const consegirResenas = () => {
    console.log("deberia enviar la peticion");
    sitiosService.getServicioById(id, auth.correo_usuario).then((response) => {
      setIsLoading(false);
      console.log("SitioID", response);
      setResenas(response);
    });
  };

  const enviarResena = async (resena, calificacion, imagenes) => {
    console.log("la resena es: ", resena, calificacion, imagenes);

    try {
      const formData = new FormData();
      formData.append("cve_sitio", id);
      formData.append("correo_usuario", auth?.correo_usuario);
      formData.append("comentario", resena);
      formData.append("calificacion", calificacion);
      for (const image of imagenes) {
        formData.append("fotos_sitio", image);
      }
      //formData.append("fotos_sitio", imagenes);

      const response = await usuariosService.addResena(formData);
      const mini = [{ resena, calificacion, imagenes }];
      setNuevaResenaU(mini);

      console.log("response: ", response);
      //const { access_token, foto, tipo_usuario, usuario } = response;
      //const rol = response?.user?.rol
      //setAuth({ access_token, foto, tipo_usuario, usuario });
      setNuevaResena(response);
      toggle();
      refresh();
    } catch (err) {
      console.log(err);
      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
  };

  const agregarVisita = (e) => {};
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
      console.log(response);
      setSitio(response.datos_sitio);
      if (visitado == true) setVisitado(false);
      if (visitado == false) setVisitado(true);
      toast.success(response.mensaje);
    } catch (error) {
      console.log(error);
    }

    setIsSending(false);
  };

  //useEffect(() => {}, [resenaTemp, calificacion, imagenes]);
  useEffect(() => {
    console.log(nuevaResena);
  }, [nuevaResena]);

  const ListaResenas = () => {
    return (
      <div className="row">
        {resenas.length > 0 && <Resena comentarios={resenas} />}
        {resenas.length == 0 && (
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <p>No hay reseñas para este sitio :(</p>
            {visitado && auth.tipo_usuario == "Usuario registrado" && (
              <>
                <p>Se el primero y agrega una reseña</p>
                <AgregarReseña />
              </>
            )}
          </div>
        )}
        {resenas.length > 0 && auth.tipo_usuario == "Usuario registrado" && (
          <div className="container d-flex flex-column justify-content-center align-items-center">
            {visitado && auth.tipo_usuario == "Usuario registrado" && (
              <>
                <AgregarReseña />
              </>
            )}
          </div>
        )}
        {resenas.length == 0 && nuevaresenaU != false && (
          <Resena comentarios={nuevaresenaU} />
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
                        {auth.tipo_usuario == "Usuario registrado" && (
                          <button
                            disabled={isSending}
                            onClick={() => addVisita(sitio.cve_sitio)}
                            className={`btn btn-${
                              sitio.visitado ? "danger" : "primary primario"
                            } btn-block`}
                            style={{ height: "50px" }}
                          >
                            {isSending ? (
                              <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <>
                                {sitio.visitado
                                  ? "Quitar Visita"
                                  : "Registra Visita"}
                              </>
                            )}
                          </button>
                        )}
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
                        <div style={{ flex: 1 }}>
                          <h5 className="card-title">{sitio.nombre_sitio}</h5>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <ReactStars
                            count={5}
                            value={sitio.calificacion}
                            edit={false}
                            size={20}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>

                      <div className="content">
                        <div className="precio">
                          <p>
                            <strong>Telefono</strong> {sitio.telefono}
                          </p>
                          <p className="">
                            <strong>Precio</strong> {"$12.00"}
                          </p>
                        </div>
                        <p>
                          <strong>Direccion</strong> {sitio.direccion}
                        </p>
                        <p>
                          <strong>Ubicacion</strong>
                        </p>
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
