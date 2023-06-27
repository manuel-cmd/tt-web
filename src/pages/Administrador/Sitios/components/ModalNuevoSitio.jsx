import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";
import sitiosService from "../../../../services/sitios.services";
import { useAuth } from "../../../../hooks/useAuth";
import { ROUTES } from "../../../../constants/routes";

const TIPO_SITIO = [
  { value: 1, label: "Museo" },
  { value: 2, label: "Teatro" },
  { value: 3, label: "Monumento" },
  { value: 4, label: "Parque" },
  { value: 5, label: "Hotel" },
  { value: 6, label: "Restaurante" },
];

const DELEGACIONES = [
  { value: 1, label: "Álvaro Obregón" },
  { value: 3, label: "Azcapotzalco" },
  { value: 2, label: "Benito Juárez" },
  { value: 4, label: "Coyoacán" },
  { value: 5, label: "Cuajimalpa de Morelos" },
  { value: 6, label: "Cuauhtémoc" },
  { value: 7, label: "Gustavo A. Madero" },
  { value: 8, label: "Iztacalco" },
  { value: 9, label: "Iztapalapa" },
  { value: 10, label: "Magdalena Contreras" },
  { value: 11, label: "Miguel Hidalgo" },
  { value: 12, label: "Milpa Alta" },
  { value: 13, label: "Tláhuac" },
  { value: 14, label: "Tlalpan" },
  { value: 15, label: "Venustiano Carranza" },
  { value: 16, label: "Xochimilco" },
];

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
  { cve_servicio: 1, nombre: "Alberca" },
  { cve_servicio: 2, nombre: "Estacionamiento" },
  { cve_servicio: 3, nombre: "Aire acondicionado" },
  { cve_servicio: 4, nombre: "Televisión por cable" },
  { cve_servicio: 5, nombre: "Wifi gratis" },
  { cve_servicio: 6, nombre: "Spa" },
  { cve_servicio: 7, nombre: "Bar en hotel" },
];

const ModalNuevoSitio = ({ isOpen, toggle, handleSubmit }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [tipo_sitio, setTipo_sitio] = useState(1);
  const [correo, setCorreo] = useState("");
  const [nombre_sitio, setNombre] = useState(null);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pagina_web, setPaginaWeb] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioLunesA, setHorarioLunesA] = useState("0");
  const [horarioMartesA, setHorarioMartesA] = useState("0");
  const [horarioMiercolesA, setHorariomMiercolesA] = useState("0");
  const [horarioJuevesA, setHorarioJuevesA] = useState("0");
  const [horarioViernesA, setHorarioViernesA] = useState("0");
  const [horarioSabadoA, setHorarioSabadoA] = useState("0");
  const [horarioDomingoA, setHorarioDomingoA] = useState("0");
  const [horarioLunesC, setHorarioLunesC] = useState("0");
  const [horarioMartesC, setHorarioMartesC] = useState("0");
  const [horarioMiercolesC, setHorariomMiercolesC] = useState("0");
  const [horarioJuevesC, setHorarioJuevesC] = useState("0");
  const [horarioViernesC, setHorarioViernesC] = useState("0");
  const [horarioSabadoC, setHorarioSabadoC] = useState("0");
  const [horarioDomingoC, setHorarioDomingoC] = useState("0");
  const [delegacion, setDelegacion] = useState(1);
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
  let horario = [];
  const [isSending, setIsSending] = useState(false);

  const handleTipoSitio = (e) => {
    setTipo_sitio(e);

    setEtiquetas([]);
  };

  useEffect(() => {
    console.log(ubicacion);
  }, [ubicacion]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSending(true);

    setHorarios(
      { dia: 1, horaEntrada: horarioLunesA, horaSalida: horarioLunesC },
      { dia: 2, horaEntrada: horarioMartesA, horaSalida: horarioMartesC },
      { dia: 3, horaEntrada: horarioMiercolesA, horaSalida: horarioMiercolesC },
      { dia: 4, horaEntrada: horarioJuevesA, horaSalida: horarioJuevesC },
      { dia: 5, horaEntrada: horarioViernesA, horaSalida: horarioViernesC },
      { dia: 6, horaEntrada: horarioSabadoA, horaSalida: horarioSabadoC },
      { dia: 7, horaEntrada: horarioDomingoA, horaSalida: horarioDomingoC }
    );

    try {
      const formData = new FormData();
      formData.append("nombre_sitio", nombre_sitio);
      formData.append("correo_usuario", auth.correo_usuario);
      formData.append("latitud", ubicacion.lat);
      formData.append("longitud", ubicacion.lng);
      formData.append("descripcion", descripcion);
      formData.append("correo", correo);
      formData.append("costo", costo_promedio);
      formData.append("pagina_web", pagina_web);
      formData.append("telefono", telefono);
      formData.append("direccion", direccion);
      formData.append("adscripcion", adscripcion);
      formData.append("cve_tipo_sitio", tipo_sitio.value);
      formData.append("cve_delegacion", delegacion.value);
      formData.append("colonia", colonia);
      formData.append("etiquetas", JSON.stringify(etiquetas));
      formData.append("servicios", JSON.stringify(servicios));
      //formData.append("horarios", JSON.stringify(horarios));
      formData.append("fotos_sitio", foto_sitio);

      const response = await sitiosService.addServicios(formData);
      //console.log(response);
      handleSubmit(response);
      //const rol = response?.user?.rol
      setIsSending(false);
      toast.success(response.mensaje);

      toggle();

      //navigate(`/${ROUTES.INICIO}`);
    } catch (err) {
      setIsSending(false);
      console.log(err);
      if (tipo_sitio != null && delegacion != null && nombre_sitio != null) {
        toast.error(
          err.code === "ERR_BAD_RESPONSE"
            ? err.message
            : err?.response?.data?.error
        );
      }
      if (tipo_sitio == null) {
        toast.error("Falta seleccionar el tipo de sitio");
      }
      if (delegacion == null) {
        toast.error("Falta seleccionar la delegacion");
      }
      if (nombre_sitio == null) {
        toast.error("Falta ingresar el nombre del sitio");
      }
    }
  };

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
              {tipo_sitio?.value == 1 && (
                <div class="form-group col-md-6">
                  <label for="inputEtiquetas">Etiquetas</label>
                  <Select
                    id="inputEtiquetas"
                    options={ETIQUETAS_MUSEO}
                    value={etiquetas}
                    defaultValue={etiquetas}
                    onChange={setEtiquetas}
                    placeholder="Seleccione una o mas etiquetas..."
                    noOptionsMessage={() => "Etiqueta no encontrada"}
                    isMulti
                  />
                </div>
              )}
              {tipo_sitio?.value == 5 && (
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
              {(tipo_sitio?.value == 6 || tipo_sitio.value == 1) && (
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
              <div class="form-group col-md-4">
                <label for="inputPaginaWeb">Direccion completa</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPaginaWeb"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
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
            onClick={(e) => handleSubmitForm(e)}
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
