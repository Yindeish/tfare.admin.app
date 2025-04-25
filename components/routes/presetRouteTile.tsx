"use client";

import { Expand } from "@/public/icons/homeSvgs";
import ChevronTop from "./svgs/chevronTop";
import Startoff from "./svgs/startoff";
import { ToggleBtn } from "../drivers/modalComponents";
import CupertinoBtn from "./cupertinoBtn";
import { ICity, useRouteContext } from "@/context.state/route";

const PresetRouteTile = ({city}: {city: ICity}) => {
  const {state: {fetch, inputs, local}, handlers} = useRouteContext();
  const presetRoutes = local.allPresetRoutes.filter((route) => route?.city?._id == city?._id);

  return (
    <div className="w-full flex flex-col gap-2 ">
      {/* City Name and Collapse Btn */}
      <div className="flex justify-between items-center border-[#D7D7D7] border-b-[0.7px]">
        <span className="text-black font-black text-[22px] capitalize">{city?.name}</span>

        <span className="w-[16px] h-[10px]">
          <ChevronTop />
        </span>
      </div>
      {/* City Name and Collapse Btn */}

      {/* Route Items */}
      {presetRoutes?.map((route, index) => (
        <div
          className="grid grid-cols-3 gap-1 justify-between items-center py-1 border-[#D7D7D7] border-b-[0.7px]"
          key={index}
        >
          {/* Startoff */}
          <div className="col-span-1 text-black font-medium text-[14px]">
            {route?.pickupBusstop?.name}
          </div>
          {/* Startoff */}

          {/* Dropoff */}
          <div className="col-span-1 text-black font-medium text-[14px]">
            {route?.dropoffBusstop?.name}
          </div>
          {/* Dropoff */}

          {/* Expand Status */}
          <div className="col-span-1 w-fit justify-self-end flex items-center justify-end gap-7">
            <span className="w-[18px] h-[18px]">
              <Expand className="w-[18px] h-[18px]" />
            </span>

            {/* <ToggleBtn onClick={() => {}} className="sticky top-[unset] left-[unset] " on={true} /> */}
            <CupertinoBtn 
            indicatorProps={{
                className: `border-[1px] border-[27AE65]`,
                onClick: () => {}
            }}
            sliderProps={{
                className: ``
            }}
            on={route?.active}
             />
          </div>
          {/* Expand Status */}
        </div>
      ))}
      {/* Route Items */}
    </div>
  );
};

export default PresetRouteTile;
