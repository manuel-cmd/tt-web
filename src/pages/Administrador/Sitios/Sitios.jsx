import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import sitiosService from "../../../services/sitios.services";
import { Loader, Mapa } from "../../../components";
import { COLORS } from "../../../constants/colors";
import Editar from "./components/Editar";
import Estatus from "./components/Estatus";
import ModalNuevoSitio from "./components/ModalNuevoSitio";
import Ver from "./components/Ver";
import Eliminar from "./components/Eliminar";
import ModalEditarSitio from "./components/ModalEditarSitio";

const Sitios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listaSitios, setListaSitios] = useState([]);
  const [modalNuevoSitio, setModalNuevoSitio] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [sitioEditar, setSitioEditar] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [nuevo, setNuevo] = useState(false);

  const toggle = () => setModalNuevoSitio(!modalNuevoSitio);
  const toggleEditar = () => setModalEditar(!modalEditar);
  const refresh = () => window.location.reload(true);

  useEffect(() => {
    try {
      sitiosService.getServicios().then((response) => {
        setListaSitios(response);
        console.log(response);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: COLORS.PRIMARIO,
        color: "white",
        fontSize: "18px", // override the row height
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre_sitio,
    },
    {
      name: "Delegacion",
      selector: (row) => row.delegacion,
    },
    {
      name: "Habilitado",
      selector: (row) => (row.habilitado ? "habilitado" : "deshabilitado"),
    },
    {
      name: "Correo",
      selector: (row) => row.correo_sitio,
    },
    {
      name: "Acciones",
      selector: (row) => (
        <div
          className="d-flex flex-row justify-content-center"
          style={{ width: "150px" }}
        >
          <Editar sitioEditar={row} handleModalEditar={handleModalEditar} />
          <Ver id={row.cve_sitio} />
          <Estatus id={row.cve_sitio} status={row.habilitado} />
          <Eliminar id={row.cve_sitio} />
        </div>
      ),
    },
  ];

  const handleModalEditar = (sitio) => {
    setSitioEditar(sitio);
    toggleEditar();
  };

  const handleSubmit = async (e) => {
    console.log("e es:", e);
    setNuevo(true);
  };

  useEffect(() => {
    if (nuevo != false) refresh();
  }, [nuevo]);

  return (
    <div className="container">
      <ModalNuevoSitio
        toggle={toggle}
        isOpen={modalNuevoSitio}
        handleSubmit={handleSubmit}
      />
      <ModalEditarSitio
        sitio={sitioEditar}
        toggle={toggleEditar}
        isOpen={modalEditar}
      />
      <div className="d-flex flex-row justify-content-between w-100">
        <h1>Listado de Sitios</h1>
        <button
          type="button"
          onClick={() => toggle()}
          value="Registrarse"
          class="btn primario"
          style={{ color: "white", height: "50px" }}
        >
          Agregar Sitio
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={listaSitios}
          pagination
        />
      )}{" "}
    </div>
  );
};

export default Sitios;
