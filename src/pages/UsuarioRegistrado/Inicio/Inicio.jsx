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

const Inicio = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);
  const [listaFavs, setListaFavs] = useState([]);

  useEffect(() => {
    auth.access_token && console.log("Esta loggeado");
    // console.log("Lista: ", listaFavs);
  }, [auth]);

  useEffect(() => {
    setIsLoading(true);
    try {
      sitiosService
        .getServicios()
        .then((response) => {
          const filter = response.filter(
            (sitio) => sitio.cve_tipo_sitio === sitioClave
          );
          setSitiosFiltrados(filter);
          setListaSitios(response);
          console.log(filter);
        })
        .then(() => {
          if (auth?.correo_usuario) {
            sitiosService.getFavoritos(auth.correo_usuario).then((response) => {
              setListaFavs(
                response.map((sitio) => {
                  return sitio.cve_sitio;
                })
              );
              setIsLoading(false);
            });
          }
        });
      console.log("los sitios son: ", listaSitios);
      setIsLoading(false);
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
        style={{ marginTop: "15px",marginBottom:"15px", width: "100%" }}
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
