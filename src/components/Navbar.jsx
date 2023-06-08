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
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <li>
                <a class="active">Inicio</a>
              </li>
            </Link>

            {auth?.access_token ? (
              <>
                {auth.tipo_usuario === "Administrador" ? (
                  <>
                    <Link
                      to={`/${ROUTES.SITIOS}`}
                      state={""}
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <a class="active">Sitios</a>
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/${ROUTES.FAVORITOS}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <a class="active">Favoritos</a>
                      </li>
                    </Link>
                    <Link
                      to={`/${ROUTES.RESENAS}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li>
                        <a class="active">Reseñas</a>
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
