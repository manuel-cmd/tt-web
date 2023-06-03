import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/UsuarioNoRegistrado";
import AuthProvider from "./context/AuthProvider";
import { RequireAuth } from "./components";
import { ROUTES } from "./constants/routes";
import { Inicio, Sitios } from "./pages/UsuarioRegistrado";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={`/${ROUTES.INICIO}`} element={<Inicio />} />
          <Route path={`/${ROUTES.SITIOS}`} element={<Sitios />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <App />
              </RequireAuth>
            }
          />
        </Routes>
        {/*<Route path="/login" element={<Login />} />*/}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
