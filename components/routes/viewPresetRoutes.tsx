"use client";

import { ICity, IRouteContextFetchState, useRouteContext } from "@/context.state/route";
import { CTABtn } from "./ctaBtn";
import PresetRouteTile from "./presetRouteTile";
import PlusInCircle from "./svgs/plusInCircle";
import Settings from "./svgs/settings";
import Startoff from "./svgs/startoff";
import { useEffect } from "react";
import ApiService from "@/api/api.services";

const ViewPresetRoutes = () => {

  const {state: {local},handlers} = useRouteContext();

  const getAllCities = async ({
    loader
  }: {
    loader: keyof IRouteContextFetchState;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: `/user/ride/cities/all` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const allCities = (data?.allCities as ICity[])
        handlers.setLocalState({key: 'allCities', value: allCities});
        handlers.setLocalState({key: 'currentRoute', value: local.allPresetRoutes[0]});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if(local.allCities?.length == 0) 
      getAllCities({loader: 'fetchingCities' });
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between">
        <span className="text-[22px] font-bold text-[#747474]">
          Preset Routes
        </span>

        <div className="w-fit flex gap-2">
          <CTABtn
            containerProps={{
              children: (
                <span className="w-[18px] h-[16px]">
                  <Settings />
                </span>
              ),
              className: `bg-white`
            }}
            textProps={{
              children: "Sort",
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
              className: `bg-[#5D5FEF] border-[]`,
              onClick: () => {
                handlers.setLocalState({key: 'routeCreationStage', value: 'initial'})
              }
            }}
            textProps={{
              children: "Create New",
              className: `text-white`,
            }}
          />
        </div>
      </div>
      {/* Header */}

      {/* Table */}
      <div className="flex-1 bg-white shadow-md flex-col gap-2">
        {/* Header */}
        <div className="grid grid-cols-3 gap-1 justify-between items-center h-[60px] px-[2em] border-[#D7D7D7] border-b-[1px]">
          <span className="w-fit flex items-center gap-1">
            <span className="w-[14px] h-[20px]">
              <Startoff />
            </span>
            <span className="text-black font-medium text-[14px]">Startoff</span>
          </span>

          <span className="w-fit flex items-center gap-1">
            <span className="w-[14px] h-[20px]">
              <Startoff />
            </span>
            <span className="text-black font-medium text-[14px]">Startoff</span>
          </span>

          <span className="text-black font-medium text-[14px] text-right">Status</span>
        </div>
        {/* Header */}

        {/* Body */}
        <div className="flex flex-col gap-1 px-[2em] flex-1 max-h-[28em] overflow-y-scroll">
            {/* Routes in cities -- fetching by cities (Groupong them by cities) */}
          {local.allCities?.map((city, index) => (
            <PresetRouteTile city={city} key={index} />
          ))}{/* Routes in cities -- fetching by cities (Groupong them by cities) */}
        </div>
        {/* Body */}
      </div>
      {/* Table */}
    </div>
  );
};

export default ViewPresetRoutes;
