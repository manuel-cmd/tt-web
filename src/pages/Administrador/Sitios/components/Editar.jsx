import React, { useState } from "react";
import EditarIcono from "../../../../assets/Iconos/editar.png";

import ModalEditarSitio from "./ModalEditarSitio";

const Editar = ({ id, sitio }) => {
  const [modalNuevoSitio, setModalNuevoSitio] = useState(false);

  const toggle = () => setModalNuevoSitio(!modalNuevoSitio);

  return (
    <div
      onClick={() => {
        toggle();
      }}
      style={{ marginRight: "10px" }}
      className="bntAccion"
    >
      <img src={EditarIcono} style={{ width: "18px", height: "18px" }} />
      <ModalEditarSitio
        sitio={sitio}
        toggle={toggle}
        isOpen={modalNuevoSitio}
      />
    </div>
  );
};

export default Editar;
