import { IBusStop, useRouteContext } from "@/context.state/route";
import Checkbox from "./checkbox";
import Location from "./svgs/location";
import { useEffect } from "react";

const SelectDropoffTile = ({
  dropoff,
}: {
  dropoff: IBusStop & {
    number: number;
  };
}) => {
  const {
    state: {
      local: { allBusstops },
      inputs: { selectedBusstops },
    },
    handlers,
  } = useRouteContext();

  const busstopPresent = selectedBusstops.find(
    (item) => item?.number == dropoff?.number
  );

  return (
    <div
      className={`w-full h-fit py-2 flex justify-between items-center ${
        dropoff.number == 8
          ? "border-y-[1px] border-y-[#D7D7D7]"
          : "border-t-[1px] border-t-[#D7D7D7]"
      }`}
    >
      <div className="w-fit flex gap-3">
        <Checkbox
          condition={busstopPresent ? true : false}
          props={{
            onClick: () => {
              if (busstopPresent) {
                const updatedDropoffs = selectedBusstops.filter(
                  (item) => item?.number != dropoff?.number
                );
                handlers.setInputState({
                  key: "selectedBusstops",
                  value: updatedDropoffs,
                });
              }

              else handlers.setInputState({
                key: "selectedBusstops",
                value: [...selectedBusstops, dropoff],
              });
            },
          }}
        />

        <div className="w-fit h-fit flex flex-col">
          <span className="text-[14px] font-medium text-black">
            {dropoff?.name}
          </span>

          <span className="text-[12px] font-medium text-[#747474]">
            {dropoff?.name}
          </span>
        </div>
      </div>

      <div className="w-fit flex gap-3 justify-end">
        <span className="text-[12px] font-medium text-[#747474]">
          See on map
        </span>

        <span className="w-[20px] h-[20px]">
          <Location />
        </span>
      </div>
    </div>
  );
};

export default SelectDropoffTile;
