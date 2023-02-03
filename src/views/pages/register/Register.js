import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setInitialState } from 'src/views/redux/Adminslice'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '', conformPassword: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submithandler = (e) => {
    e.preventDefault()
    if (
      data.username === '' ||
      data.email === '' ||
      data.password === '' ||
      data.conformPassword === ''
    ) {
      return alert('please enter the input fields')
    } else {
      console.log(data)
      axios
        .post('http://localhost:4000/admin/register', data)
        .then((response) => {
          localStorage.setItem('admin-token', response.data.tkn)
          dispatch(setInitialState({ Admin: response.data.Admin, Auth: response.data.Auth }))
          message.success(response.data.message)
          navigate('/product')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={data.username}
                      onChange={(e) => {
                        setData({ ...data, username: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={data.password}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Conform password"
                      autoComplete="new-password"
                      value={data.conformPassword}
                      onChange={(e) => {
                        setData({ ...data, conformPassword: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit" onClick={submithandler}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
