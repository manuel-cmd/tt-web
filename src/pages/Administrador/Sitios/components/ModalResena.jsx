import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";

const ModalResena = ({
  isOpen,
  toggle,
  resena,
  setResena,
  calificacion,
  setCalificacion,
  imagenes,
  setImagenes,
  enviarResena,
}) => {
  const [img, setImg] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log("selectedFiles: ", selectedFiles);
    console.log("selectedFilesArray: ", selectedFilesArray);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
      //return selectedFilesArray;
    });

    setImg((previousImages) => previousImages.concat(imagesArray));
    setImagenes(selectedFilesArray);
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setImg(imagenes.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setCalificacion(newRating);
  };

  return (
    <>
      <Toaster />
      <Modal isOpen={isOpen} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>
          Reseña{" "}
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
        </ModalHeader>
        <ModalBody>
          <div className="form-group ">
            <textarea
              rows={4}
              cols={56}
              value={resena}
              onChange={(e) => setResena(e.target.value)}
            />
            {/*<input
              multiple
              className="form-control"
              type="file"
              id="formFile"
              onChange={(e) => setImagenes(e.target.files)}
              accept="image/*"
            />*/}
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
            <br />
            <div className="images">
              {img &&
                img.map((image, index) => {
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
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => enviarResena(resena, calificacion, imagenes)}
            // disabled={isSending}
            class="btn primario btn-block"
            style={{ color: "white", height: "50px" }}
          >
            Enviar Resena
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalResena;
