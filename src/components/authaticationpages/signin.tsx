import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/hook";
import {  setInitialState } from "../redux/userSlice";
import { message } from "antd";
export const Login = () => {
  const [data, setData] = useState<LoginPropsType>({ email: "", password: "" });
  const Navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        console.log(res);
        
        if (res.data.auth) {
          message.info(res.data.message);
        } else {
          message.error(res.data.message);
        }
        setTimeout(() => {
          localStorage.setItem("jwt-token", res.data.tkn);
          dispatch(setInitialState({User:res.data.result,Auth:res.data.auth}));
          
      
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-400 tw-flex tw-justify-center tw-items-center tw-shadow-xl tw-shadow-black ">
      <div className="lg:tw-w-2/5 md:tw-w-3/5 tw-bg-slate-50 tw-grid sm:tw-grid-cols-1 md:tw-grid-cols-2   tw-rounded-xl">
        <div className="tw-shadow-xl tw-shadow-black tw-p-4 ">
          <h1>LOGIN </h1>
          <p>Sign In to your account </p>
          <form onSubmit={submitHandler}>
            <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
              <input
                type={"email"}
                placeholder="Email"
                className="tw-w-full tw-bg-slate-300 tw-p-3 tw-rounded-lg"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </div>
            <div className="tw-bg-slate-300 tw-rounded-lg tw-mb-4">
              <input
                type={"password"}
                placeholder="password"
                className="tw-w-full tw-bg-slate-300 tw-p-3 tw-rounded-lg"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="tw-flex tw-justify-between tw-p-3">
              <button className="tw-bg-blue-600 tw-p-2 tw-rounded-lg">
                LogIn
              </button>
              <a href="/#">Forget password ?</a>
            </div>
          </form>
        </div>
        <div className="tw-bg-blue-800 tw-text-center tw-text-white tw-rounded-r-xl tw-shadow-xl tw-shadow-black">
          <div className="tw-my-8 tw-mx-3">
            <h1>SIGN IN</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Blanditiis maxime praesentium molestiae, similique animi
              reprehenderit illum provident nemo quae expedita iusto magni
              perspiciatis voluptate ratione tempora consequatur. Assumenda, ut
              eveniet
            </p>
            <a
              className="tw-rounded-xl tw-no-underline  tw-bg-white tw-p-3 tw-mt-3"
              href="/#"
            >
              Register!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
