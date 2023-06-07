import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";

const ModalResena = ({ isOpen, toggle, resena, setResena, enviarResena }) => {
  return (
    <>
      <Toaster />
      <Modal isOpen={isOpen} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Reseña</ModalHeader>
        <ModalBody>
          <textarea
            rows={4}
            cols={56}
            value={resena}
            onChange={(e) => setResena(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={() => enviarResena(resena)}
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
