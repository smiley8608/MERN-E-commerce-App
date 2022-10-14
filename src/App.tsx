import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "./components/routing/MasterLayout";
import {Cart} from './components/pages/cart';
import Store from "./components/pages/store";
import OpenRoute from "./components/routing/openrouter";




function App() {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/u/*" element={<MasterLayout />} />
        <Route index element={<Store />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/*" element={<OpenRoute />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
