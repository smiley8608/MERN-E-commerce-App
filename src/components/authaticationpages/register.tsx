import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { setInitialState } from "../redux/userSlice";

const Register = () => {
  const [data, setData] = useState<RegisterPropsType>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: 0,
  });
  const dispatch =useAppDispatch()
  const Navigate=useNavigate()
  const submitHandler=(e:FormEvent)=>{
    e.preventDefault()
    axios.post("http://localhost:4000/register",data)
    .then(res=>{
      localStorage.setItem('Jwt-Token',res.data.tkn)
      dispatch(setInitialState(res.data.result))
      alert(res.data.message)
      Navigate('/')
    })
    .catch(err=>{
      console.log(err);
      
    })
  }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center ">
      <div className="tw-w-3/12 tw-bg-slate-100 tw-p-4 tw-rounded-lg tw-mb-3  tw-shadow-xl tw-shadow-black ">
        <div className="tw-text-center">
          <h2>Register</h2>
          <p>Create Your Account</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"text"}
              placeholder="UserName"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"text"}
              placeholder="FirstName"
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"text"}
              placeholder="LastName"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"email"}
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"password"}
              placeholder="PassWord"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
            <input
              type={"tel"}
              placeholder="PhoneNumber"
              value={data.phonenumber}
              onChange={(e) =>
                setData({ ...data, phonenumber: Number(e.target.value) })
              }
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-flex tw-justify-end tw-mx-4">
          <button className="tw-bg-blue-600 tw-p-3 tw-rounded-xl ">
            Register
          </button>

          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
