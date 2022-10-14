import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export const SignOut = () => {
  return <div className="tw-w-full tw-grid tw-justify-center">
    <Spin indicator={<LoadingOutlined style={{fontSize:40}}spin/>} />
    SignOut
  </div>;
};
