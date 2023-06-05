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

const Inicio = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(2);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      sitiosService.getServicios().then((response) => {
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
    // setIsLoading(true);
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
          <SitioCard sitio={sitio} />
        ))}
      </div>
      // <div
      //   style={{ width: "100%", marginLeft: "0px", marginRight: "0px" }}
      //   className="row justify-content-between sitiosGrid"
      // >
      //   {sitiosFiltrados.map((sitio) => (
      //     <SitioCard sitio={sitio} />
      //   ))}
      // </div>
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

export default Inicio;
