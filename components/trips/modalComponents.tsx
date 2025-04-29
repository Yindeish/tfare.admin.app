"use client";
import shared_images from "@/constants/images/shared";
import { useRiderContext } from "@/context.state/rider";
import {
  CloseBtn,
  Deduct,
  EditBtn,
  Topup,
} from "@/public/icons/shared/modalSvgs";
import StatusBadge from "../shared/status_badge";
import InputField from "../shared/inputFieldTile";
import { useEffect, useState } from "react";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Bus } from "@/public/icons/homeSvgs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useModal } from "@/context.state/shared/modal";
import rideTripsImages from "@/constants/images/ridesTrips";
import { LuClock3 } from "react-icons/lu";
import { useTripContext } from "@/context.state/trip";
import { Utils } from "@/utils";
import { useRideContext } from "@/context.state/ride";

type TTab = "order" | "transaction" | "";

function RideTripModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { hideModal } = useModal();
  const path = usePathname();
  const {
    state: { fetch, inputs, local },
    handlers,
  } = useTripContext();

  const tab: TTab = searchParams.get("tab") as TTab;
  const editing: string = searchParams.get("edit") as string;

  const activeBusStopIndex = 4;

  const swipeTo = (tab: TTab) => router.push(`${path}?tab=${tab}`);

  const edit = (tab: TTab, edit: string) =>
    router.push(`${path}?tab=${tab}&edit=${edit}`);
  const save = (tab: TTab, edit: string) =>
    router.push(`${path}?tab=${tab}&edit=${edit}`);

  useEffect(() => {
    if (!tab || tab == ("" as any)) swipeTo("order");
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* //!Overlay -- Edit Close Btns */}
      <div className="flex justify-end items-center gap-[1em] absolute top-[1.5em] right-[1.5em] z-[5]">
        {editing == "true" || !editing || editing === "" ? (
          <IoMdCheckmarkCircle
            onClick={() => edit(tab, "false")}
            className="w-[24px] h-[24px] text-27AE65 cursor-pointer"
          />
        ) : (
          <EditBtn
            onClick={() => edit(tab, "true")}
            className="w-[24px] h-[24px] text-747474 cursor-pointer"
          />
        )}
        <CloseBtn
          onClick={hideModal}
          className="w-[24px] h-[24px] text-CF0707"
        />
      </div>
      {/* //!Overlay -- Edit Close Btns */}

      {/* //!Grid */}
      <div className="w-full h-full grid grid-cols-2">
        <div className="col-span-1 h-full p-[4%] flex flex-col gap-[1em] items-end">
          {/* //!Ride ID, Ride Status */}
          <div className="w-[90%] flex items-center justify-between">
            <div className="w-fit flex items-center gap-[24px]">
              <Bus className="w-[20px] h-[20px] text-747474" />

              <span className={`font-bold text-[16px]`}>
                Ride {`#${local?.selectedTrip?._id?.slice(0, 10)}`}
              </span>
            </div>

            <StatusBadge
              status={local.selectedTrip?.rideStatus as string}
              className="bg-FFAE0210 text-FFAE02"
              dotClassName="text-FFAE02 rounded-full"
              enabled
            />
          </div>
          {/* //!Ride ID, Ride Status */}

          {/* //!Driver Name, Duration */}
          <div className="w-[80%] flex items-center justify-between">
            <div className="w-fit flex items-center gap-[24px]">
              <span className={`font-normal text-[14px] text-747474`}>
                Driver:
              </span>
              <span className={`font-normal text-[14px] text-black capitalize`}>
                {local?.selectedTrip?.driver?.fullName}
              </span>
            </div>

            <span className="inline-flex gap-[0.3em] items-center w-fit h-fit">
              <LuClock3 className="text-27AE65 w-[16px] h-[16px]" />
              <span className="font-normal text-[12px] text-747474">{Utils.formatTime(local.selectedTrip?.createdAt as string)}</span>
            </span>
          </div>
          {/* //!Driver Name, Duration */}

          {/* //!In-Trip Dropoffs */}
          <div
            className={`w-[80%] font-bold text-[14px] text-black pb-[1em] border-b-[1px] border-b-d7d7d7`}
          >
            In-Trip Dropoffs
          </div>
          {/* //!In-Trip Dropoffs */}

          {/* //!Start off Bus stop */}
          <div
            className={`w-[80%] pb-[1em] border-b-[1px] border-b-d7d7d7 flex flex-col gap-[1.5em]`}
          >
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center gap-[1em]">
                <Bus className="w-[20px] h-[20px] text-27AE65" />
                <span className="font-normal text-[12px] text-747474"></span>
              </div>
              <div className="w-fit flex items-center gap-[1em]">
                <LuClock3 className="text-747474 w-[16px] h-[16px]" />
                <span className="font-normal text-[12px] text-747474">ETA</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <span className="font-bold text-[14px] text-black capitalize">
                {local.selectedTrip?.route?.pickupBusstop?.name}
              </span>
              <span className="font-medium text-[14px] text-black">
                {Utils.formatTime(local.selectedTrip?.createdAt as string)}
              </span>
            </div>
          </div>
          {/* //!Start off Bus stop */}

          {/* //!Dropoff Bus Stops */}
          <div className="w-[78%] h-[55vh] flex flex-col pl-[1em] overflow-y-scroll">
            {local.selectedTrip?.route?.inTripDropoffs
            ?.map((dropoff, index) => ({...dropoff, number: index+1}))
            ?.map((dropoff, index) => (
              <div className="border-l-[1px] border-l-d7d7d7" key={index}>
                <div
                  className={`w-full flex flex-col gap-[1.5em] border-l-[1px] relative pt-[2em] pl-[2em] `}
                >
                  {/* //!verlay */}
                  <div
                    className={`absolute top-0 left-[-6px] w-[11px] ${
                    //   dropoff?.number < activeBusStopIndex ? "h-full" : "h-[80%]"
                      dropoff?.number < 2 ? "h-full" : "h-[80%]"
                    } ${dropoff?.number == 0 ? "h-[80%]" : ""}`}
                  >
                    {/* {activeBusStopIndex === index && ( */}
                    {activeBusStopIndex == dropoff?.number && (
                      <div className="w-[10px] h-[10px] absolute top-[calc(100%-10px)] left-0 rounded-full bg-FFAE02" />
                    )}
                    <div
                      className={`w-[1px] h-full mx-auto ${
                        index <= activeBusStopIndex
                          ? "bg-FFAE02"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  {/* //!verlay */}

                  <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center gap-[1em]">
                      <Bus className="w-[20px] h-[20px] text-747474" />
                      <span className="font-normal text-[12px] text-747474"></span>
                    </div>
                    <div className="w-fit flex items-center gap-[1em]">
                      <LuClock3 className="text-747474 w-[16px] h-[16px]" />
                      <span className="font-normal text-[12px] text-747474">
                        ETA
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between border-b-[1px] border-b-d7d7d7 pb-[1em]">
                    <span className="font-bold text-[14px] text-black">
                      {dropoff?.name}
                    </span>
                    <span className="font-medium text-[14px] text-black">
                      {'-'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* //!Dropoff Bus Stops */}
        </div>

        {/* //!Map */}
        <div className="col-span-1 h-full">
          <img className="w-full h-full" src={rideTripsImages.map.src} alt="" />
        </div>
        {/* //!Map */}
      </div>
      {/* //!Grid */}
    </div>
  );
}

export default RideTripModal;
