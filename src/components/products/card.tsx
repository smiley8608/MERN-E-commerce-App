import React from "react";
import { Star } from '@mui/icons-material'
import { Rating } from '@mui/material'
import { Button, Statistic } from 'antd'

interface propductprops {
    product:Product
}

export const Card = ({product}:propductprops):JSX.Element => {

    return(
        <div className='tw-rounded-sm md:tw-rounded-md tw-flex tw-flex-col tw-shadow-xl tw-bg-white tw-shadow-gray-300 tw-cursor-pointer' >
        <div className='tw-w-full tw-bg-center tw-bg-contain tw-bg-no-repeat   tw-rounded-t-sm md:tw-rounded-t-md' style={{height: "300px", backgroundImage: `url(${product.thumbnail})`}}></div>
        <div className='tw-p-3 tw-bg-white tw-rounded-b-sm md:tw-rounded-b-md'>
            <p className='tw-mb-0 tw-text-xl tw-font-semibold tw-text-gray-700 tw-h-14 tw-overflow-hidden'>{product.title}</p>
            <p className='tw-mb-0 tw-my-1.5 tw-text-gray-500 tw-h-10 tw-overflow-hidden tw-relative'>{product.description}<span className='tw-w-14 tw-h-4 tw-absolute tw-bottom-0 tw-right-0 tw-bg-gradient-to-r tw-from-transparent tw-to-white'/></p>
            <div className='tw-mb-0 tw-my-1 tw-text-xl tw-text-gray-700 tw-flex tw-items-center'>Price: <span className='tw-text-xl tw-font-semibold tw-text-pink-600 tw-flex tw-items-center'>$<Statistic value={product.price}/></span></div>
            <Rating readOnly emptyIcon={<Star />} value={product.rating} precision={0.5} />
            <br/>
            <Button type='primary' className='tw-w-full'>Add to Cart</Button>
        </div>
    </div>
    )
};
