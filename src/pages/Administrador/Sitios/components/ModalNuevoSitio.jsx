import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";

const TIPO_SITIO = [
  { value: 0, label: "Museo" },
  { value: 1, label: "Teatro" },
  { value: 2, label: "Parque" },
  { value: 3, label: "Hotel" },
  { value: 4, label: "Restaurante" },
  { value: 5, label: "Monumento" },
];

const DELEGACIONES = [
  { value: 0, label: "Álvaro Obregón" },
  { value: 1, label: "Benito Juárez" },
  { value: 2, label: "Azcapotzalco" },
  { value: 3, label: "Coyoacán" },
  { value: 4, label: "Cuajimalpa de Morelos" },
  { value: 5, label: "Cuauhtémoc" },
  { value: 6, label: "Gustavo A. Madero" },
  { value: 7, label: "Iztacalco" },
  { value: 8, label: "Iztapalapa" },
  { value: 9, label: "Magdalena Contreras" },
  { value: 10, label: "Miguel Hidalgo" },
  { value: 11, label: "Milpa Alta" },
  { value: 12, label: "Tláhuac" },
  { value: 13, label: "Tlalpan" },
  { value: 14, label: "Venustiano Carranza" },
  { value: 15, label: "Xochimilco" },
];

const ETIQUETAS_RESTAURANTE = [
  { value: 1, label: "Chino" },
  { value: 2, label: "Italiano" },
  { value: 3, label: "Mexicano" },
  { value: 4, label: "Japones" },
  { value: 5, label: "Americano" },
  { value: 6, label: "Mediterraneo" },
  { value: 7, label: "Molecular" },
];

const ETIQUETAS_HOTEL = [
  { value: 1, label: "SPA" },
  { value: 2, label: "Sauna" },
  { value: 3, label: "Comedor" },
  { value: 4, label: "Alberca" },
  { value: 5, label: "Desayuno Incluido" },
  { value: 6, label: "Actividades" },
  { value: 7, label: "Resort" },
];

