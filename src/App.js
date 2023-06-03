import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/UsuarioNoRegistrado";
import { Inicio, Sitios } from "./pages/UsuarioRegistrado";
import { ROUTES } from "./constants/routes";
import { Navbar } from "./components";
import { Container } from "reactstrap";
import Favoritos from "./pages/UsuarioRegistrado/Favoritos/Favoritos";
import Resenas from "./pages/UsuarioRegistrado/Resenas/Resenas";
import Configuracion from "./pages/UsuarioRegistrado/Configuracion/Configuracion";

function App() {
  return (
    <div className="App h-100">
      <Navbar />
      <Container fluid className="" style={{ minHeight: "100%" }}>
        <Routes>
          {/* Registrados */}
          <Route path={`/${ROUTES.FAVORITOS}`} element={<Favoritos />} />
          <Route path={`/${ROUTES.RESENAS}`} element={<Resenas />} />
          <Route
            path={`/${ROUTES.CONFIFURACION}`}
            element={<Configuracion />}
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
