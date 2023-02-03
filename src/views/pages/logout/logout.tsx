import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setInitialState } from 'src/views/redux/Adminslice'

const LogOut = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(setInitialState({ Admin: null, Auth: false }))
      localStorage.removeItem('admin-token')
    }, 1500)
    navigate('/')
  })
  return <div>LogOut</div>
}

export default LogOut
