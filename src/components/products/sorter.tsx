import { Button, Popover, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { setModifier } from "../redux/headerSlice";
import { useAppDispatch } from "../redux/hook";

export const Sorter = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [priceRadios, setPriceRadios] = useState<string | null>("relevance");
  const [rangeValue, setValue] = useState<[number, number]>([0, 5000]);

  const hide = () => {
    setOpen(false);
  };
  const openChangeHandler = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    dispatch(
      setModifier({
        rangestart: rangeValue[0],
        rangeend: rangeValue[1],
        sortby: priceRadios,
      })
    );
  }, [rangeValue, priceRadios, dispatch]);
  const SorterContent = () => {
    return (
      <form className=" tw-col-span-1 md:tw-col-span-1 tw-w-60 tw-grid tw-grid-cols-1    tw-gap-1">
        <div className="tw-align-baseline">
          <input
            checked={"relevance" === priceRadios}
            type={"radio"}
            name={"relevance"}
            id={"relevance"}
            onChange={() => setPriceRadios("relevance")}
            onClick={() => setPriceRadios("relevance")}
          />
          <label htmlFor="relevance" onClick={hide}>
            relevance
          </label>
          <br />
          <input
            checked={"lth" === priceRadios}
            type={"radio"}
            name={"lth"}
            id={"lth"}
            onChange={() => setPriceRadios("lth")}
            onClick={() => setPriceRadios("lth")}
          />
          <label htmlFor="lth" onClick={hide}>
            Lower To Higher
          </label>{" "}
          <br />
          <input
            checked={"htl" === priceRadios}
            type={"radio"}
            name={"htl"}
            id={"htl"}
            onChange={() => setPriceRadios("htl")}
            onClick={() => setPriceRadios("htl")}
          />
          <label htmlFor="htl" onClick={hide}>
            Higher to Lower
          </label>
          <Slider
            dots={true}
            step={100}
            min={0}
            max={5000}
            range
            defaultValue={rangeValue}
            onAfterChange={(e) => {
              setValue(e);
            }}
          />
        </div>
      </form>
    );
  };
  return (
    <Popover
      title="Sort Products"
      content={<SorterContent />}
      trigger="click"
      open={open}
      onOpenChange={openChangeHandler}
      placement={"leftTop"}
    >
      <Button type={"ghost"}>Sort</Button>
    </Popover>
  );
};
