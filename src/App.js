import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Resenas from "./pages/UsuarioRegistrado/Resenas/Resenas";
import Configuracion from "./pages/UsuarioRegistrado/Configuracion/Configuracion";
import { Navbar, RequireAuth } from "./components";
import { Container } from "reactstrap";
import { Inicio, Historial, Favoritos } from "./pages/UsuarioRegistrado";
import { Login } from "./pages/UsuarioNoRegistrado";
import { SitioID, Sitios, UsuarioID, Usuarios } from "./pages/Administrador";

function App() {
  return (
    <div className="App h-100">
      <Navbar />
      <Container fluid className="" style={{ minHeight: "100%" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path={`/${ROUTES.LOGIN}`} element={<Login />} />
          <Route path={`/${ROUTES.SITIOID}/:id`} element={<SitioID />} />

          <Route
            path="/*"
            element={
              <RequireAuth>
                <Routes>
                  {/* Registrados */}{" "}
                  <Route path={`/${ROUTES.SITIOS}`} element={<Sitios />} />
                  <Route
                    path={`/${ROUTES.HISTORIAL}`}
                    element={<Historial />}
                  />
                  <Route path={`/${ROUTES.USUARIOS}`} element={<Usuarios />} />
                  <Route
                    path={`/${ROUTES.USUARIOID}/:id`}
                    element={<UsuarioID />}
                  />
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
  );
}

export default App;
