import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import authService from "../services/auth.services";

const ModalLogin = ({ isOpen, toggle }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [user, setUser] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [registro, setRegistro] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      if (registro) {
        console.log("registro", correo, user, contrasena);
        const formData = new FormData();
        formData.append("correo", correo);
        formData.append("usuario", user);
        formData.append("contrasena", contrasena);

        const response = await authService.registro(formData);
        const { access_token, foto, tipo_usuario, usuario } = response;
        //const rol = response?.user?.rol
        setAuth({ access_token, foto, tipo_usuario, usuario });
        setIsSending(false);

        toggle();
      } else {
        const response = await authService.login(correo, contrasena);
        const { access_token, foto, tipo_usuario, usuario } = response;
        //const rol = response?.user?.rol
        setAuth({ access_token, foto, tipo_usuario, usuario });
        setIsSending(false);

        toggle();
      }
    } catch (err) {
      setIsSending(false);
      console.log(err);
      setCorreo("");
      setContrasena("");
      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
  };
  // correo
  // nombreusuario
  // contrasena

  return (
    <>
      <Toaster />
      <Modal isOpen={isOpen} toggle={toggle}>
        {registro ? (
          <>
            <ModalHeader toggle={toggle}>Registrarse</ModalHeader>
            <ModalBody>
              <div class="form-group first">
                <label for="username">Correo</label>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="your-email@gmail.com"
                  id="correo"
                />
              </div>
              <div class="form-group last mb-3">
                <label for="username">Usuario</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="Juan"
                  id="username"
                />
              </div>
              <div class="form-group last mb-3">
                <label for="password">Contraseña</label>
                <input
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  type="password"
                  class="form-control"
                  placeholder="Your Password"
                  id="password"
                />
              </div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                value="Registrarse"
                disabled={isSending}
                class="btn primario btn-block"
                style={{ color: "white", height: "50px" }}
              >
                {isSending ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Continuar</>
                )}
              </button>
            </ModalBody>
            <ModalFooter>
              <input
                type="button"
                onClick={() => setRegistro(!registro)}
                value="Login"
                class="btn secundario btn-block"
                style={{ color: "white", height: "50px" }}
              />
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader toggle={toggle}>Iniciar Sesion</ModalHeader>
            <ModalBody>
              <div class="form-group first">
                <label for="username">Usuario</label>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  type="text"
                  class="form-control"
                  placeholder="your-email@gmail.com"
                  id="username"
                />
              </div>
              <div class="form-group last mb-3">
                <label for="password">Contraseña</label>
                <input
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  type="password"
                  class="form-control"
                  placeholder="Your Password"
                  id="password"
                />
              </div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                class="btn primario btn-block"
                style={{ color: "white", height: "50px" }}
                disabled={isSending}
              >
                {isSending ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Continuar</>
                )}
              </button>
            </ModalBody>
            <ModalFooter>
              <input
                type="button"
                onClick={() => setRegistro(!registro)}
                value="Registrate"
                class="btn secundario btn-block"
                style={{ color: "white", height: "50px" }}
              />
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalLogin;
