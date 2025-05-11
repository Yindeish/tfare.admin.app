import { useRouteContext } from "@/context.state/route";
import { CTABtn } from "./ctaBtn";
import PresetRouteTile from "./presetRouteTile";
import ChevronTop from "./svgs/chevronTop";
import Location from "./svgs/location";
import PlusInCircle from "./svgs/plusInCircle";
import Settings from "./svgs/settings";
import Startoff from "./svgs/startoff";
import { useModal } from "@/context.state/shared/modal";
import NewBusstopModal from "./newBusstopModal";
import { VscLoading } from "react-icons/vsc";

const ViewRouteBusstops = () => {
  const {
    state: {
      local: { currentRoute },
      fetch,
    },
  } = useRouteContext();
  const { showModal, hideModal } = useModal();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between">
        <span className="text-[22px] font-bold text-[#747474]">Bus Stops</span>

        <div className="w-fit flex gap-2">
          <CTABtn
            containerProps={{
              className: `bg-white`,
            }}
            textProps={{
              children: "Select",
              className: ``,
            }}
          />
          <CTABtn
            containerProps={{
              children: (
                <span className="w-[24px] h-[25px]">
                  <PlusInCircle />
                </span>
              ),
              className: `bg-[#EF5DA8] border-[]`,
              onClick: () => showModal(<NewBusstopModal />, false),
            }}
            textProps={{
              children: "New Bus Stop",
              className: `text-white`,
            }}
          />
        </div>
      </div>
      {/* Header */}

      {/* Busstops */}
      <div className="flex-1 bg-white shadow-md flex-col gap-2">
        {fetch.fetchingCities || fetch.fetchingRoutes ? (
          <div className="w-full h-[28em] max-h-[28em] flex items-center justify-center">
            <VscLoading className="w-[25px] h-[25px] animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-1 px-[2em] flex-1 max-h-[28em] overflow-y-scroll">
            <div className="w-full flex flex-col gap-2 ">
              {/* City Name and Collapse Btn, Startoff Dropoff */}
              <div className="border-[#D7D7D7] border-b-[0.7px]">
                <div className="flex justify-between items-center">
                  <span className="text-black font-black text-[22px] capitalize">
                    {currentRoute?.city?.name}
                  </span>

                  {/* <span className="w-[16px] h-[10px]">
                    <ChevronTop />
                  </span> */}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black font-medium text-[18px] capitalize">
                    {currentRoute?.pickupBusstop?.name}
                  </span>

                  <span className="text-black font-medium text-[18px] capitalize">
                    {currentRoute?.dropoffBusstop?.name}
                  </span>
                </div>
                {/* For testing */}
                {currentRoute?._id} 
                {/* For testing */}
              </div>
              {/* City Name and Collapse Btn, Startoff Dropoff */}

              {/* Route Items */}
              {currentRoute?.inTripDropoffs?.map((busstop, index) => (
                <div
                  className="flex justify-between items-center py-1 border-[#D7D7D7] border-b-[0.7px]"
                  key={index}
                >
                  <div className="flex flex-col justify-center gap-1.5 w-fit h-fit">
                    {/* Startoff */}
                    <div className="col-span-1 text-black font-medium text-[14px]">
                      {busstop?.name}
                    </div>
                    {/* Startoff */}

                    {/* Dropoff */}
                    <div className="text-[#747474] font-normal text-[12px]">
                      {`${busstop?.city?.name}, ${busstop?.city?.stateName}`}
                    </div>
                    {/* Dropoff */}
                  </div>

                  <div className="w-fit flex items-center gap-3 ">
                    {/* Startoff */}
                    <div className="text-[#747474] font-normal text-[12px]">
                      see on map
                    </div>
                    {/* Startoff */}

                    <span className="w-[24px] h-[24px]">
                      <Location />
                    </span>
                  </div>
                </div>
              ))}
              {/* Route Items */}
            </div>
          </div>
        )}
      </div>
      {/* Busstops */}
    </div>
  );
};

export default ViewRouteBusstops;
