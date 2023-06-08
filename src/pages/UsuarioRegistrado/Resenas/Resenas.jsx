import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import usuariosService from "../../../services/usuario.services";

import ResenaCard from "./components/resenaCard";

const Resenas = ({ sitio, listaFavs, setListaFavs }) => {
  const { auth } = useAuth();
  /*const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(2);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);
  const [listaFavs, setListaFavs] = useState([12, 13, 15, 22, 23]);
  const access_token = auth?.access_token;

  useEffect(() => {
    console.log("Lista: ", listaFavs);
  }, [listaFavs]);

  useEffect(() => {
    setIsLoading(true);
    try {
      usuariosService.getResenas(access_token).then((response) => {
        const filter = response.filter(
          (sitio) => sitio.cve_tipo_sitio === sitioClave
        );
        setSitiosFiltrados(filter);
        setListaSitios(response);
        console.log(filter);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleSitioClave = (activo) => {
    const filter = listaSitios.filter(
      (sitio) => sitio.cve_tipo_sitio === activo
    );
    setSitiosFiltrados(filter);

    setSitioClave(activo);
  };*/

  return <ResenaCard />;
};

export default Resenas;
