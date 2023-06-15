import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import SitioCard from "./components/SitioCard";
import { Container, Row } from "reactstrap";
import TipoSitio from "../Inicio/components/TipoSitio";
import { Loader } from "../../../components";
import sitiosService from "../../../services/sitios.services";

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
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);
  const [listaFavs, setListaFavs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      sitiosService.getFavoritos(auth.correo_usuario).then((response) => {
        console.log("response: ", response);
        setListaSitios(response);
        setSitiosFiltrados(response);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let filter = [];
    listaSitios.forEach((sitio) => {
      if (listaFavs.includes(sitio.cve_sitio)) {
        filter.push(sitio);
      }
    });
    setSitiosFiltrados(filter);
  }, [listaFavs]);

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
          <SitioCard sitio={sitio} setFavs={setListaFavs} />
        ))}
      </div>
    );
  };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      {/* <SearchBar /> */}

      <div
        className="row justify-content-center"
        style={{ marginTop: "15px", marginBottom: "15px", width: "100%" }}
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
