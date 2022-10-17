import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "./components/routing/MasterLayout";
import { Cart } from "./components/pages/cart";
import Store from "./components/pages/store";
import OpenRoute from "./components/routing/openrouter";
import { useAppDispatch, useAppSelector } from "./components/redux/hook";
import { setCartReplace, setInitialCart } from "./components/redux/cartSlice";
import axios from "axios";
import { setInitialState } from "./components/redux/userSlice";
import { message } from "antd";

function App() {
  // const UserCart = useAppSelector((state) => state.User.User?.cart);
  const cart = useAppSelector((state) => state.Cart.cart);
  const AuthUser = useAppSelector((state) => state.User.Auth);
  const dispatch = useAppDispatch();
  localStorage.setItem("entry-level",window.location.pathname)
  useEffect(() => {
    let tempStorage = localStorage.getItem("cart");
    console.log(tempStorage);
    
    if (tempStorage) {
       dispatch(setInitialCart(JSON.parse(tempStorage)));
    } else {
       dispatch(setInitialCart([]))
    }
    
    axios
    .get("http://localhost:4000/authstatus")
    .then((res) => {
        console.log(res.data.message);
        console.log(res.data.auth);
        
         dispatch(setInitialState({Auth:res.data.User.Auth,User:res.data.user}))
         message.success(res.data.message)
       
      })
      .catch((err) => {
        console.log(err);
        
        if (err.response.status === 403) {
          localStorage.removeItem("Jwt-token");
        }
      });

    if (AuthUser) {
      axios
        .post("http://localhost:4000/cart", { cart: cart })
        .then((res) => {
          dispatch(setCartReplace(res.data.result));
          localStorage.removeItem("cart");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    localStorage.removeItem("entry-level")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, AuthUser]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/u/*" element={<MasterLayout />} />
          <Route index element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<OpenRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
