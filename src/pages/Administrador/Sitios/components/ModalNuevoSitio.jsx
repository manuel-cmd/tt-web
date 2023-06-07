import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Mapa } from "../../../../components";
import sitiosService from "../../../../services/sitios.services";

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
  { value: 1, label: "Azcapotzalco" },
  { value: 2, label: "Benito Juárez" },
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
  { cve_etiqueta: 6, nombre: "Antropología" },
  { cve_etiqueta: 5, nombre: "Arqueología" },
  { cve_etiqueta: 2, nombre: "Arte" },
  { cve_etiqueta: 12, nombre: "Buffet" },
  { cve_etiqueta: 1, nombre: "Ciencia y tecnología" },
  { cve_etiqueta: 11, nombre: "Cortes" },
  { cve_etiqueta: 4, nombre: "Especializado" },
  { cve_etiqueta: 8, nombre: "Hamburguesas" },
  { cve_etiqueta: 3, nombre: "Historia" },
  { cve_etiqueta: 10, nombre: "Mariscos" },
  { cve_etiqueta: 13, nombre: "Música en vivo" },
  { cve_etiqueta: 9, nombre: "Pizzas" },
  { cve_etiqueta: 15, nombre: "Restaurante/Bar" },
  { cve_etiqueta: 14, nombre: "Románticos" },
  { cve_etiqueta: 7, nombre: "Tacos" },
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

const ModalNuevoSitio = ({ isOpen, toggle }) => {
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

  const handleSubmit = async (e) => {
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
      console.log("lat: ", ubicacion.lat);
      console.log("lng: ", ubicacion.lng);
      const formData = new FormData();
      formData.append("nombre_sitio", nombre_sitio);
      formData.append("longitud", ubicacion.lng);
      formData.append("latitud ", ubicacion.lat);
      formData.append("descripcion", descripcion);
      formData.append("correo", correo);
      formData.append("costo", costo_promedio);
      formData.append("pagina_web", pagina_web);
      formData.append("telefono", telefono);
      formData.append("adscripcion", adscripcion);
      formData.append("cve_tipo_sitio ", tipo_sitio.value);
      formData.append("cve_delegacion ", delegacion.value);
      formData.append("colonia", colonia);
      formData.append("etiquetas", JSON.stringify(etiquetas));
      formData.append("horarios", null);
      formData.append("fotos_sitio", foto_sitio);

      const response = await sitiosService.addServicios(formData);
      console.log(response);
      //const rol = response?.user?.rol
      setIsSending(false);

      toggle();
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

            <div class="form-group row">
              <div class="form-group">
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Lunes: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioLunesA}
                      onChange={(e) => setHorarioLunesA(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioLunesC}
                      onChange={(e) => setHorarioLunesC(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Martes: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioMartesA}
                      onChange={(e) => setHorarioMartesA(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioMartesC}
                      onChange={(e) => setHorarioMartesC(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Miercoles: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioMiercolesA}
                      onChange={(e) => setHorariomMiercolesA(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioMiercolesC}
                      onChange={(e) => setHorariomMiercolesC(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Jueves: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioJuevesA}
                      onChange={(e) => setHorarioJuevesA(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioJuevesC}
                      onChange={(e) => setHorarioJuevesC(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Viernes: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioViernesA}
                      onChange={(e) => setHorarioViernesA(e.target.value)}
                      placeholder="00:00"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioViernesC}
                      onChange={(e) => setHorarioViernesC(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Sabado: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioSabadoA}
                      onChange={(e) => setHorarioSabadoA(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioSabadoC}
                      onChange={(e) => setHorarioSabadoC(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="form-group col-md-2">
                    <label for="inputAdscripcion">Domingo: </label>
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioDomingoA}
                      onChange={(e) => setHorarioDomingoA(e.target.value)}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <input
                      placeholder="00:00"
                      type="text"
                      class="form-control"
                      id="inputAdscripcion"
                      value={horarioDomingoC}
                      onChange={(e) => setHorarioDomingoC(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div class="form-group col-md-2">
                <label for="formFile" class="form-label">
                  Foto Perifl
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={(e) => setFoto_sitio(e.target.files[0])}
                ></input>
              </div>
            </div>
          </form>
          <Mapa setUbicacion={setUbicacion} ubicacion={ubicacion} />
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
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
