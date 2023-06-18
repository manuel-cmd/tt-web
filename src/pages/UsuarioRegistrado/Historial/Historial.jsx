import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import SitioCard from "./components/SitioCard";
import { Container, Row } from "reactstrap";
import { TipoSitio } from "../Inicio/components";
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
    cveTipoSitio: 3,
  },
  {
    nombre: "Hoteles",
    imagen: require("../../../assets/Sitios/Hotel.png"),
    ruta: "",
    cveTipoSitio: 4,
  },
  {
    nombre: "Restaurantes",
    imagen: require("../../../assets/Sitios/Restaurante.png"),
    ruta: "",
    cveTipoSitio: 5,
  },
  {
    nombre: "Parques",
    imagen: require("../../../assets/Sitios/Parque.png"),
    ruta: "",
    cveTipoSitio: 6,
  },
];

const Historial = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      sitiosService.getHistorial(auth.correo_usuario).then((response) => {
        const filter = response.filter(
          (sitio) => sitio.cve_tipo_sitio === sitioClave
        );
        setSitiosFiltrados(filter);
        setListaSitios(response);
        console.log(filter);
      });
      console.log("los sitios son: ", listaSitios);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const handleSitioClave = (activo) => {
    const filter = listaSitios.filter(
      (sitio) => sitio.cve_tipo_sitio === activo
    );
    setSitiosFiltrados(filter);

    setSitioClave(activo);
  };

  const ListaSitiosFiltrados = () => {
    return (
      <div class="row">
        {sitiosFiltrados.map((sitio) => (
          <SitioCard sitio={sitio} />
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
        <div className="column" style={{ width: "80%" }}>
          <div className="row">
            <div className="col">
              <div className="row">
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
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div
          className="sitios d-flex justify-content-center align-items-center"
          style={{ minHeight: "250px", paddingTop: "25px" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <ListaSitiosFiltrados />
        </>
      )}
    </Container>
  );
};

export default Historial;
