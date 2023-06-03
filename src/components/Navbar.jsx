import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import ModalLogin from './ModalLogin'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const [modal, setModal] = useState(false)
  const { auth } = useAuth()

  const toggle = () => setModal(!modal)

  return (
    <>
      <ModalLogin isOpen={modal} toggle={toggle} />
      <div class='menu'>
        <label class='checkbtn'>TSULI</label>
        <div class='opciones'>
          <ul>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <li>
                <a class='active'>Inicio</a>
              </li>
            </Link>
            <Link
              to={`/${ROUTES.SITIOS}`}
              state={''}
              style={{ textDecoration: 'none' }}
            >
              <li>
                <a class='active'>Sitios</a>
              </li>
            </Link>
            {auth?.access_token && (
              <>
                <Link
                  to={`/${ROUTES.FAVORITOS}`}
                  style={{ textDecoration: 'none' }}
                >
                  <li>
                    <a class='active'>Favoritos</a>
                  </li>
                </Link>
                <Link
                  to={`/${ROUTES.RESENAS}`}
                  style={{ textDecoration: 'none' }}
                >
                  <li>
                    <a class='active'>Reseñas</a>
                  </li>
                </Link>
                <Link
                  to={`/${ROUTES.CONFIFURACION}`}
                  style={{ textDecoration: 'none' }}
                >
                  <li>
                    <a class='active'>Configuración</a>
                  </li>
                </Link>
              </>
            )}

            <li onClick={() => toggle()}>
              <a class='active'>Login</a>
            </li>
            <li>
              <button onClick={''} className='cerrarSesion'>
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
