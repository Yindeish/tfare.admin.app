"use client";

import { Expand } from "@/public/icons/homeSvgs";
import ChevronTop from "./svgs/chevronTop";
import Startoff from "./svgs/startoff";
import { ToggleBtn } from "../drivers/modalComponents";
import CupertinoBtn from "./cupertinoBtn";
import {
  ICity,
  IRouteContextFetchState,
  useRouteContext,
} from "@/context.state/route";
import { VscLoading } from "react-icons/vsc";
import ApiService from "@/api/api.services";
import { toast } from "@/hooks/use-toast";

const PresetRouteTile = ({ city }: { city: ICity }) => {
  const {
    state: { fetch, inputs, local },
    handlers,
  } = useRouteContext();
  const presetRoutes = local.allPresetRoutes.filter(
    (route) => String(route?.city?._id) === String(city?._id)
  );

  const routeUpdateApi = async ({
    loader,
    routeId,
    url,
  }: {
    loader: keyof IRouteContextFetchState;
    routeId: string;
    url: string;
  }) => {
    let resData, resErr;
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.patchWithBearerToken({
      url: `/ride/route/${routeId}/${url}`,
    })
      .then((data) => {
        console.log("data:", data);
        handlers.setFetchState({ key: loader, value: false });

        resData = data;
      })
      .catch((err) => {
        resErr = err;
      });
  };

  const activateRoute = async (routeId: string) => {
    routeUpdateApi({ loader: "activatingRoute", routeId, url: "activate" })
      .then(() => {
        toast({
          title: "Route Activation",
          description: "Route activated successfully",
        });
      })
      .catch((err: any) => {
        toast({
          title: "Route Activation",
          description: err?.message || "Route activation failed",
        });
      });
  };

  const deactivateRoute = async (routeId: string) => {
    routeUpdateApi({ loader: "deactivatingRoute", routeId, url: "deactivate" })
      .then(() => {
        toast({
          title: "Route Deactivation",
          description: "Route deactivated successfully",
        });
      })
      .catch((err: any) => {
        toast({
          title: "Route Deactivation",
          description: err?.message || "Route deactivation failed",
        });
      });
  };

  return (
    <div className="w-full flex flex-col gap-2 ">
      {/* City Name and Collapse Btn */}
      <div className="flex justify-between items-center border-[#D7D7D7] border-b-[0.7px]">
        <span className="text-black font-black text-[22px] capitalize">
          {city?.name}
        </span>

        <span className="w-[16px] h-[10px]">
          <ChevronTop />
        </span>
      </div>
      {/* City Name and Collapse Btn */}

      {/* Route Items */}
      {!fetch.fetchingRoutes &&
        presetRoutes?.map((route, index) => (
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
              <span
                onClick={() =>
                  handlers.setLocalState({ key: "currentRoute", value: route })
                }
                className="w-[18px] h-[18px] cursor-pointer"
              >
                <Expand className="w-[18px] h-[18px]" />
              </span>

              {/* <ToggleBtn onClick={() => {}} className="sticky top-[unset] left-[unset] " on={true} /> */}
              <CupertinoBtn
                indicatorProps={{
                  className: `border-[1px] border-[27AE65]`,
                  onClick: () => route?.active == true ? deactivateRoute(route?._id) : activateRoute(route?._id),
                }}
                sliderProps={{
                  className: ``,
                }}
                on={route?.active}
              />
            </div>
            {/* Expand Status */}
          </div>
        ))}
      {/* Route Items */}

      {/* Loading Spinner */}
      {fetch.fetchingRoutes && (
        <div className="w-full h-[28em] max-h-[28em] flex items-center justify-center">
          <VscLoading className="w-[25px] h-[25px] animate-spin" />
        </div>
      )}
      {/* Loading Spinner */}
    </div>
  );
};

export default PresetRouteTile;
