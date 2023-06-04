import React from "react";
import { Container } from "reactstrap";
import noImagen from "../../../../assets/Sitios/no-imagen.jpg";

const SitioCard = ({ nombre, imagen, ruta, cveTipoSitio }) => {
  return (
    <>
      <div class="col-3" style={{ height: "350px", marginBottom: "50px" }}>
        <div style={{ height: "100%", margin: "10px", borderRadius: "15px" }}>
          <img
            src={imagen ? imagen : noImagen}
            style={{
              width: "100%",
              height: "250px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          />
          <Container style={{ marginTop: "15px" }}>
            <h5>{nombre}</h5>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SitioCard;
