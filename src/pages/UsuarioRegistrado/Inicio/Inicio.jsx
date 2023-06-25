import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { SearchBar, SitioCard } from "./components";
import {
  Container,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";
import ReactStars from "react-rating-stars-component";
import { TipoSitio } from "./components";
import { Loader } from "../../../components";
import sitiosService from "../../../services/sitios.services";

import "./Inicio.css";

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
    cveTipoSitio: 5,
  },
  {
    nombre: "Restaurantes",
    imagen: require("../../../assets/Sitios/Restaurante.png"),
    ruta: "",
    cveTipoSitio: 6,
  },
  {
    nombre: "Parques",
    imagen: require("../../../assets/Sitios/Parque.png"),
    ruta: "",
    cveTipoSitio: 4,
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
  { value: 0, label: "Todas" },
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
  { value: 0, label: "Por defecto" },
  { value: 1, label: "Mejor calificados" },
  { value: 2, label: "Más populares" },
  { value: 3, label: "Más cercanos" },
  { value: 4, label: "Mayor precio" },
  { value: 5, label: "Menor precio" },
];

const Inicio = () => {
  const { auth } = useAuth();
  const [activo, setActivo] = useState("Museos");
  const [isLoading, setIsLoading] = useState(true);
  const [recomendadosLoading, setRecomendadosLoading] = useState(false);
  const [listaSitios, setListaSitios] = useState([]);
  const [sitioClave, setSitioClave] = useState(1);
  const [sitiosFiltrados, setSitiosFiltrados] = useState([]);
  const [listaFavs, setListaFavs] = useState([]);
  const [sitiosRecomendados, setSitiosRecomendados] = useState([]);
  const [sitiosMostrar, setSitiosMostar] = useState("todos");
  const [modalFiltro, setModalFiltro] = useState(false);
  const [buscar, setBuscar] = useState("");

  const [state, setState] = useState(false);
  const [etiquetasHotel, setEtiquetasHotel] = useState([null]);
  const [etiquetasRest, setEtiquetasRest] = useState([]);

  const [delegacion, setDelegacion] = useState({
    value: 0,
    label: "Todas las delegacions",
  });
  const [calificacion, setCalificacion] = useState(null);
  const [filtrarpor, setFiltrarPor] = useState([null]);

  const toggle = () => setModalFiltro(!modalFiltro);

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
          console.log("Primer UseEffect", filter);
        })
        .then(() => {
          if (auth?.correo_usuario) {
            sitiosService.getFavoritos(auth.correo_usuario).then((response) => {
              setListaFavs(
                response.map((sitio) => {
                  return sitio.cve_sitio;
                })
              );
              //setIsLoading(false);
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
    setSitioClave(activo);
  };

  const getRecomendaciones = async () => {
    setRecomendadosLoading(true);
    const recomendaciones = await sitiosService.getRecomendaciones(
      auth.correo_usuario
    );
    setSitiosRecomendados(recomendaciones);
    setSitiosMostar("recomendacion");
    console.log(recomendaciones);
    setRecomendadosLoading(false);
  };

  // useEffect(()=>{
  //   if(buscar){
  //     console.log("buscar con algo")
  //   }else{
  //     console.log("buscar sin nada")
  //   }
  // },[buscar])

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
    console.log("Sitios Filtrados", sitiosFiltrados);
  }, [sitiosFiltrados]);

  useEffect(() => {
    const sitios = sitiosMostrar === "todos" ? listaSitios : sitiosRecomendados;

    if (sitios.length > 0) {
      const filter = sitios.filter(
        (sitio) => sitio.cve_tipo_sitio === sitioClave
      );
      console.log("filter: ", filter, "delegacion: ", delegacion);
      let filterDelegacion = [];
      if (delegacion.value == 0) {
        filterDelegacion = filter;
      } else {
        filterDelegacion = filter.filter(
          (sitio) => sitio.delegacion === delegacion.label
        );
      }
      console.log("filter delegacion: ", filterDelegacion);
      //setSitiosFiltrados(filterDelegacion);
      console.log("filtar por: ", filtrarpor);
      if (filtrarpor != null) {
        if (filtrarpor.value == 5) {
          console.log("otra vez 1: ", menorAMayor(filterDelegacion));
        }
        if (filtrarpor.value == 4) {
          console.log("otra vez 2: ", mayorAMenor(filterDelegacion));
        }
        if (filtrarpor.value == 1) {
          console.log("otra vez 2: ", mejorCalificados(filterDelegacion));
        }
      }
      setSitiosFiltrados(filterDelegacion); //// Este si estaba

      console.log("calificacion es: ", calificacion);
      if (calificacion != null) {
        //setSitiosFiltrados(porCalificacion(calificacion, filterDelegacion));
        porCalificacion(calificacion, filterDelegacion);
        //console.log("aver: ", porCalificacion(calificacion, filterDelegacion));
      }

      filtrarBusqueda(filterDelegacion);
    }

    //setSitiosFiltrados(filterDelegacion);   //// Este tambien mas o menos estaba
    //setSitiosFiltrados(sitiosFiltrados);
  }, [
    delegacion,
    filtrarpor,
    etiquetasHotel,
    sitioClave,
    calificacion,
    buscar,
    sitiosMostrar,
  ]);

  const filtrarBusqueda = (datos) => {
    if (buscar) {
      let filtrados = datos.filter((dato) =>
        dato.nombre_sitio.toUpperCase().includes(buscar.toUpperCase())
      );
      setSitiosFiltrados(filtrados);
    } else {
      setSitiosFiltrados(datos);
    }
  };

  const menorAMayor = async (filterDelegacion) => {
    console.log("caso 1");
    console.log("sitiosFiltrados: ", filterDelegacion);
    setSitiosFiltrados(
      filterDelegacion.sort((p2, p1) =>
        p1.costo_promedio < p2.costo_promedio
          ? 1
          : p1.costo_promedio > p2.costo_promedio
          ? -1
          : 0
      )
    );
  };

  const mayorAMenor = async (filterDelegacion) => {
    console.log("caso 2");
    console.log("sitiosFiltrados: ", filterDelegacion);
    setSitiosFiltrados(
      filterDelegacion.sort((p1, p2) =>
        p1.costo_promedio < p2.costo_promedio
          ? 1
          : p1.costo_promedio > p2.costo_promedio
          ? -1
          : 0
      )
    );
  };

  const mejorCalificados = async (filterDelegacion) => {
    console.log("sitiosFiltrados: ", filterDelegacion);
    setSitiosFiltrados(
      filterDelegacion.sort((p1, p2) =>
        p1.calificacion < p2.calificacion
          ? 1
          : p1.calificacion > p2.calificacion
          ? -1
          : 0
      )
    );
  };

  const porCalificacion = async (calificacion, filterDelegacion) => {
    console.log("apunto de filtrar calificacions: ", filterDelegacion);
    //setSitiosFiltrados([]);
    console.log("antes: ", sitiosFiltrados);
    let sitiosPorCalificacion = [];
    setSitiosFiltrados(
      filterDelegacion.filter((a) => a.calificacion >= calificacion)
    );
    console.log("al final sitiosFiltrados es: ", sitiosFiltrados);
    /*filterDelegacion.map(
      (p1) => (
        console.log(p1.calificacion, ">=", calificacion),
        p1.calificacion >= calificacion && sitiosPorCalificacion.push(p1),
        console.log("el sitio: ", sitiosPorCalificacion)
      )
    );
    console.log("al final es: ", sitiosPorCalificacion);
    setSitiosFiltrados(sitiosPorCalificacion);
    console.log("al final sitiosFiltrados es: ", sitiosFiltrados);
    /*if (sitiosPorCalificacion == []) {
      console.log("se regresa lo primero");
      return [];
    } else {
      console.log("sitiosFiltrados final: ", sitiosFiltrados);
      setSitiosFiltrados('')
    }*/
  };

  const limpiar = async () => {
    setCalificacion(null);
    setSitiosFiltrados(listaSitios);
    setDelegacion({ value: 0, label: "Todas las delegacions" });
    setFiltrarPor({ value: 0, label: "Por defecto" });
  };

  const ListaSitios = () => {
    console.log("hola");
    if (sitiosFiltrados != null || sitiosFiltrados != []) {
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
    }
  };

  // const ModalFiltrado = ({ toggle, isOpen }) => {
  //   return (

  //   );
  // };

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <div
        className="row justify-content-center"
        style={{ marginTop: "15px", marginBottom: "15px", width: "100%" }}
      >
        {/* <ModalFiltrado isOpen={modalFiltro} toggle={toggle} /> */}
        <Modal size="lg" isOpen={modalFiltro} toggle={toggle}>
          <ModalBody>
            <div className="filtro">
              <div className="row">
                Seleccione una Calificacion
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
              </div>
              {sitioClave === 5 && (
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
              )}
              {sitioClave === 6 && (
                <Select
                  id="inputEtiquetas"
                  options={ETIQUETAS_RESTAURANTE}
                  value={etiquetasRest}
                  defaultValue={etiquetasRest}
                  onChange={setEtiquetasRest}
                  placeholder="Seleccione una o mas etiquetas..."
                  noOptionsMessage={() => "Etiqueta no encontrada"}
                  isMulti
                />
              )}
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
              <span
                className="btn primario btn-primary btn-block"
                onClick={(e) => limpiar()}
              >
                Limpiar filtros
              </span>
            </div>
          </ModalBody>
        </Modal>
        <div className="column" style={{ width: "80%" }}>
          <div className="row">
            <div className={`col-${auth.cve_tipo_usuario === 1 ? "9" : "12"}`}>
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
            <div className="col-3">
              {auth.cve_tipo_usuario === 1 && (
                <div className="row d-flex flex-column">
                  <div className="col p-1 mb-1">
                    {sitiosMostrar === "todos" ? (
                      <a
                        onClick={() => getRecomendaciones()}
                        class="codepen-button"
                      >
                        <span className="texto" style={{ width: "100%" }}>
                          {recomendadosLoading ? (
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            <>Mostrar Recomendaciones</>
                          )}
                        </span>
                      </a>
                    ) : (
                      <a
                        onClick={() => setSitiosMostar("todos")}
                        class="codepen-button"
                      >
                        <span className="texto">Mostrar todos</span>
                      </a>
                    )}
                  </div>
                  <div className="col p-1 mb-1">
                    <div
                      // onClick={() => handleActivo(cve)}
                      className={`d-flex justify-content-between align-items-center p-3 tipoSitio`}
                      style={{ height: "50px", width: "100%" }}
                      onClick={() => toggle()}
                    >
                      <p style={{ marginBottom: "0px", fontSize: "14px" }}>
                        Filtro
                      </p>
                      <img
                        alt="filtro"
                        style={{ height: "24px", width: "24px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Input
              onChange={(e) => setBuscar(e.target.value)}
              style={{ width: "100%", marginTop: "10px" }}
              placeholder="Ingresa el nombre de un sitio..."
            />
          </div>
          <br />
        </div>
      </div>
      {isLoading ? (
        <div
          className="sitios d-flex justify-content-center align-items-center"
          style={{ minHeight: "250px", paddingTop: "25px" }}
        >
          {console.log("loading")}
          <Loader />
        </div>
      ) : (
        <div>
          {console.log("no loading")}
          <ListaSitios />
        </div>
      )}
    </Container>
  );
};

export default Inicio;
