import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import {useAuth} from "../../../hooks/useAuth"
import authService from '../../../services/auth.services';
import { ROUTES } from '../../../constants/routes';

const Login = () => {
  const location = useLocation()
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // navigate('/home')
    try {
      const response = await authService.login(
        correo,
        contrasena
      )
      const { access_token, foto, tipo_usuario, usuario } = response
      //const rol = response?.user?.rol
      setAuth({ access_token, foto, tipo_usuario, usuario })
      navigate(`/${ROUTES.INICIO}`)
    } catch (err) {
      // toast.error(err)

      setCorreo("")
      setContrasena("")
      toast.error(err.response.data.error)
    }
  }

  useEffect(()=>{
    if(location.state){
      toast.error(location.state.message)
    }
  },[])
  return (
    <div>
      <Toaster/>
      <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7">
            <h3>Login <strong>Sistema de Recomendacion</strong></h3>
            <form>
              <div class="form-group first">
                <label for="username">Usuario</label>
                <input value={correo} onChange={e=>setCorreo(e.target.value)} type="text" class="form-control" placeholder="your-email@gmail.com" id="username"/>
              </div>
              <div class="form-group last mb-3">
                <label for="password">Contraseña</label>
                <input value={contrasena} onChange={e=>setContrasena(e.target.value)} type="password" class="form-control" placeholder="Your Password" id="password"/>
              </div>
              
              <div class="d-flex mb-5 align-items-center">
                <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label> 
              </div>

              <input type="submit" onClick={(e)=>handleSubmit(e)} value="Log In" class="btn btn-block btn-primary"/>

            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
  </div>
  )
}

export default Login