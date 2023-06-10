import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import ReactStars from "react-rating-stars-component";
import { Mapa } from "../../../../components";
import usuariosService from "../../../../services/usuario.services";
import { useAuth } from "../../../../hooks/useAuth";

import noImagen from "../../../../assets/Sitios/no-imagen.jpg";

import "./ModalEditarResena.css";

const ModalEditarResena = ({
  toggle,
  isOpen,
  resena,
  setResena,
  calificacion,
  setCalificacion,
  imagenes,
  setImagenes,
  editarResena,
}) => {
  const { auth } = useAuth();

  const [pagina_web, setPaginaWeb] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [datos, setDatos] = useState(null);
  const [foto_sitio, setFoto_sitio] = useState(null);
  const [isSending, setIsSending] = useState(false);
  console.log("set imagenes es: ", imagenes);
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

  //const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagenes((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setImagenes(imagenes.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <>
      <Toaster />
      <Modal size="xl" isOpen={isOpen} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Editar Resena </ModalHeader>
        <ModalBody>
          <form>
            <div class="">
              <div class="">
                <h4 class="card-title">{"Tacos"}</h4>
                <div className="estrellitas2">
                  <ReactStars
                    count={5}
                    value={calificacion}
                    size={20}
                    activeColor="#ffd700"
                    onChange={ratingChanged}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  />
                </div>
              </div>
              <div class="form">
                {/*<div class="form-group col-md-5">
                  <img
                    class="card-img-top"
                    src={
                      sitio?.imagenes?.lenght > 0 ? sitio.imagen[1] : noImagen
                    }
                    alt="Card image cap"
                  />
                  </div>*/}
                <div class="form-group col-md-6">
                  <div class="">
                    <textarea
                      class="card-text"
                      placeholder="Some quick example text to build on the card title and
                      make up the bulk of the card's content."
                      rows={4}
                      cols={120}
                      value={resena}
                      onChange={(e) => setResena(e.target.value)}
                    ></textarea>
                  </div>
                  <br />
                </div>
              </div>
              {/*<input
                multiple
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => setImagenes(e.target.files)}
                accept="image/*"
                  />*/}
              <div className="row">
                <label className="label">
                  Agregar imagenes
                  <br />
                  {/*<span className=" span">up to 10 images</span>*/}
                  <input
                    className="input"
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    multiple
                    accept="image/png , image/jpeg, image/webp"
                  />
                </label>
                <br />

                <div className="images">
                  {imagenes &&
                    imagenes.map((image, index) => {
                      return (
                        <div key={image} className="image">
                          <img src={image} height="200" alt="upload" />
                          <button onClick={() => deleteHandler(image)}>
                            Borrar
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => editarResena(resena, calificacion, imagenes)}
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
