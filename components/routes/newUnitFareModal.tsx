import { useFormik } from "formik";
import SelectInputTile from "./selectInput";
import { number, ObjectSchema, string } from "yup";
import Ticket from "./svgs/ticket";
import { CTABtn } from "./ctaBtn";
import { useModal } from "@/context.state/shared/modal";
import {
  IUnitFare,
  IUnitFareInput,
  useRouteContext,
} from "@/context.state/route";
import { useEffect } from "react";

const busstops = ["Ikate", "Lekki", "Oshodi"];

const NewUnitfareModal = () => {
  const { state, handlers } = useRouteContext();
  const { hideModal } = useModal();

  const fieldsInvalid =
    !state.inputs.pickupBusstop ||
    state.inputs.pickupBusstop?.name == "" ||
    (!state.inputs.dropoffBusstop || state.inputs.dropoffBusstop?.name) == "" ||
    state.inputs.fare == "";

  const saveRow = () => {
    const newUnitFare = {
      dropoffBusstop: state.inputs.dropoffBusstop,
      pickupBusstop: state.inputs.pickupBusstop,
      fare: state.inputs.fare,
      selected: false,
      number:
        state.inputs.unitFaresInputs.length == 0
          ? 1
          : state.inputs.unitFaresInputs[
              state.inputs.unitFaresInputs.length - 1
            ]?.number + 1,
    };

    let arr = state.inputs.unitFaresInputs;
    arr.push(newUnitFare as unknown as IUnitFareInput);

    handlers.setInputState({
      key: "unitFaresInputs",
      value: arr,
    });

    hideModal();
  };

  return (
    <div className="bg-white flex flex-col gap-4 p-[1em]">
      <div>Unit Fare Details</div>

      {[
        {
          label: "Startoff Bus Stop",
          placeholder: "Select Bus Stop",
          dropdownList: busstops,
          onSelect: (val: string) => {
            handlers.setInputState({ key: "pickupNameInput", value: val });
            const busstop = state.local.allBusstops.find(
              (busstop) => busstop?.name.toLowerCase() === val.toLowerCase()
            );

            handlers.setInputState({ key: "pickupBusstop", value: busstop });
          },
          value: state.inputs.pickupNameInput || "",
        },
        {
          label: "Endpoint Bus Stop",
          placeholder: "Select Bus Stop",
          dropdownList: busstops,
          onSelect: (val: string) => {
            handlers.setInputState({ key: "dropoffNameInput", value: val });
            const busstop = state.local.allBusstops.find(
              (busstop) => busstop?.name.toLowerCase() === val.toLowerCase()
            );

            handlers.setInputState({ key: "dropoffBusstop", value: busstop });
          },
          value: state.inputs.dropoffNameInput || "",
        },
      ].map(({ dropdownList, label, placeholder, onSelect, value }, index) => (
        <SelectInputTile
          label={{
            className: ``,
            children: label,
          }}
          select={{
            list: dropdownList.map((item) => ({
              textContent: item,
              value: item,
            })),
            trigger: {
              error: undefined,
              touched: false,
              placeholder,
              value,
              className: `bg-[#F9F7F8] rounded-[10px] border-[#D7D7D7] border-[1px]`,
            },
            select: { onValueChange: onSelect, value },
          }}
          key={index}
        />
      ))}

      {/* Amount Input */}
      <div className="w-full h-[50px] relative">
        <span className="w-[21px] h-[21px] absolute top-[calc((100%-21px)/2)] left-[5px] z-[2]">
          <Ticket />
        </span>

        {/* //!Input */}
        <input
          onChange={({ target: { value } }) => {
            handlers.setInputState({ key: "fare", value });
          }}
          value={state.inputs.fare}
          className="w-full h-full border-[1px] border-d7d7d7 rounded-[10px] p-[0.3em] pl-[30px] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
          type="number"
          placeholder="#0000.00"
        />
        {/* //!Input */}
      </div>
      {/* Amount Input */}

      {/* Save Btn */}
      <CTABtn
        containerProps={{
          className: `w-[8em] !h-[35px] ml-auto !rounded-[10px] ${
            fieldsInvalid
              ? "bg-transparent cursor-not-allowed"
              : "bg-[#5D5FEF] cursor-pointer"
          }`,
          onClick: () => saveRow(),
        }}
        textProps={{
          children: "Save",
          className: `${
            !fieldsInvalid ? "text-white" : "text-[#D7D7D7]"
          } text-[12px]`,
        }}
      />
      {/* Save Btn */}
    </div>
  );
};

export default NewUnitfareModal;
