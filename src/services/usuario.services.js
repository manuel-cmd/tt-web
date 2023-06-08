import axios from "axios";
import { API } from "../api";

const favoritos = async (access_token) => {
  return axios
    .post(API + "/mostrar_favoritos", access_token, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getFavoritos = async (access_token) => {
  return axios
    .get(API + `/mostrar_favoritos/${access_token}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const addFavoritos = async (form) => {
  return axios
    .post(API + "/agregar_favorito", form, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getResenas = async (access_token) => {
  return axios
    .get(API + `/mostrar_resenas/${access_token}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const addResena = async (form) => {
  return axios
    .post(API + "/crear_comentario", form, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const editResena = async (form) => {
  return axios
    .post(API + "/modificar_comentario", form, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getRecomendaciones = async (access_token) => {
  return axios
    .get(API + `/mostrar_recomendaciones/${access_token}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      return response.data;
    });
};

const usuariosService = {
  favoritos,
  getFavoritos,
  addFavoritos,
  getResenas,
  addResena,
  editResena,
  getRecomendaciones,
};

export default usuariosService;
