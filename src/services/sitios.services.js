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

const sitiosService = { getServicios };

export default sitiosService;
