import { useState } from "react";
import { Star } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { Button, Statistic } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../Cart/card";
import { setReplaceCart } from "../redux/userSlice";
import { setCartReplace } from "../redux/cartSlice";
import { Link } from "react-router-dom";

interface propductprops {
  product: Product;
}

export const Card = ({ product }: propductprops): JSX.Element => {
  const auth = useAppSelector((state) => state.User.Auth);
  const cart = useAppSelector((state) => state.User.User?.cart);
  const [Loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [disabler, setDisabler] = useState(false);

  return (
    <div className="tw-rounded-sm md:tw-rounded-md tw-flex tw-flex-col tw-shadow-xl tw-bg-white tw-shadow-gray-300 tw-cursor-pointer">
      <div
        className="tw-w-full tw-bg-center tw-bg-contain tw-bg-no-repeat   tw-rounded-t-sm md:tw-rounded-t-md"
        style={{
          height: "300px",
          backgroundImage: `url(${product.thumbnail})`,
        }}
      ></div>
      <div className="tw-p-3 tw-bg-white tw-rounded-b-sm md:tw-rounded-b-md">
        <p className="tw-mb-0 tw-text-xl tw-font-semibold tw-text-gray-700 tw-h-14 tw-overflow-hidden">
          {product.title}
        </p>
        <p className="tw-mb-0 tw-my-1.5 tw-text-gray-500 tw-h-10 tw-overflow-hidden tw-relative">
          {product.description}
          <span className="tw-w-14 tw-h-4 tw-absolute tw-bottom-0 tw-right-0 tw-bg-gradient-to-r tw-from-transparent tw-to-white" />
        </p>
        <div className="tw-mb-0 tw-my-1 tw-text-xl tw-text-gray-700 tw-flex tw-items-center">
          Price:{" "}
          <span className="tw-text-sm tw-font-semibold tw-text-pink-600 tw-flex tw-gap-1 tw-items-center">
            <Statistic value={product.price} /> Tkn
          </span>
        </div>
        <Rating
          readOnly
          emptyIcon={<Star />}
          value={product.rating}
          precision={0.5}
        />
        <br />
        <Button
          type="primary"
          icon={disabler ? <LoadingOutlined spin={true} /> : ""}
          className="tw-w-full"
          disabled={disabler ? true : false}
          onClick={async () => {
            setDisabler(true);
            setLoading(false)
            alert('Added to cart')
            setTimeout(() => {
              setDisabler(false);
            }, 1000);
            console.log("runn");
            let resultCart = await addToCart(product, auth, cart as CartItem[]);
            console.log(resultCart);
            dispatch(setCartReplace(resultCart as unknown as CartItem[]));
            auth
              ? dispatch(setReplaceCart([]))
              : dispatch(setReplaceCart(resultCart as unknown as CartItem[]));
          }}
        >
          {Loading ? (
            <>Add to Cart</>
          ) : (
            <Link to={"/cart"}>view to Cart</Link>
          )}
        </Button>
      </div>
    </div>
  );
};
