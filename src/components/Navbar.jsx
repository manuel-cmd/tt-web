import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import ModalLogin from "./ModalLogin";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/auth.services";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [current, setCurrent] = useState(ROUTES.INICIO);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const { auth } = useAuth();

  console.log(auth);
  const toggle = () => setModal(!modal);

  const handleLogout = () => {
    authService.logout();
    window.location.reload(false);
  };

  return (
    <>
      <ModalLogin isOpen={modal} toggle={toggle} />
      <div class="menu">
        <label class="checkbtn">TSULI</label>
        <div class="opciones">
          <ul>
            <Link
              to={`/`}
              style={{ textDecoration: "none" }}
              onClick={() => setCurrent(ROUTES.INICIO)}
            >
              <li>
                <a class={`${current === ROUTES.INICIO ? "active" : ""}`}>
                  Inicio
                </a>
              </li>
            </Link>

            {auth?.cve_tipo_usuario ? (
              <>
                {auth.cve_tipo_usuario === 2 ? (
                  <>
                    <Link
                      to={`/${ROUTES.SITIOS}`}
                      state={""}
                      style={{ textDecoration: "none" }}
                      onClick={() => setCurrent(ROUTES.SITIOS)}
                    >
                      <li>
                        <a
                          class={`${current === ROUTES.SITIOS ? "active" : ""}`}
                        >
                          Sitios
                        </a>
                      </li>
                    </Link>
                    <Link
                      to={`/${ROUTES.USUARIOS}`}
                      state={""}
                      style={{ textDecoration: "none" }}
                      onClick={() => setCurrent(ROUTES.USUARIOS)}
                    >
                      <li>
                        <a
                          class={`${
                            current === ROUTES.USUARIOS ? "active" : ""
                          }`}
                        >
                          Usuarios
                        </a>
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/${ROUTES.HISTORIAL}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => setCurrent(ROUTES.HISTORIAL)}
                    >
                      <li>
                        <a
                          class={`${
                            current === ROUTES.HISTORIAL ? "active" : ""
                          }`}
                        >
                          Historial
                        </a>
                      </li>
                    </Link>
                    <Link
                      to={`/${ROUTES.FAVORITOS}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => setCurrent(ROUTES.FAVORITOS)}
                    >
                      <li>
                        <a
                          class={`${
                            current === ROUTES.FAVORITOS ? "active" : ""
                          }`}
                        >
                          Favoritos
                        </a>
                      </li>
                    </Link>
                    <Link
                      to={`/${ROUTES.RESENAS}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => setCurrent(ROUTES.RESENAS)}
                    >
                      <li>
                        <a
                          class={`${
                            current === ROUTES.RESENAS ? "active" : ""
                          }`}
                        >
                          Reseñas
                        </a>
                      </li>
                    </Link>
                  </>
                )}

                <li>
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggleDropdown}
                    direction={"down"}
                  >
                    <DropdownToggle
                      style={{ backgroundColor: "white", borderColor: "white" }}
                    >
                      <img
                        src={auth.link_imagen}
                        width="30"
                        height="30"
                        class="rounded-circle"
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => navigate(`/${ROUTES.CONFIFURACION}`)}
                      >
                        Configuracion
                      </DropdownItem>
                      <DropdownItem onClick={() => handleLogout()}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => toggle()}>
                  <a class="active">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
