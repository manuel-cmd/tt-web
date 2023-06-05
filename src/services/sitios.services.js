import axios from "axios";
import { API } from "../api";

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

const sitiosService = { getServicios, getServicioById };

export default sitiosService;
