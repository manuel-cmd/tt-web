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

const sitiosService = { getServicios, getServicioById, addServicios };

export default sitiosService;
