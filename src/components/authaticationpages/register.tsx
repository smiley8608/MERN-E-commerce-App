
import { message } from "antd";
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
    conformPassword: "",
    phonenumber: "",
  });
 
  const [mess,setMess]=useState('')
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (data.password === data.conformPassword) {
      console.log('run');
      axios
        .post("http://localhost:4000/register", data)
        .then((res) => {
          console.log(res);
          
          alert(res.data.message)
          localStorage.setItem("jwt-token", res.data.tkn);
          dispatch(setInitialState(res.data.result));

          message.success(res.data.message)
          Navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
    message.error('please Check the password')
    }
  };
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center ">
      <div className="lg:tw-w-3/12 md:tw-w-5/12 sm:tw-w-6/12 tw-bg-slate-100 tw-p-4 tw-rounded-lg tw-mb-3  tw-shadow-xl tw-shadow-black ">
        <div className="tw-text-center">
          <h2>Register</h2>
          <p>Create Your Account</p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="tw-rounded-lg tw-mb-4 tw-gap-2 ">
            <label className="tw-text-lg tw-text-slate-600 tw-font-bold">
              UserName :
            </label>
            <input
              type={"text"}
              placeholder="UserName"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <p className="tw-text-red-500"></p>
          <div className=" tw-rounded-lg tw-mb-4 tw-gap-2">
            <label className="tw-text-lg tw-text-slate-600 tw-font-bold">
              FirstName:
            </label>
            <input
              type={"text"}
              placeholder="FirstName"
              value={data.firstname}
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className=" tw-rounded-lg tw-mb-4">
            <label className="tw-text-lg tw-text-slate-600 tw-font-bold">
              LastName
            </label>
            <input
              type={"text"}
              placeholder="LastName"
              value={data.lastname}
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-rounded-lg tw-mb-4">
            <label className="tw-text-lg tw-text-slate-600 tw-font-bold">
              Email:
            </label>
            <input
              type={"email"}
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-rounded-lg tw-mb-4">
            <label className="tw-text-base tw-font-bold tw-text-slate-600">
              Password :
            </label>
            <input
              type={"password"}
              placeholder="PassWord"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-rounded-lg tw-mb-4">
            <label className="tw-text-base tw-font-bold tw-text-slate-600">
              Conform Password :
            </label>
            <input
              type={"password"}
              placeholder="PassWord"
              value={data.conformPassword}
              onChange={(e) => setData({ ...data, conformPassword: e.target.value })}
              className="tw-w-full tw-bg-slate-300 tw-p-2 tw-rounded-lg"
            />
          </div>
          <div className="tw-rounded-lg tw-mb-4">
            <label className="tw-text-lg tw-text-slate-600 tw-font-bold">
              PhoneNumber
            </label>
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
