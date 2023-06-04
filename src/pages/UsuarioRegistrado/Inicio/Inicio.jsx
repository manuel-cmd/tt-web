import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { SearchBar, SitioCard } from "./components";
import { Container, Row } from "reactstrap";
import { TipoSitio } from "./components";
import { Loader } from "../../../components";
import sitiosService from "../../../services/sitios.services";

const TIPO_SITIOS = [
  {
    nombre: "Museos",
    imagen: require("../../../assets/Sitios/Museo.png"),
    ruta: "",
    cveTipoSitio: "",
  },
  {
    nombre: "Teatros",
    imagen: require("../../../assets/Sitios/Teatro.png"),
    ruta: "",
    cveTipoSitio: "",
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

const Inicio = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      sitiosService.getServicios().then((response) => {
        const filter = response.filter(
          (sitio) => sitio.cve_tipo_sitio === sitioClave
        );
        setListaSitios(filter);
        console.log(filter);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleActivo = (activo) => {
    setIsLoading(true);
    setActivo(activo);
  };

  const ListaSitios = () => {
    return (
      <div
        style={{ width: "100%", marginLeft: "0px", marginRight: "0px" }}
        className="row justify-content-between sitiosGrid"
      >
        {listaSitios.map((sitio) => (
          <SitioCard nombre={sitio.nombre_sitio} />
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
            active={activo}
            handleActivo={handleActivo}
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

export default Inicio;
