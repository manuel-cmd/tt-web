import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import sitiosService from "../../../services/sitios.services";
import { Loader } from "../../../components";
import { COLORS } from "../../../constants/colors";
import Ver from "./components/Ver";
import usuariosService from "../../../services/usuario.services";

const data = [
  { nombre: "Juan", correo: "juan@gmail.com" },
  { nombre: "Manuel", correo: "manuel@gmail.com" },
  { nombre: "Isra", correo: "isra@gmail.com" },
  { nombre: "Aaron", correo: "aaron@gmail.com" },
];

const Sitios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);
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
      usuariosService.mostrarUsuarios().then((response) => {
        setListaUsuarios(response);
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
      selector: (row) => row.usuario,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
    },
    {
      name: "Habilitado",
      selector: (row) =>
        row.habilitado ? (
          <p
            style={{
              backgroundColor: "lightgreen",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "15px",
            }}
          >
            Habilitado
          </p>
        ) : (
          <p
            style={{
              backgroundColor: "red",
              paddingLeft: "15px",
              paddingRight: "15px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "15px",
              color: "white",
            }}
          >
            deshabilitado
          </p>
        ),
    },
    {
      name: "Acciones",
      selector: (row) => (
        <div
          className="d-flex flex-row justify-content-center"
          style={{ width: "150px" }}
        >
          <Ver id={row.correo} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (nuevo != false) refresh();
  }, [nuevo]);

  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-between w-100">
        <h1>Listado de Usuarios</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={listaUsuarios}
          pagination
        />
      )}{" "}
    </div>
  );
};

export default Sitios;
