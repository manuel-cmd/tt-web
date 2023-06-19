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

const editServicios = async (form) => {
  return axios
    .put(API + "/modificar_sitio", form, {
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

const getResenas = async (correo_usuario) => {
  return axios
    .get(API + `/mostrar_reseñas/${correo_usuario}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const getServicioById = async (id, correo_usuario) => {
  return axios
    .get(
      API +
        `/mostrar_sitio/${id}${
          correo_usuario ? "?correo_usuario=" + correo_usuario : ""
        }`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const removeServicios = async (correo_usuario, cve_sitio) => {
  console.log("daos: ", correo_usuario, cve_sitio);
  return axios
    .delete(
      API + "/eliminar_sitio",
      { data: { correo_usuario, cve_sitio } },
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "multipart/form-data",
        },
      }
    )
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

const addToFavoritos = async (cve_sitio, correo_usuario) => {
  console.log("JSON", { correo_usuario, cve_sitio });
  return axios
    .post(
      API + "/agregar_sitio_favorito",
      { correo_usuario, cve_sitio },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getFavoritos = async (correo_usuario) => {
  return axios
    .get(API + `/mostrar_favoritos/${correo_usuario}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const addToHistorial = async (cve_sitio, correo_usuario) => {
  return axios
    .post(
      API + "/agregar_historial",
      { correo_usuario, cve_sitio },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getHistorial = async (correo_usuario) => {
  return axios
    .get(API + `/mostrar_historial/${correo_usuario}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const getRecomendaciones = async (correo_usuario) => {
  return axios
    .get(API + `/mostrar_recomendaciones/${correo_usuario}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const sitiosService = {
  getServicios,
  getServicioById,
  addServicios,
  editServicios,
  getResenas,
  removeServicios,
  disableServicios,
  addToFavoritos,
  getFavoritos,
  addToHistorial,
  getHistorial,
  getRecomendaciones,
};

export default sitiosService;
