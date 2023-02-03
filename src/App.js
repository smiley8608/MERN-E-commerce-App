import { lightGreen } from '@mui/material/colors'
import { message } from 'antd'
import axios from 'axios'
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
// import { LogOut } from './views/pages/logout/logout'
// import LogOut from './views/pages/logout/logout'
import EditProducts from './views/products/edit'
import { setInitialState } from './views/redux/Adminslice'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const LogOut = React.lazy(() => import('./views/pages/logout/logout'))

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    console.log(token)
    if (token) {
      axios.defaults.headers.common['admin-token'] = token
    }
    axios
      .get('http://localhost:4000/admin/authStatus')
      .then((result) => {
        console.log('runs')
        message.success(result.data.message)
        dispatch(setInitialState({ Admin: result.data.Admin, Auth: result.data.Auth }))
      })
      .catch((error) => {
        console.log(error)
      })
  })
  const AuthUser = useSelector((state) => state.Admin.Auth)
  console.log(AuthUser)

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {AuthUser ? (
            <>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </>
          ) : (
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
            </>
          )}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
