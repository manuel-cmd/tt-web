import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { SearchBar, SitioCard } from "./components"
import { Container } from 'reactstrap'
import { TipoSitio } from "./components"
import { Loader } from '../../../components'

const TIPO_SITIOS = [{
  nombre: "Museos",
  imagen: require("../../../assets/Sitios/Museo.png"),
  ruta: "",
  cveTipoSitio: ""
}, {
  nombre: "Teatros",
  imagen: require("../../../assets/Sitios/Teatro.png"),
  ruta: "",
  cveTipoSitio: ""
}, {
  nombre: "Monumentos",
  imagen: require("../../../assets/Sitios/Monumento.png"),
  ruta: "",
  cveTipoSitio: ""
}, {
  nombre: "Hoteles",
  imagen: require("../../../assets/Sitios/Hotel.png"),
  ruta: "",
  cveTipoSitio: ""
}, {
  nombre: "Restaurantes",
  imagen: require("../../../assets/Sitios/Restaurante.png"),
  ruta: "",
  cveTipoSitio: ""
}, {
  nombre: "Parques",
  imagen: require("../../../assets/Sitios/Parque.png"),
  ruta: "",
  cveTipoSitio: ""
}]

const Inicio = () => {
  const { auth } = useAuth()
  const [activo, setActivo] = useState("Museos")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [isLoading])

  const handleActivo = (activo) => {
    setIsLoading(true)
    setActivo(activo)
  }

  const ListaSitios = () => {
    return (<>
      <h1>Lista Sitios</h1>
    </>)
  }
  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      <SearchBar />
      <div className='row justify-content-center' style={{ marginTop: "15px" }} >
        {TIPO_SITIOS.map((sitio) => (<TipoSitio nombre={sitio.nombre} icono={sitio.imagen} active={activo} handleActivo={handleActivo} />))}
      </div>
      <div className='sitios d-flex justify-content-center align-items-center' style={{ minHeight: "250px", paddingTop: "25px" }}>
        {isLoading ? <Loader /> : <ListaSitios />}
      </div>

    </Container>
  )
}

export default Inicio