import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import authService from '../services/auth.services'

const ModalLogin = ({ isOpen, toggle }) => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // navigate('/home')
    try {
      const response = await authService.login(correo, contrasena)
      const { access_token, foto, tipo_usuario, usuario } = response
      //const rol = response?.user?.rol
      setAuth({ access_token, foto, tipo_usuario, usuario })
    } catch (err) {
      // toast.error(err)

      setCorreo('')
      setContrasena('')
      toast.error(err.response.data.error)
    }
  }

  // useEffect(() => {
  //   if (location.state) {
  //     toast.error(location.state.message)
  //   }
  // }, [])
  return (
    <>
      <Toaster />

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Iniciar sesion</ModalHeader>
        <ModalBody>
          <div class='form-group first'>
            <label for='username'>Usuario</label>
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type='text'
              class='form-control'
              placeholder='your-email@gmail.com'
              id='username'
            />
          </div>
          <div class='form-group last mb-3'>
            <label for='password'>Contraseña</label>
            <input
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              type='password'
              class='form-control'
              placeholder='Your Password'
              id='password'
            />
          </div>
          <div class='mb-4'>
            <hr data-content='O' class='hr-text' />
          </div>
          <input
            type='button'
            onClick={(e) => handleSubmit(e)}
            value='Registrate'
            class='btn secundario btn-block'
          />

          {/* <div class='d-flex mb-5 align-items-center'>
              <label class='control control--checkbox mb-0'>
                <span class='caption'>Remember me</span>
                <input type='checkbox' checked='checked' />
                <div class='control__indicator'></div>
              </label>
            </div> */}
        </ModalBody>
        <ModalFooter>
          <input
            type='submit'
            onClick={(e) => handleSubmit(e)}
            value='Continuar'
            class='btn primario btn-block'
          />
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ModalLogin
