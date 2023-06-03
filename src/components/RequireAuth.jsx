import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RequireAuth = ({children}) => {
    const navigate = useNavigate()
    const auth = useAuth()
    console.log("Auth Require:",auth.auth)
    return auth?.auth?.access_token ? children : <Navigate to={"/"} state={{message:"Debes iniciar sesion primero"}} replace={true}/>
}

export default RequireAuth