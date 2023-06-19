import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import usuariosService from "../../../services/usuario.services";
import { ROUTES } from "../../../constants/routes";

import "./Configuracion.css";

const Configuracion = ({ isOpen, toggle }) => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [user, setUser] = useState("");
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    console.log("hola");
    try {
      const formData = new FormData();
      formData.append("correo", correo);
      formData.append("usuario", user);
      formData.append("contrasena", contrasena);

      const response = await usuariosService.editCuenta(formData);
      const {
        cve_tipo_usuario,
        correo_usuario,
        usuario,
        tipo_usuario,
        link_imagen,
      } = response;
      //const rol = response?.user?.rol
      setAuth({
        cve_tipo_usuario,
        correo_usuario,
        usuario,
        tipo_usuario,
        link_imagen,
      });
      setIsSending(false);

      toggle();
    } catch (err) {
      setIsSending(false);
      console.log(err);
      setCorreo("");
      setContrasena("");
      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
  };

  const handleEliminar = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      console.log("registro", correo, user, contrasena);
      const formData = new FormData();
      formData.append("correo", correo);
      formData.append("usuario", user);
      formData.append("contrasena", contrasena);

      const response = await usuariosService.eliminarCuenta(formData);
      setIsSending(false);
      navigate(`/${ROUTES.INICIO}`);
      toggle();
    } catch (err) {
      setIsSending(false);
      console.log(err);
      toast.error(
        err.code === "ERR_BAD_RESPONSE"
          ? err.message
          : err?.response?.data?.error
      );
    }
  };

  useEffect(() => {
    setCorreo(auth.correo_usuario);
    setContrasena("");
    setUser(auth.usuario);
  }, []);

  return (
    <div className="">
      <div className="formulario form col-md-6">
        <div class="form-group  first">
          <label for="username">Correo</label>
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="text"
            class="form-control"
            placeholder={auth.correo_usuario}
            id="correo"
          />
        </div>
        <div class="form-group last mb-3">
          <label for="username">Usuario</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type="text"
            class="form-control"
            placeholder={auth.usuario}
            id="username"
            onblur="if (this.value == '') {this.value = 'email@abc.example';}"
            onfocus="if (this.value == 'email@abc.example') {this.value = '';}"
          />
        </div>
        <div class="form-group last mb-3">
          <label for="password">Contraseña</label>
          <input
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            type="password"
            class="form-control"
            placeholder="Your Password"
            id="password"
          />
        </div>

        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          value="Registrarse"
          disabled={isSending}
          class="btn primario btn-block"
          style={{ color: "white", height: "50px" }}
        >
          {isSending ? (
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>Actualizar</>
          )}
        </button>
        <button
          type="button"
          onClick={(e) => handleEliminar(e)}
          value="Registrarse"
          disabled={isSending}
          class="btn primario btn-block"
          style={{ color: "white", height: "50px" }}
        >
          {isSending ? (
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>Eliminar cuenta</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Configuracion;
