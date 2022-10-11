import React, { useState } from "react";

export const ProductList = () => {
  const [product,setProduct]= useState<Product>({title:"",
    catagories:"",
    price:0,
    rating:0,
    image:"",
    imageList:[]})
  return (
    <div className="tw-w-full tw-h-screen tw-gap-3 tw-bg-slate-400 tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 sm:tw-grid-cols-1">
      <div>ruhuipev</div>
     
    </div>
  );
};