const ModalNuevoSitio = ({ isOpen, toggle }) => {
  const [tipo_sitio, setTipo_sitio] = useState(null);
  const [correo, setCorreo] = useState("");
  const [nombre_sitio, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pagina_web, setPaginaWeb] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioLunesA, setHorarioLunesA] = useState("");
  const [horarioMartesA, setHorarioMartesA] = useState("");
  const [horarioMiercolesA, setHorariomMiercolesA] = useState("");
  const [horarioJuevesA, setHorarioJuevesA] = useState("");
  const [horarioViernesA, setHorarioViernesA] = useState("");
  const [horarioSabadoA, setHorarioSabadoA] = useState("");
  const [horarioDomingoA, setHorarioDomingoA] = useState("");
  const [horarioLunesC, setHorarioLunesC] = useState("");
  const [horarioMartesC, setHorarioMartesC] = useState("");
  const [horarioMiercolesC, setHorariomMiercolesC] = useState("");
  const [horarioJuevesC, setHorarioJuevesC] = useState("");
  const [horarioViernesC, setHorarioViernesC] = useState("");
  const [horarioSabadoC, setHorarioSabadoC] = useState("");
  const [horarioDomingoC, setHorarioDomingoC] = useState("");
  const [delegacion, setDelegacion] = useState(null);
  const [colonia, setColonia] = useState([]);
  const [fecha_actualizacion, setFecha_actualizacion] = useState("");
  const [fecha_fundacion, setFecha_fundacion] = useState();
  const [fecha_fundacion2, setFecha_fundacion2] = useState();
  const [costo_promedio, setCostoPromedio] = useState("");
  const [adscripcion, setAdscripcion] = useState("");
  const [etiquetas, setEtiquetas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [fotografiasC, setFotografias] = useState("");
  const [ubicacion, setUbicacion] = useState({
    lat: 19.4324454,
    lng: -99.1330281,
  });
  const [datos, setDatos] = useState(null);
  const [foto_sitio, setFoto_sitio] = useState(null);
  const horario = [];

  const handleTipoSitio = (e) => {
    setTipo_sitio(e);

    setEtiquetas([]);
  };

  useEffect(() => {
    console.log(ubicacion);
  }, [ubicacion]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsSending(true);

  //     try {
  //       if (registro) {
  //         console.log("registro", correo, user, contrasena);
  //         const formData = new FormData();
  //         formData.append("correo", correo);
  //         formData.append("usuario", user);
  //         formData.append("contrasena", contrasena);

  //         const response = await authService.registro(formData);
  //         const { access_token, foto, tipo_usuario, usuario } = response;
  //         //const rol = response?.user?.rol
  //         setAuth({ access_token, foto, tipo_usuario, usuario });
  //         setIsSending(false);

  //         toggle();
  //       } else {
  //         const response = await authService.login(correo, contrasena);
  //         const { access_token, foto, tipo_usuario, usuario } = response;
  //         //const rol = response?.user?.rol
  //         setAuth({ access_token, foto, tipo_usuario, usuario });
  //         setIsSending(false);

  //         toggle();
  //       }
  //     } catch (err) {
  //       setIsSending(false);
  //       console.log(err);
  //       setCorreo("");
  //       setContrasena("");
  //       toast.error(
  //         err.code === "ERR_BAD_RESPONSE"
  //           ? err.message
  //           : err?.response?.data?.error
  //       );
  //     }
  //   };

  return (
    <>
      <Toaster />
      <Modal size="xl" isOpen={isOpen} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Agregar Sitio</ModalHeader>
        <ModalBody>
          <form>
            <div class="form-group">
              <label for="inputNombre">Nombre del sitio</label>
              <input
                type="text"
                class="form-control"
                id="inputNombre"
                value={nombre_sitio}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTipoSitio">Tipo de Sitio</label>
                <Select
                  id="inputTipoSitio"
                  options={TIPO_SITIO}
                  value={tipo_sitio}
                  defaultValue={tipo_sitio}
                  onChange={handleTipoSitio}
                  placeholder="Seleccione un tipo de sitio..."
                  noOptionsMessage={() => "Tipo de sitio no encontrado"}
                />
              </div>
              {/* Se supone que aqui va un renderizado condicional */}
              {tipo_sitio?.value == 3 && (
                <div class="form-group col-md-6">
                  <label for="inputEtiquetas">Etiquetas</label>
                  <Select
                    id="inputEtiquetas"
                    options={ETIQUETAS_HOTEL}
                    value={etiquetas}
                    defaultValue={etiquetas}
                    onChange={setEtiquetas}
                    placeholder="Seleccione una o mas etiquetas..."
                    noOptionsMessage={() => "Etiqueta no encontrada"}
                    isMulti
                  />
                </div>
              )}
              {tipo_sitio?.value == 4 && (
                <div class="form-group col-md-6">
                  <label for="inputEtiquetas">Etiquetas</label>
                  <Select
                    id="inputEtiquetas"
                    options={ETIQUETAS_RESTAURANTE}
                    value={etiquetas}
                    defaultValue={etiquetas}
                    onChange={setEtiquetas}
                    placeholder="Seleccione una o mas etiquetas..."
                    isMulti
                  />
                </div>
              )}
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputDelegacion">Delegacion</label>
                <Select
                  id="inputDelegacion"
                  options={DELEGACIONES}
                  value={delegacion}
                  defaultValue={delegacion}
                  onChange={setDelegacion}
                  placeholder="Seleccione una delegacion..."
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputColonia">Colonia</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputColonia"
                  placeholder="Colonia"
                  value={colonia}
                  onChange={(e) => setColonia(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputTelefono">Telefono</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputTelefono"
                  placeholder="Telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputPaginaWeb">Pagina web</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPaginaWeb"
                  value={pagina_web}
                  onChange={(e) => setPaginaWeb(e.target.value)}
                />
              </div>
              <div class="form-group col-md-4">
                <label for="inputCorreo">Correo Electronico</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCorreo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-8">
                <label for="inputDescripcion">Descripcion del sitio</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputDescripcion"
                  placeholder="Descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputCosto">Costo Promedio</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCosto"
                  value={costo_promedio}
                  onChange={(e) => setCostoPromedio(e.target.value)}
                />
              </div>
              <div class="form-group col-md-2">
                <label for="inputAdscripcion">Adscripcion</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAdscripcion"
                  value={adscripcion}
                  onChange={(e) => setAdscripcion(e.target.value)}
                />
              </div>
            </div>
          </form>
          <Mapa setUbicacion={setUbicacion} ubicacion={ubicacion} />
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            // onClick={(e) => handleSubmit(e)}
            // disabled={isSending}
            class="btn primario btn-block"
            style={{ color: "white", height: "50px" }}
          >
            Registar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalNuevoSitio;
