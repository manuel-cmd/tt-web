import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

//import usuariosService from "../../../services/usuario.services";
import sitiosService from "../../../services/sitios.services";

import ResenaCard from "./components/resenaCard";
import ReactStars from "react-rating-stars-component";
import Select from "react-select";
import { Container } from "reactstrap";

import { TipoSitio } from "../Inicio/components";
import { Loader } from "../../../components";

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

const ETIQUETAS_RESTAURANTE = [
  { value: 6, label: "Antropología" },
  { value: 5, label: "Arqueología" },
  { value: 2, label: "Arte" },
  { value: 12, label: "Buffet" },
  { value: 1, label: "Ciencia y tecnología" },
  { value: 11, label: "Cortes" },
  { value: 4, label: "Especializado" },
  { value: 8, label: "Hamburguesas" },
  { value: 3, label: "Historia" },
  { value: 10, label: "Mariscos" },
  { value: 13, label: "Música en vivo" },
  { value: 9, label: "Pizzas" },
  { value: 15, label: "Restaurante/Bar" },
  { value: 14, label: "Románticos" },
  { value: 7, label: "Tacos" },
];

const ETIQUETAS_HOTEL = [
  { value: 1, label: "Alberca" },
  { value: 2, label: "Estacionamiento" },
  { value: 3, label: "Aire acondicionado" },
  { value: 4, label: "Televisión por cable" },
  { value: 5, label: "Wifi gratis" },
  { value: 6, label: "Spa" },
  { value: 7, label: "Bar en hotel" },
];

const DELEGACIONES = [
  { value: 1, label: "Álvaro Obregón" },
  { value: 3, label: "Azcapotzalco" },
  { value: 2, label: "Benito Juárez" },
  { value: 4, label: "Coyoacán" },
  { value: 5, label: "Cuajimalpa de Morelos" },
  { value: 6, label: "Cuauhtémoc" },
  { value: 7, label: "Gustavo A. Madero" },
  { value: 8, label: "Iztacalco" },
  { value: 9, label: "Iztapalapa" },
  { value: 10, label: "Magdalena Contreras" },
  { value: 11, label: "Miguel Hidalgo" },
  { value: 12, label: "Milpa Alta" },
  { value: 13, label: "Tláhuac" },
  { value: 14, label: "Tlalpan" },
  { value: 15, label: "Venustiano Carranza" },
  { value: 16, label: "Xochimilco" },
];

const FILTRAR_POR = [
  { value: 1, label: "Mejor calificados" },
  { value: 2, label: "Más populares" },
  { value: 3, label: "Más cercanos" },
  { value: 4, label: "Mayor precio" },
  { value: 5, label: "Menor precio" },
];

const Resenas = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(false);
  const [recomendadosLoading, setRecomendadosLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);
  const [listaFavs, setListaFavs] = useState([]);
  const [sitiosRecomendados, setSitiosRecomendados] = useState([]);
  const [sitiosMostrar, setSitiosMostar] = useState("todos");
  const [resenas, setResenas] = useState([]);

  const [state, setState] = useState(false);
  const [etiquetasHotel, setEtiquetasHotel] = useState([null]);
  const [delegacion, setDelegacion] = useState({ value: 0, label: "" });
  const [calificacion, setCalificacion] = useState(null);
  const [filtrarpor, setFiltrarPor] = useState([null]);

  useEffect(() => {
    auth.correo_usuario && console.log("Esta loggeado");
    // console.log("Lista: ", listaFavs);
  }, [auth]);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (auth.correo_usuario) {
        //consegirResenas();
        sitiosService.getResenas(auth.correo_usuario).then((response) => {
          //setIsLoading(false);
          console.log("resenas", response);
          setResenas(response);
        });
        console.log("los sitios son: ", listaFavs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleSitioClave = (activo) => {
    setSitioClave(activo);
  };

  /*const getRecomendaciones = async () => {
    setRecomendadosLoading(true);
    const recomendaciones = await sitiosService.getRecomendaciones(
      auth.correo_usuario
    );
    setSitiosRecomendados(recomendaciones);
    setSitiosMostar("recomendacion");
    console.log(recomendaciones);
    setRecomendadosLoading(false);
  };*/

  const funcionFiltro = async () => {
    if (state == false) {
      setState(true);
    }
    if (state == true) {
      setState(false);
    }
    console.log("state es: ", state);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setCalificacion(newRating);
  };

  useEffect(() => {
    setSitiosFiltrados(
      sitiosMostrar === "todos" ? listaSitios : sitiosRecomendados
    );
  }, [sitiosMostrar]);

  const ListaSitios = () => {
    console.log("hola");

    return (
      <div class="row">
        {resenas.map((resena) => (
          <ResenaCard
            sitio={resena}
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
        style={{ marginTop: "15px", marginBottom: "15px", width: "100%" }}
      >
        <div className="column">
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
          <br />
          {state == true && (
            <div className="filtro">
              <ReactStars
                count={5}
                value={calificacion}
                size={20}
                activeColor="#ffd700"
                onChange={ratingChanged}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
              />
              <Select
                id="inputEtiquetas"
                options={ETIQUETAS_HOTEL}
                value={etiquetasHotel}
                defaultValue={etiquetasHotel}
                onChange={setEtiquetasHotel}
                placeholder="Seleccione una o mas etiquetas..."
                noOptionsMessage={() => "Etiqueta no encontrada"}
                isMulti
              />
              <Select
                id="inputDelegacionEditar"
                options={DELEGACIONES}
                value={delegacion}
                defaultValue={delegacion}
                onChange={setDelegacion}
                placeholder="Delegacion"
              />
              <Select
                id="inputEtiquetas"
                options={FILTRAR_POR}
                value={filtrarpor}
                defaultValue={filtrarpor}
                onChange={setFiltrarPor}
                placeholder="Ordenar"
              />
            </div>
          )}
        </div>
        {auth.cve_tipo_usuario === 1 && (
          <div className="mostrarSitio">
            {
              /*sitiosMostrar === "todos" ? (
              <button
                className="btn btn-primary primario"
                onClick={() => getRecomendaciones()}
                disabled={recomendadosLoading}
              >
                {recomendadosLoading ? (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>Mostrar Recomendados</>
                )}
              </button>
            ) : (*/
              <button
                className="btn btn-primary primario"
                onClick={() => setSitiosMostar("todos")}
              >
                Mostrar todos
              </button>
              /*)*/
            }
          </div>
        )}
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

export default Resenas;
