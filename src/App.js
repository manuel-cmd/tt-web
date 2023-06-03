import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'

import Favoritos from './pages/UsuarioRegistrado/Favoritos/Favoritos'
import Resenas from './pages/UsuarioRegistrado/Resenas/Resenas'
import Configuracion from './pages/UsuarioRegistrado/Configuracion/Configuracion'
import { Navbar, RequireAuth } from './components'
import { Container } from 'reactstrap'
import { Inicio, Sitios } from './pages/UsuarioRegistrado'
import { Login } from './pages/UsuarioNoRegistrado'

function App() {
  return (
    <div className='App h-100'>
      <Navbar />
      <Container fluid className='' style={{ minHeight: '100%' }}>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path={`/${ROUTES.LOGIN}`} element={<Login />} />
          <Route path={`/${ROUTES.SITIOS}`} element={<Sitios />} />
          <Route
            path='/*'
            element={
              <RequireAuth>
                <Routes>
                  {/* Registrados */}
                  <Route
                    path={`/${ROUTES.FAVORITOS}`}
                    element={<Favoritos />}
                  />
                  <Route path={`/${ROUTES.RESENAS}`} element={<Resenas />} />
                  <Route
                    path={`/${ROUTES.CONFIFURACION}`}
                    element={<Configuracion />}
                  />
                </Routes>
              </RequireAuth>
            }
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
