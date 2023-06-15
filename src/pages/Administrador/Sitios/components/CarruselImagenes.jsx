import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import noImagen from "../../../../assets/Sitios/no-imagen.jpg";

const CarruselImagenes = ({ imagenes }) => {
  console.log("imagenes.length", imagenes);
  return (
    <div>
      <Carousel>
        {imagenes?.map((imagen) => (
          <div>
            {imagenes?.length != undefined && (
              <img
                src={imagenes?.length > 0 ? imagen?.link_imagen : noImagen}
              ></img>
            )}
            {/*<img src={imagen?.link_imagen}></img>*/}
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselImagenes;
