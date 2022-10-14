import { Button, Checkbox, Popover } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import React, { FormEvent, useState } from "react";
import { setModifier } from "../redux/headerSlice";
import { useAppDispatch } from "../redux/hook";

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>();
  const dispatch = useAppDispatch();

  const openChangeHandler = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const changeHandler = (Checkedvalue: CheckboxValueType[]) => {
    console.log(Checkedvalue);

    setValue(Checkedvalue);
    dispatch(setModifier({ category: Checkedvalue }));
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  const options = [
    { label: "Electronics", value: "electronics" },
    { label: "Smartphones", value: "smartphones" },
    { label: "Laptops", value: "laptops" },
    { label: "Fragrances", value: "fragrances" },
    { label: "Skincare", value: "skincare" },
    { label: "Groceries", value: "groceries" },
    { label: "Home Decoration", value: "home-decoration" },
    { label: "Furniture", value: "furniture" },
    { label: "Dresses", value: "dress" },
  ];
  const SortContent = () => {
    return (
      <form
        className="tw-w-60 tw-grid tw-grid-cols-1 tw-gap-1"
        onSubmit={submitHandler}
      >
        <div className=" tw-gap-1 tw-align-baseline">
          <label>Categories</label>
          <br />
          <Checkbox.Group
            className="tw-grid tw-grid-cols-1"
            value={value}
            options={options}
            onChange={changeHandler}
            
          />
        </div>
        
      </form>
    );
  };
  return (
    <Popover
      content={<SortContent />}
      title="Filter Products"
      trigger="click"
      open={open}
      onOpenChange={openChangeHandler}
      placement={"rightTop"}
      
    >
      <Button type="ghost">Filters</Button>
    </Popover>
  );
};
