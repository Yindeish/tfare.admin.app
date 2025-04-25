'use client'
import Modal from "@/components/shared/modal";
import SubHeader from "@/components/shared/sub_header";
import { GridViewCTA, RowViewCTA, SortCTA } from "@/components/shared/sub_header_components";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useEffect, useState } from "react";
import { RideGridView, RowView } from "@/components/trips/pageComponents";
import { ITrip, ITripContextFetchState, useTripContext } from "@/context.state/trip";
import ApiService from "@/api/api.services";


function Page() {
  const { state: layoutState, updateState } = useLayoutContext();
  const {state: {fetch, inputs, local}, handlers} = useTripContext();

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

  const getTrips = async ({
    loader,
  }: {
    loader: keyof ITripContextFetchState;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: "/trip/trip/trips/all" })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const trips = (data?.driversTrips as ITrip[])?.map((trip) => {
          return {
            id: trip?._id,
            time: trip?.departureTime,
            driverName: trip?.driverName,
            pickup: trip?.route?.pickupBusstop,
            endpoint: trip?.route?.dropoffBusstop,
            currentPassengers: trip?.ridersRides?.length,
          }
        })
        console.log({trips}, 'data', data);
        handlers.setLocalState({key: 'allTrips', value: trips});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if(local.allTrips.length == 0) getTrips({loader: 'fetchingRides'});
  }, [])


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

      {layoutState.view === 'grid' ?
        <RideGridView />
        :
        <RowView />
      }

      {/* //!Modal */}
      <Modal containerClassName="w-[97vw] h-[90vh] top-[5vh] p-0 rounded-tl-[20px] rounded-tr-[20px]" />
      {/* //!Modal */}

    </div>
  )
}

export default Page;