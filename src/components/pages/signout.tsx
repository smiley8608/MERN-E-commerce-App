import { LoadingOutlined } from "@ant-design/icons";
import { message, Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { setInitialState } from "../redux/userSlice";

export const SignOut = () => {

  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    
    setTimeout(()=>{
      message.success('signout successfully')
      dispatch(setInitialState({User:null,Auth:false}))
      localStorage.removeItem('jwt-token')
      localStorage.removeItem('cart') 
      window.location.pathname='/'     
    },1500)
  },[dispatch,navigate])

  return <div className="tw-w-full tw-grid tw-justify-center">
    <Spin indicator={<LoadingOutlined style={{fontSize:40}}spin/>} />
    
  </div>;
};
