import axios from "axios";
import { API } from "../api";

const login = async (correo_usuario, contrasena) => {
  console.log("entre");
  return axios
    .post(
      API + "/login",
      {
        correo_usuario,
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

const registro = async (form) => {
  console.log(form);
  return axios
    .post(API + "/registro", form, {
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("usuario", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("usuario");
};

const authService = { login, logout, registro };

export default authService;
