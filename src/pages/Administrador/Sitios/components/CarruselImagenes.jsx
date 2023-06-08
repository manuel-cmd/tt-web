import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarruselImagenes = ({ imagenes }) => {
  return (
    <div>
      <Carousel>
        {imagenes?.map((imagen) => (
          <div>
            <img src={imagen?.link_imagen} />
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselImagenes;
