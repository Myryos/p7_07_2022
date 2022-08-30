import React, { useEffect } from 'react'
import authService from '../../services/auth.service'
import jwt from 'jwt-decode'
import useAuth from '../../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

export const RequiredAuth = ( { children } ) => {
  const location = useLocation()
  const { auth, setAuth } = useAuth()
  let isExp = false
  let decodedToken = {}
  if(Object.keys(auth).length > 0)
    decodedToken = jwt(auth.accessToken)
  useEffect(() => {
    if(isExp)
    {
      setAuth({})
    }
  }, [isExp, setAuth])

  setInterval(() => {
    if(decodedToken.exp * 1000 < Date.now())
    {
      authService.logout()
      isExp = true
      window.location.reload()
    }
  }, 1000 * 10)
 
  if( Object.keys(auth).length === 0 ){
    return <Navigate to='/login' state={{path: location.pathname}}/>
  }
  return children
}

