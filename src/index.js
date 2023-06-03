import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/UsuarioNoRegistrado'
import AuthProvider from './context/AuthProvider'
import { Navbar, RequireAuth } from './components'
import { ROUTES } from './constants/routes'
import { Inicio, Sitios } from './pages/UsuarioRegistrado'
import { Container } from 'reactstrap'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        {/*<Route path="/login" element={<Login />} />*/}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
