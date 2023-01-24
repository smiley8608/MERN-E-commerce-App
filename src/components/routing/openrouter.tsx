

import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hook'
// import Error404 from '../authaticationpages/error404'
// import Error500 from '../authaticationpages/error500'
import  {ForgotPassword} from '../authaticationpages/forgotpassword'
import Register from '../authaticationpages/register'
import {Login} from '../authaticationpages/signin'

const OpenRoute = () => {

  const auth = useAppSelector(state => state.User.Auth)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(auth+'sgdvgd');
    
    if (auth) {
      navigate("/")
    }
  }, [navigate, auth])

  return (
   
    <Routes>
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
      {/* <Route path='/register' element={} */}
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      {/* <Route path='/internalservererror' element={<Error500 />} />
      <Route path='/*' element={<Error404 />} /> */}
    </Routes>
  )
}

export default OpenRoute