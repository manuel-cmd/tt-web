import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";
import usuariosService from "../../../../services/usuario.services";
import { useAuth } from "../../../../hooks/useAuth";

import noImagen from "../../../../assets/Sitios/no-imagen.jpg";

const ModalEditarResena = ({
  sitio,
  listaFavs,
  setListaFavs,
  isOpen,
  toggle,
}) => {
  const { auth } = useAuth();

  const [pagina_web, setPaginaWeb] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [datos, setDatos] = useState(null);
  const [foto_sitio, setFoto_sitio] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleTipoSitio = (e) => {
    //setTipo_sitio(e);
    //setEtiquetas([]);
  };

  /*useEffect(() => {
    console.log(ubicacion);
  }, [ubicacion]);*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const formData = new FormData();

      formData.append("nombre_sitio", []);
      const response = await usuariosService.editResena(formData);
      console.log(response);
      //const rol = response?.user?.rol
      setIsSending(false);

      toggle();
    } catch (err) {
      setIsSending(false);
      console.log(err);

      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
  };

  return (
    <>
      <Toaster />
      <Modal size="xl" isOpen={isOpen} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Agregar Sitio</ModalHeader>
        <ModalBody>
          <form>
            <div class="">
              <div>
                {auth.access_token && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  ></div>
                )}
              </div>

              <div class="">
                <h4 class="card-title">{"Tacos"}</h4>
              </div>
              <div class="form-row">
                <div class="form-group col-md-5">
                  <img
                    class="card-img-top"
                    src={
                      sitio?.imagenes?.lenght > 0 ? sitio.imagen[1] : noImagen
                    }
                    alt="Card image cap"
                  />
                </div>
                <div class="form-group col-md-7">
                  <div class="">
                    <textarea
                      class="card-text"
                      placeholder="Some quick example text to build on the card title and
                      make up the bulk of the card's content."
                    ></textarea>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            class="btn primario btn-block"
            style={{ color: "white", height: "50px" }}
          >
            Confirmar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalEditarResena;
