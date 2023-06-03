import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const Navbar = () => {
  return (
    <>
         <div class="menu">
      <label class="checkbtn">Logo</label>
      <div class="opciones">
        <ul>
          <Link
            to={`/${ROUTES.INICIO}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="active">Inicio</a>
            </li>
          </Link>
          <Link
            to={`/${ROUTES.SITIOS}`}
            state={""}
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="active">Sitios</a>
            </li>
          </Link>
          <Link
            to={`/usuario`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="active">Favoritos</a>
            </li>
          </Link>
          <Link
            to={`/usuario`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="active">Reseñas</a>
            </li>
          </Link>
          <Link
            to={`/usuario`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <a class="active">Configuración</a>
            </li>
          </Link>
          <li>
            <button onClick={""} className="cerrarSesion">
              Cerrar Sesion
            </button>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar