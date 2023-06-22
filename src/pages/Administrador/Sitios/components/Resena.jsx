import React from "react";
import ReactStars from "react-rating-stars-component";

const Resena = ({ comentarios }) => {
  console.log("comentarios: ", comentarios);
  const fecha = new Date(comentarios.fecha_comentario);
  console.log("fecha: ", fecha);
  return (
    <div className="col-xl-12">
      {comentarios.map((comentario) => (
        <div>
          {/* <p className="legend">Legend 1</p> */}
          <div class="col">
            <div class="card card-white post">
              <div class="post-heading">
                <div class="float-left image">
                  <img
                    src="http://bootdey.com/img/Content/user_1.jpg"
                    class="img-circle avatar"
                    alt="user profile image"
                  />
                </div>
                <div class="float-left meta">
                  <div class="title h5">
                    <a href="#">
                      <b>{comentario.usuario}</b>
                    </a>
                    <div>
                      <div className="estrellitas2">
                        Fecha: {comentario.fecha_comentario}
                        <ReactStars
                          count={5}
                          value={comentario.calificacion}
                          size={20}
                          activeColor="#ffd700"
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="post-description">
                <p>{comentario.comentario}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resena;
