import axios from "axios";
import { API } from "../api";

const login = async (correo, contrasena) => {
  console.log("entre");
  return axios
    .post(
      API + "/login",
      {
        correo,
        contrasena,
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("usuario", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const authService = { login };

export default authService;
