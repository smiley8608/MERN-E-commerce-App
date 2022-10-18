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

function App() {
  // const UserCart = useAppSelector((state) => state.User.User?.cart);
  const cart = useAppSelector((state) => state.Cart.cart);
  const dispatch = useAppDispatch();
  const AuthUser = useAppSelector((state) => state.User.Auth);
  localStorage.setItem("entry-level", window.location.pathname);
  useEffect(() => {
    let tempStorage = localStorage.getItem("cart");

    let token = localStorage.getItem("jwt-token");
    if (token) {
      axios.defaults.headers.common["jwt-token"] = token;
    }
    if (tempStorage) {
      dispatch(setInitialCart(JSON.parse(tempStorage as string) || []));
    } else {
      dispatch(setInitialCart([]));
    }

    axios
      .get("/authstatus")
      .then((res) => {
        console.log("apple");
        console.log(res);

        dispatch(setInitialState({ Auth: res.data.auth, User: res.data.user }));
        //  alert(res.data.message)
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 403) {
          localStorage.removeItem("jwt-token");
        }
      });

    if (AuthUser) {
      axios
        .post("http://localhost:4000/cart",{cart:cart})
        .then((res) => {
          dispatch(setCartReplace(res.data.Result));
          localStorage.removeItem("cart");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    localStorage.removeItem("entry-level");
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
