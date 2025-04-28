"use client";
import Modal from "@/components/shared/modal";
import SubHeader from "@/components/shared/sub_header";
import {
  GridViewCTA,
  RowViewCTA,
  SortCTA,
} from "@/components/shared/sub_header_components";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useEffect, useState } from "react";
import {
  RideGridView,
  ByOrderRowView,
  ByUserRowView,
} from "@/components/rides/pageComponents";
import { ICurrentRide, IRide, IRideContextFetchState, useRideContext } from "@/context.state/ride";
import ApiService from "@/api/api.services";
import { IUser } from "@/context.state/auth";
import { IRoute } from "@/context.state/route";

function Page() {
  const { state: layoutState, updateState } = useLayoutContext();
  const { state: {inputs}, handlers } = useRideContext();

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

  const getRides = async ({
    loader, method, status
  }: {
    loader: keyof IRideContextFetchState;
    status: 'ongoing' | 'completed';
    method: 'order' | 'user';
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: `/user/ride/rides/all?method=${method}&status=${status}` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const rides = (data?.allRides as (ICurrentRide & {route: IRoute, driver: IUser})[])
        handlers.setLocalState({key: 'allRides', value: rides});
        handlers.setLocalState({key: 'ridesDisplayList', value: rides});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // if(local.allRides?.length == 0) 
      getRides({loader: 'fetchingRides', method: inputs.method, status: inputs.status});
  }, [inputs.method, inputs.status])

  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={
          <div className="w-fit h-full flex gap-[36px]">
            {[
              { name: "ongoing", label: "Ongoing" },
              { name: "completed", label: "Completed" },
            ].map(({ label, name }, index) => (
              <div
                onClick={() => handlers.setInputState({key: 'status', value: name})}
                className={`w-fit h-full border-b-[4px] flex items-center justify-center ${
                  inputs.status == name
                    ? "border-b-5D5FEF text-5D5FEF"
                    : "border-b-transparent text-747474 cursor-pointer"
                }`}
                key={index}
              >
                {label}
              </div>
            ))}

            {/* //!filter: By Order, By User */}
            {[
              { name: "order", label: "By Order" },
              { name: "user", label: "By User" },
            ].map(({ label, name }, index) => (
              <div
                onClick={() => handlers.setInputState({key: 'method', value: name})}
                className={`w-fit h-fit flex items-center justify-center my-auto border-l-[1px] pl-[0.5em] ml-[1em] ${
                  inputs.method === name
                    ? "border-l-d7d7d7"
                    : "border-l-transparent"
                } ${
                  inputs.method === name
                    ? " text-5D5FEF"
                    : "text-747474 cursor-pointer"
                }`}
                key={index}
              >
                {label}
              </div>
            ))}
            {/* //!filter: By Order, By User */}
          </div>
        }
        trailing={
          <div className="w-fit h-full flex items-center gap-[20px]">
            <GridViewCTA
              onClick={() => updateState({ key: "view", value: "grid" })}
              svgClassName={
                layoutState.view === "grid"
                  ? activeSvgClassName
                  : inActiveSvgClassName
              }
            />

            <RowViewCTA
              onClick={() => updateState({ key: "view", value: "row" })}
              svgClassName={
                layoutState.view === "row"
                  ? activeSvgClassName
                  : inActiveSvgClassName
              }
            />

            <SortCTA onClick={() => {}} />
          </div>
        }
      />

      {layoutState.view === "grid" ? (
        <RideGridView />
      ) : inputs.method === "order" ? (
        <ByOrderRowView />
      ) : (
        <ByUserRowView />
      )}

      {/* //!Modal */}
      <Modal
        containerClassName="w-[97vw] h-[90vh] top-[5vh] p-0 rounded-tl-[20px] rounded-tr-[20px] overflow-hidden"
        containerStyle={{ padding: 0 }}
      />
      {/* //!Modal */}
    </div>
  );
}

export default Page;
