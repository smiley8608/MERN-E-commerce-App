

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Orders} from '../pages/order'
import {Profile} from '../pages/profile'
import Error404 from '../authaticationpages/error404'
import Error500 from '../authaticationpages/error500'
import { CContainer, CSpinner } from '@coreui/react'
import {SignOut} from '../pages/signout'
import { useAppSelector } from '../redux/hook'


const MainRoute = () => {
  const auth = useAppSelector(state => state.User.Auth)
  return (
    <>
      {auth ? <CContainer lg>
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signout' element={<SignOut />} />
            <Route path='/internalservererror' element={<Error500 />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </Suspense>
      </CContainer> : <Navigate to={"/signin"} />}
    </>
  )
}


export default React.memo(MainRoute)