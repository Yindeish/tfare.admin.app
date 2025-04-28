"use client";
import { LuClock3 } from "react-icons/lu";
import KeyValueBlock from "@/components/shared/key_value_block";
import { ICurrentRide, IRide, useRideContext } from "@/context.state/ride";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useModal } from "@/context.state/shared/modal";
import { Expand } from "@/public/icons/homeSvgs";
import { useState } from "react";
import RideTripModal from "@/components/rides/modalComponents";
import StatusBadge from "../shared/status_badge";
import { Item } from "@radix-ui/react-select";
import { IRoute } from "@/context.state/route";
import { IUser } from "@/context.state/auth";
import { Utils } from "@/utils";

function RideGridView() {
  const { showModal } = useModal();
  const { state, handlers } = useRideContext();

  return (
    <div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8 overflow-y-scroll">
      <div className="w-full h-fit grid grid-cols-3 gap-[1em]">
        {state.local.allRides?.map(
          (
            item: ICurrentRide &
              IRide & {
                route: IRoute;
                driver?: IUser;
                rider?: IUser;
                purchasedTickets?: number;
              },
            index
          ) => (
            <div
              className="col-span-1 w-full h-[40vh] flex flex-col gap-[1em] rounded-[20px] p-[1.3em] border-[0.7px] border-27AE65 bg-white"
              style={{ boxShadow: "0px 0px 10px 0px #00000010" }}
              key={index}
            >
              <div className="w-full h-fit flex items-start justify-between">
                <div className="w-[70%] flex flex-col gap-[12px]">
                  <span className="font-medium text-[14px] text-black">
                    Ride #{item?._id?.slice(0, 10)}
                  </span>

                  <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                    <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                    <span className="font-normal text-[12px] text-747474">
                      {Utils.formatTime(item?.createdAt)}
                    </span>
                  </span>
                </div>

                <Expand
                  onClick={() => {
                    handlers.setLocalState({
                      key: "selectedRide",
                      value: Item,
                    });
                    showModal(<RideTripModal />, false);
                  }}
                  className="w-[18px] h-[18px] text-747474 cursor-pointer"
                />
              </div>

              <KeyValueBlock
                keyValueArray={
                  state.inputs.method === "order"
                    ? [
                        { key: "Driver Name", value: item?.driver?.fullName },
                        { key: "Pickup", value: item?.route?.pickupBusstop?.name },
                        { key: "Endpoint", value: item?.route?.dropoffBusstop?.name },
                        {
                          key: "Current Passengers",
                          value: item?.ridersRides?.length,
                        },
                      ]
                    : [
                        { key: "Rider Name", value: item?.rider?.fullName },
                        { key: "Pickup", value: item?.route?.pickupBusstop?.name },
                        { key: "Endpoint", value: item?.route?.dropoffBusstop?.name },
                        { key: "Purchased Tickets", value: item?.purchasedTickets },
                      ]
                }
                containerClassName="gap-[0.75em] pt-[1em] border-t-[0.7px] border-t-d7d7d7"
                keyClassName="font-normal text-[14px] text-747474"
                valueClassName="font-normal text-[14px] text-black"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ByOrderRowView() {
  const { showModal } = useModal();
  const { state, handlers } = useRideContext();

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

  return (
    <div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">
      {/* //!By Order */}
      {/* //!Header */}
      <div className="w-full h-[70px] grid grid-cols-[0.7fr_2.5fr_1.7fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">
        {/* //!Leading Space */}
        <div className="col-span-1 w-full h-fit" />
        {/* //!Leading Space */}

        {/* //!RideID */}
        <div className="col-span-1 w-full h-fit font-bold text-[14px] text-747474">
          RideID
        </div>
        {/* //!RideID */}

        {/* //!Driver Name */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Driver Name
        </div>
        {/* //!Driver Name */}

        {/* //!Startoff */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Startoff
        </div>
        {/* //!Startoff */}

        {/* //!Endpoint */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Endpoint
        </div>
        {/* //!Endpoint */}

        {/* //!Time */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Time
        </div>
        {/* //!Time */}

        {/* //!Trailing Space */}
        <div className="col-span-1 w-full h-fit" />
        {/* //!Trailing Space */}
      </div>
      {/* //!Header */}

      {/* //!Body */}
      <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">
        {state.local.allRides?.map((ride: ICurrentRide &
              IRide & {
                route: IRoute;
                driver?: IUser;
                rider?: IUser;
                purchasedTickets?: number;
              }, index) => (
          <div
            className="w-full h-[50px] grid grid-cols-[0.7fr_2.5fr_1.7fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center py-[0.3em] px-[0.5em]"
            key={index}
          >
            {/* //!Leading Space */}
            <div className="col-span-1 w-full h-fit" />
            {/* //!Leading Space */}

            {/* //!RideID */}
            <div className="col-span-1 w-full h-fit font-bold text-[14px] text-747474 flex items-center justify-between">
              <span>#{ride?._id?.slice(0, 10)}</span>

              <Expand
                onClick={() => {
                  handlers.setLocalState({
                    key: "selectedRide",
                    value: ride,
                  });
                  showModal(<RideTripModal />, false);
                }}
                className="w-[18px] h-[18px] text-747474 cursor-pointer"
              />
            </div>
            {/* //!RideID */}

            {/* //!Driver Name */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center capitalize">
              {ride?.driver?.fullName}
            </div>
            {/* //!Driver Name */}

            {/* //!Startoff */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              {ride?.route?.pickupBusstop?.name}
            </div>
            {/* //!Startoff */}

            {/* //!Endpoint */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              {ride?.route?.dropoffBusstop?.name}
            </div>
            {/* //!Endpoint */}

            {/* //!Time */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-center">
              <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                <span className="font-normal text-[12px] text-747474">
                  {Utils.formatTime(ride?.createdAt)}
                </span>
              </span>
            </div>
            {/* //!Time */}

            {/* //!Trailing Space */}
            <div className="col-span-1 w-full h-fit" />
            {/* //!Trailing Space */}
          </div>
        ))}
      </div>
      {/* //!Body */}
    </div>
  );
}

function ByUserRowView() {
  const { showModal } = useModal();
  const { state, handlers } = useRideContext();

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

  return (
    <div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">
      {/* //!By Order */}
      {/* //!Header */}
      <div className="w-full h-[70px] grid grid-cols-[0.7fr_2fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">
        {/* //!Time */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-end">
          Time
        </div>
        {/* //!Time */}

        {/* //!Driver Name */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          User Name
        </div>
        {/* //!Driver Name */}

        {/* //!Startoff */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Pickup
        </div>
        {/* //!Startoff */}

        {/* //!Endpoint */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Dropoff
        </div>
        {/* //!Endpoint */}

        {/* //!Status */}
        <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
          Status
        </div>
        {/* //!Status */}

        {/* //!Trailing Space */}
        <div className="col-span-1 w-full h-fit" />
        {/* //!Trailing Space */}
      </div>
      {/* //!Header */}

      {/* //!Body */}
      <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">
        {state.local.allRides?.map((ride: ICurrentRide &
              IRide & {
                route: IRoute;
                driver?: IUser;
                rider?: IUser;
                purchasedTickets?: number;
              }, index) => (
          <div
            className="w-full h-[50px] grid grid-cols-[0.7fr_2fr_1.5fr_1.5fr_1fr_0.7fr] gap-[10px] items-center py-[0.3em] px-[0.5em]"
            key={index}
          >
            {/* //!Time */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-end">
              <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
                <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
                <span className="font-normal text-[12px] text-747474">
                  {Utils.formatTime(ride?.createdAt)}
                </span>
              </span>
            </div>
            {/* //!Time */}

            {/* //!Driver Name */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              {ride?.rider?.fullName}
            </div>
            {/* //!Driver Name */}

            {/* //!Startoff */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              {ride?.route?.pickupBusstop?.name}
            </div>
            {/* //!Startoff */}

            {/* //!Endpoint */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              {ride?.route?.dropoffBusstop?.name}
            </div>
            {/* //!Endpoint */}

            {/* //!Status */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 flex items-center justify-center">
              <StatusBadge
                status="Ongoing"
                className="bg-FFAE0210 text-FFAE02"
                dotClassName="text-FFAE02"
              />
            </div>
            {/* //!Status */}

            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474 text-center">
              <Expand
                onClick={() => {
                  handlers.setLocalState({
                    key: "selectedRide",
                    value: ride,
                  });
                  showModal(<RideTripModal />, false);
                }}
                className="w-[18px] h-[18px] text-747474 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      {/* //!Body */}
    </div>
  );
}

export { RideGridView, ByOrderRowView, ByUserRowView };
