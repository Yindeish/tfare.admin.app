"use client";
import shared_images from "@/constants/images/shared";
import {
  IRidersContextFetchState,
  IRidersContextInputState,
  useRiderContext,
} from "@/context.state/rider";
import {
  CloseBtn,
  Deduct,
  EditBtn,
  Topup,
} from "@/public/icons/shared/modalSvgs";
import StatusBadge from "../shared/status_badge";
import InputField from "../shared/inputFieldTile";
import { useEffect, useState } from "react";
import { SortCTA } from "../shared/sub_header_components";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Bus } from "@/public/icons/homeSvgs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useModal } from "@/context.state/shared/modal";

type TTab = "order" | "transaction" | "";

function RiderModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { hideModal } = useModal();
  const {
    state: { inputs, fetch, local },
    handlers,
  } = useRiderContext();

  const tab: TTab = searchParams.get("tab") as TTab;
  const editing: string = searchParams.get("edit") as string;

  const swipeTo = (tab: TTab) => router.push(`/riders?tab=${tab}`);

  const edit = (tab: TTab, edit: string) =>
    router.push(`/riders?tab=${tab}&edit=${edit}`);
  const save = (tab: TTab, edit: string) =>
    router.push(`/riders?tab=${tab}&edit=${edit}`);

  useEffect(() => {
    if (!tab || tab == ("" as any)) swipeTo("order");
  }, []);

  useEffect(() => {
    [
      { key: "userName", value: local.selectedRider?.fullName },
      { key: "email", value: local.selectedRider?.email },
      { key: "phoneNumber", value: local.selectedRider?.phoneNumber },
      { key: "walletBalance", value: "990809" },
    ].forEach(({ key, value }) => {
      handlers.setInputState({
        key: key as keyof IRidersContextInputState,
        value,
      });
    });
  }, []);

  return (
    <div className="w-full h-full">
      {/* //!Edit Close Btns */}
      <div className="flex justify-end items-center gap-[1em]">
        {editing == "true" ? (
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
      {/* //!Edit Close Btns */}

      {/* //!User Info Block */}
      <div className="w-[75%] h-[40%] mx-auto grid grid-cols-[1fr_3fr_3fr] gap-[1em]">
        <div className="col-span-1 h-full border-[1px] border-d7d7d7 rounded-[20px] flex flex-col gap-[7px] justify-center items-center">
          <img
            className="w-[100px] h-[100px] rounded-full"
            src={local.selectedRider?.picture || local.selectedRider?.avatar}
            alt=""
          />

          <span className="font-normal text-[12px] leading-[14px] text-747474">
            <span>#{local?.selectedRider?._id?.slice(0, 10)}</span>
          </span>

          <StatusBadge
            enabled
            status="active"
            className="text-[12px]"
            dotClassName="w-[10px] h-[10px]"
          />

          <StatusBadge
            enabled={false}
            status="in-active"
            className="text-[12px]"
            dotClassName="w-[10px] h-[10px]"
          />
        </div>

        <div className="col-start-2 col-span-1 h-full flex flex-col justify-between">
          <InputField
            label="Username"
            inputProps={{
              name: "username",
              value: inputs.userName,
              onChange: ({ target: { value } }) => {
                handlers.setInputState({ key: "userName", value });
              },
              disabled: editing == 'true'
            }}
          />
          <InputField
            label="Email Address"
            inputProps={{
                name: "email",
                value: inputs.email,
                onChange: ({ target: { value } }) => {
                  handlers.setInputState({ key: "email", value });
                },
                disabled: editing == 'true'
              }}
          />
          <InputField
            label="Wallet Balance"
            inputProps={{
                name: "walletBalance",
                value: inputs.walletBalance,
                onChange: ({ target: { value } }) => {
                  handlers.setInputState({ key: "walletBalance", value });
                },
                disabled: editing == 'true'
              }}
          />
        </div>

        <div className="col-start-3 col-span-1 h-full flex flex-col justify-between">
          <InputField
            label="Phone Number"
            inputProps={{
                name: "phoneNumber",
                value: inputs.phoneNumber,
                onChange: ({ target: { value } }) => {
                  handlers.setInputState({ key: "phoneNumber", value });
                },
                disabled: editing == 'true'
              }}
          />

          <div className={`flex flex-col gap-[12px]`}>
            <span
              className={`font-normal text-[14px] leading-[17px] text-747474`}
            >
              Quick Action
            </span>

            <div className="w-full grid grid-cols-2 gap-[30px]">
              <div className="col-span-1 h-[50px] cursor-pointer bg-27AE65 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                <Topup className="w-[20px] h-[20px]" />
                Topup
              </div>
              <div className="col-span-1 h-[50px] cursor-pointer bg-CF0707 flex items-center justify-center gap-[10px] rounded-[10px] text-white font-medium text-[14px] leading-[18px]">
                <Deduct className="w-[20px] h-[20px]" />
                Deduct
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //!User Info Block */}

      {/* //!Orders, Transactions */}
      <div className="w-[85%] h-[50px] mx-auto flex justify-between items-center">
        {/* //!Order-Transaction Tab Controllsers */}
        <div className="w-fit h-full flex gap-[36px]">
          {[
            { name: "order", label: "All Orders" },
            { name: "transaction", label: "All Transaction" },
          ].map(({ label, name }, index) => (
            <div
              onClick={() => swipeTo(name as TTab)}
              className={`w-fit h-full border-b-[4px] flex items-center justify-center ${
                tab == name
                  ? "border-b-5D5FEF text-5D5FEF"
                  : "border-b-transparent text-747474 cursor-pointer"
              }`}
              key={index}
            >
              {label}
            </div>
          ))}
        </div>
        {/* //!Order-Transaction Tab Controllsers */}

        <div className="w-fit h-full flex items-center gap-[20px]">
          <SortCTA className="h-[35px]" onClick={() => {}} />

          <CloseBtn className="w-[24px] h-[24px] text-CF0707" />
        </div>
      </div>
      {/* //!Orders, Transactions */}

      {/* //!Collections Header */}
      <div className="w-full h-[60px] border-y-[0.7px] border-y-d7d7d7 bg-f9f7f8">
        <div className="w-[90%] h-full mx-auto grid grid-cols-6">
          {["Order Type", "Order ID", "Date", "Driver", "Price", "Status"].map(
            (item, index) => (
              <span
                className="col-span-1 font-medium text-14px] leading-[18px] text-747474 text-center flex items-center justify-center "
                key={index}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
      {/* //!Collections Header */}
      {/* //!Collections Body */}
      <div className="w-full h-[37%]">
        {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
        <div className="w-[calc(90%+5px)] h-full mx-auto overflow-y-scroll">
          {/* //!(90%+5px) +5px here is coming from the scroll bar  */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="w-full h-[60px] mx-auto grid grid-cols-6 bg-white "
              key={index}
            >
              <span className="col-span-1 font-medium text-14px] leading-[18px] text-747474 flex items-center justify-center gap-[0.5em] ">
                <Bus className="w-[20px] h-[20px]" />
                <span>Trip</span>
              </span>

              <span className=" flex items-center justify-center">
                #7654321XYZ
              </span>

              <span className=" flex items-center justify-center">
                April 14, 2024
              </span>

              <span className=" flex items-center justify-center">
                Tom Hawkins
              </span>

              <span className=" flex items-center justify-center">
                ₦ 500.00
              </span>

              <span className="flex items-center justify-center">
                <StatusBadge
                  status="Ongoing"
                  className="bg-FFAE0210 text-FFAE02"
                  dotClassName="text-FFAE02"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* //!Collections Body */}
    </div>
  );
}

export default RiderModal;
