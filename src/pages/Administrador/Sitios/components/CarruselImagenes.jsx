import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarruselImagenes = () => {
  return (
    <div>
      <Carousel>
        <div>
          <img src="https://media.admagazine.com/photos/62757798db5b2c431beba984/16:9/w_2560%2Cc_limit/Estadio%2520Azteca.jpg" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src="https://tecolotito.elsiglodedurango.com.mx/i/2021/01/942953.jpeg" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src="https://www.contrareplica.mx/uploads/2019/08/14/normal/c8be3b0373b45bba54498a22d53ad768.jpg" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default CarruselImagenes;
