import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import authService from "../services/auth.services";
import Select from "react-select";

const ETIQUETAS_RESTAURANTE = [
  { label: "Buffet", value: 12 },
  { label: "Cortes", value: 11 },
  { label: "Hamburguesas", value: 8 },
  { label: "Mariscos", value: 10 },
  { label: "Música en vivo", value: 13 },
  { label: "Pizzas", value: 9 },
  { label: "Restaurante/Bar", value: 15 },
  { label: "Románticos", value: 14 },
  { label: "Tacos", value: 7 },
];

const ETIQUETAS_MUSEO = [
  { label: "Antropología", value: 6 },
  { label: "Arqueología", value: 5 },
  { label: "Arte", value: 2 },
  { label: "Ciencia y tecnología", value: 1 },
  { label: "Especializado", value: 4 },
  { label: "Historia", value: 3 },
];

const ETIQUETAS_HOTEL = [
  { value: 1, label: "Alberca" },
  { value: 2, label: "Estacionamiento" },
  { value: 3, label: "Aire acondicionado" },
  { value: 4, label: "Televisión por cable" },
  { value: 5, label: "Wifi gratis" },
  { value: 6, label: "Spa" },
  { value: 7, label: "Bar en hotel" },
];

const TIPO_SITIO = [
  { value: 1, label: "Museo" },
  { value: 2, label: "Teatro" },
  { value: 3, label: "Monumento" },
  { value: 4, label: "Parque" },
  { value: 5, label: "Hotel" },
  { value: 6, label: "Restaurante" },
];

const ModalLogin = ({ isOpen, toggle }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [user, setUser] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [registro, setRegistro] = useState(false);
  const [etiquetasRestaurante, setEtiquetasRestaurante] = useState([]);
  const [etiquetasHotel, setEtiquetasHotel] = useState([]);

  const [etiquetasRest, setEtiquetasRest] = useState([]);
  const [etiquetasMuseo, setEtiquetasMuseo] = useState([]);

  const [tipo_sitio, setTipo_sitio] = useState([]);
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
        formData.append("etiquetas", JSON.stringify(etiquetasRestaurante));
        formData.append("servicios", JSON.stringify(etiquetasHotel));

        const response = await authService.registro(formData);
        const {
          cve_tipo_usuario,
          correo_usuario,
          usuario,
          tipo_usuario,
          link_imagen,
        } = response;
        //const rol = response?.user?.rol
        setAuth({
          cve_tipo_usuario,
          correo_usuario,
          usuario,
          tipo_usuario,
          link_imagen,
        });
        setIsSending(false);

        toggle();
      } else {
        const response = await authService.login(correo, contrasena);
        console.log("Response", response);
        const {
          cve_tipo_usuario,
          correo_usuario,
          usuario,
          tipo_usuario,
          link_imagen,
        } = response;
        //const rol = response?.user?.rol
        setAuth({
          cve_tipo_usuario,
          correo_usuario,
          usuario,
          tipo_usuario,
          link_imagen,
        });
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

  function sitioExists(value) {
    return tipo_sitio.some(function (el) {
      return el.value === value;
    });
  }

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
                  placeholder="Usuario"
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
              <div class="form-group last mb-3">
                Tipo de sitio de interes:
                <div class="form-group">
                  <Select
                    id="inputEtiquetas"
                    options={TIPO_SITIO}
                    value={tipo_sitio}
                    defaultValue={tipo_sitio}
                    onChange={setTipo_sitio}
                    placeholder="Seleccione una o mas etiquetas..."
                    noOptionsMessage={() => "Etiqueta no encontrada"}
                    isMulti
                  />
                  {console.log("tipo sitio: ", tipo_sitio)}
                </div>
              </div>
              {tipo_sitio[0] != null && (
                <div class="form-group last mb-3">
                  {sitioExists(1) && (
                    <div class="form-group ">
                      Seleccione las etiquetas de su preferencia:
                      <Select
                        id="inputEtiquetas"
                        options={ETIQUETAS_MUSEO}
                        value={etiquetasRestaurante}
                        defaultValue={etiquetasRestaurante}
                        onChange={setEtiquetasRestaurante}
                        placeholder="Seleccione una o mas etiquetas..."
                        isMulti
                      />
                    </div>
                  )}
                </div>
              )}
              {tipo_sitio[0] != null && (
                <div class="form-group last mb-3">
                  {sitioExists(5) && (
                    <div class="form-group">
                      Seleccione las etiquetas de su preferencia:
                      <Select
                        id="inputEtiquetas"
                        options={ETIQUETAS_HOTEL}
                        value={etiquetasHotel}
                        defaultValue={etiquetasHotel}
                        onChange={setEtiquetasHotel}
                        placeholder="Seleccione una o mas etiquetas..."
                        noOptionsMessage={() => "Etiqueta no encontrada"}
                        isMulti
                      />
                    </div>
                  )}
                </div>
              )}
              {tipo_sitio[0] != null && (
                <div class="form-group last mb-3">
                  {sitioExists(6) && (
                    <div class="form-group ">
                      Seleccione las etiquetas de su preferencia:
                      <Select
                        id="inputEtiquetas"
                        options={ETIQUETAS_RESTAURANTE}
                        value={etiquetasRestaurante}
                        defaultValue={etiquetasRestaurante}
                        onChange={setEtiquetasRestaurante}
                        placeholder="Seleccione una o mas etiquetas..."
                        isMulti
                      />
                    </div>
                  )}
                </div>
              )}
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
