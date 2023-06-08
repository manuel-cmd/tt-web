import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import SitioCard from "../Inicio/components/SitioCard";
import { Container, Row } from "reactstrap";
import TipoSitio from "../Inicio/components/TipoSitio";
import { Loader } from "../../../components";
import usuariosService from "../../../services/usuario.services";

const TIPO_SITIOS = [
  {
    nombre: "Museos",
    imagen: require("../../../assets/Sitios/Museo.png"),
    ruta: "",
    cveTipoSitio: 1,
  },
  {
    nombre: "Teatros",
    imagen: require("../../../assets/Sitios/Teatro.png"),
    ruta: "",
    cveTipoSitio: 2,
  },
  {
    nombre: "Monumentos",
    imagen: require("../../../assets/Sitios/Monumento.png"),
    ruta: "",
    cveTipoSitio: "",
  },
  {
    nombre: "Hoteles",
    imagen: require("../../../assets/Sitios/Hotel.png"),
    ruta: "",
    cveTipoSitio: "",
  },
  {
    nombre: "Restaurantes",
    imagen: require("../../../assets/Sitios/Restaurante.png"),
    ruta: "",
    cveTipoSitio: "",
  },
  {
    nombre: "Parques",
    imagen: require("../../../assets/Sitios/Parque.png"),
    ruta: "",
    cveTipoSitio: "",
  },
];

const Favoritos = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
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
      usuariosService.getFavoritos(access_token).then((response) => {
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
  };

  const ListaSitios = () => {
    return (
      <div class="row">
        {sitiosFiltrados.map((sitio) => (
          <SitioCard
            sitio={sitio}
            listaFavs={listaFavs}
            setListaFavs={setListaFavs}
          />
        ))}
      </div>
    );
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      {/* <SearchBar /> */}

      <div
        className="row justify-content-center"
        style={{ marginTop: "15px", width: "100%" }}
      >
        {TIPO_SITIOS.map((sitio) => (
          <TipoSitio
            nombre={sitio.nombre}
            icono={sitio.imagen}
            cve={sitio.cveTipoSitio}
            active={sitioClave}
            handleActivo={handleSitioClave}
          />
        ))}
      </div>

      {isLoading ? (
        <div
          className="sitios d-flex justify-content-center align-items-center"
          style={{ minHeight: "250px", paddingTop: "25px" }}
        >
          <Loader />
        </div>
      ) : (
        <ListaSitios />
      )}
    </Container>
  );
};

export default Favoritos;
