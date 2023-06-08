import axios from "axios";
import { API } from "../api";

const addServicios = async (form) => {
  return axios
    .post(API + "/crear_sitio", form, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getServicios = async () => {
  return axios
    .get(API + "/mostrar_sitios", {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const getServicioById = async (id) => {
  return axios
    .get(API + `/mostrar_sitio/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const removeServicios = async (cve_sitio) => {
  return axios
    .post(API + "/eliminar_sitio", cve_sitio, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const disableServicios = async (cve_sitio) => {
  return axios
    .post(API + "/inhabilitar_sitio", cve_sitio, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const addToFavoritos = async (cve_sitio, token) => {
  return axios
    .post(
      API + "/agregar_sitio_favorito",
      { cve_sitio },
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const sitiosService = {
  getServicios,
  getServicioById,
  addServicios,
  removeServicios,
  disableServicios,
  addToFavoritos,
};

export default sitiosService;
