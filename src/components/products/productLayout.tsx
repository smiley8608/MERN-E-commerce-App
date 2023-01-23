
import axios from "axios";
import React, { useEffect } from "react";
import { Card } from "./card";
import { Filter } from "./Filter";
import { Search } from './search';
import { Sorter } from "./sorter";


import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setInitialProduct } from "../redux/productSlice";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const Modifier= useAppSelector(state=>state.Slidbar.modifer)
  useEffect(() => {
    axios
    .post(`http://localhost:4000/allProduct?rangestart=${Modifier.rangestart}&rangeend=${Modifier.rangeend}&sortby=${Modifier.sortby}&search=${Modifier.search}`,{catagories:Modifier.category})
      .then((allproducts) => {
        console.log('allproducts',allproducts.data.products);
        dispatch(setInitialProduct(allproducts.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  },[Modifier,dispatch]);
  const products = useAppSelector((state) => state.Product.products);
 console.log('products',products);
 
  
  return (
    <div className="tw-w-full  ">
      <div className="tw-w-full tw-grid tw-grid-cols-2  md:tw-grid-cols-4 lg:tw-flex  tw-justify-between tw-gap-6 tw-p-3">
        <Sorter />
        <Search />
        <Filter />
      </div>
      <div className='tw-w-full tw-gap-5 tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 sm:tw-grid-cols-1'>
        {(products?.length as number) > 0 ? (
         <>
            {products?.map((product) => {
              return <Card key={product._id} product={product} />;
            })}
          </>
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};
