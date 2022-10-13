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
    setValue(Checkedvalue);
    dispatch(setModifier({ catagories: Checkedvalue }));
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  const options = [
    { label: "Electronics", value: "electronics" },
    { label: "Laptop", value: "laptop" },
    { label: "SmartPhone", value: "smartphone" },
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
        className="tw-w-80 t-grid tw-grid-cols-2 tw-gap-2"
        onSubmit={submitHandler}
      >
        <div className="tw-gap-2 tw-align-baseline">
          <label>Catagories</label>
          <Checkbox.Group
            value={value}
            options={options}
            onChange={changeHandler}
            className='tw-grid tw-grid-cols-1'
          />
        </div>
        <Button className={"tw-mt-3"} type="primary">
          Apply
        </Button>
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
      placement={"bottomRight"}
      className={
        "tw-col-start-2 tw-row-start-1 md:tw-col-start-auto md:tw-row-start-auto tw-col-span-1 md:tw-col-span-1 "
      }
    >
      <Button type="ghost">Filters</Button>
    </Popover>
  );
};
