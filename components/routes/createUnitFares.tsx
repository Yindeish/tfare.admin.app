import { useFormik } from "formik";
import { CTABtn } from "./ctaBtn";
import Startoff from "./svgs/startoff";
import { number, ObjectSchema, string } from "yup";
import { useEffect, useState } from "react";
import CupertinoBtn from "./cupertinoBtn";
import Location from "./svgs/location";
import SelectDropoffTile from "./selectDropoffTile";
import Btn from "./btn";
import Bus from "./svgs/bus";
import { IBusStop, useRouteContext } from "@/context.state/route";
import Ticket from "./svgs/ticket";
import ForwardArrow from "./svgs/forwardArrow";
import Checkbox from "./checkbox";
import { useModal } from "@/context.state/shared/modal";
import NewUnitfareModal from "./newUnitFareModal";
import EditBtn from "./svgs/editBtn";
import DeleteBtn from "./svgs/deleteBtn";
import EditUnitfareModal from "./editUnitFareModal";

const CreateUnitfares = () => {
  const { handlers, state } = useRouteContext();
  const { showModal } = useModal();

  const editable = state.inputs.unitFaresInputs.filter((feild) => feild?.selected).length == 1;

  const deletable = state.inputs.unitFaresInputs.filter((feild) => feild?.selected).length >= 1;

  useEffect(() => {
    const allBusstops = [
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "lekki",
        order: 1,
        _id: "9865790",
      },
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "ajah",
        order: 2,
        _id: "9865790",
      },
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "ikate",
        order: 3,
        _id: "9865790",
      },
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "oshodi",
        order: 4,
        _id: "9865790",
      },
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "yaba",
        order: 5,
        _id: "9865790",
      },
      {
        city: {
          _id: "6656589",
          name: "yaba",
          stateName: "lagos",
        },
        name: "ojodu",
        order: 6,
        _id: "9865790",
      },
    ].map((item, index) => ({ ...item, number: index + 1 }));
    handlers.setLocalState({ key: "allBusstops", value: allBusstops });
    handlers.setLocalState({ key: "matchBusstops", value: allBusstops });
  }, []); //testing

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex gap-3 justify-end">
        <div className="w-fit flex gap-3 items-center">
          <span>Status</span>

          <CupertinoBtn
            indicatorProps={{
              className: ``,
              onClick: () => {
                handlers.setInputState({
                  key: "statusActive",
                  value: !state.inputs.statusActive,
                });
              },
            }}
            on={state.inputs.statusActive}
            sliderProps={{
              className: ``,
            }}
          />
        </div>

        <CTABtn 
        containerProps={{
            children: <span className="w-[25px] h-[24px]"><EditBtn /></span>,
            className: `${editable ? 'cursor-pointer': 'cursor-not-allowed'}`,
            onClick: () => {
                if(!editable) {
                    return;
                } else {
                    showModal(<EditUnitfareModal />, true);
                }
            }
        }}
        textProps={{
            children: 'Edit'
        }}
        />

        <CTABtn 
        containerProps={{
            children: <span className="w-[25px] h-[24px]"><DeleteBtn /></span>,
            className: `pr-0 p-2.5 ${deletable ? 'cursor-pointer': 'cursor-not-allowed'}`,
            onClick: () => {
                if(!editable) {
                    return;
                } else {
                    const updatedUnitFares = state.inputs.unitFaresInputs.filter((feild) => feild?.selected != true);

                    handlers.setInputState({key: 'unitFaresInputs', value: updatedUnitFares});
                }
            }
        }}
        textProps={{
            className: 'bg-red-700'
        }}
        />
      </div>
      {/* Header */}

      {/* UnitFares */}
      <div className="flex-1 bg-white shadow-md flex flex-col gap-4 px-5 pb-6">
        {/* Header */}
        <div className="h-auto flex flex-col gap-1">
          <div className="flex items-center gap-4 py-7 border-b-[1px] border-b-[#D7D7D7]">
            <span className="w-[16px] h-[13px]">
              <Ticket />
            </span>

            <span className="text-[14px] font-medium text-black">
              Unit Fares
            </span>
          </div>

          <div className="grid grid-cols-[20px_1fr_1fr_1fr] gap-2 py-3">
            {/* Checkbox Column */}
            <Checkbox
              condition={state.inputs.unitFaresInputs.every((feild) => feild?.selected == true) && state.inputs.unitFaresInputs.length >= 1}
              props={{
                className: `col-span-1 w-[20px] h-[20px]`,
                onClick: () => {
                    const updatedUnitFares = state.inputs.unitFaresInputs.map((feild) => {
                        return {
                            ...feild,
                            selected: !feild?.selected 
                        }
                    });

                    handlers.setInputState({key: 'unitFaresInputs', value: updatedUnitFares});
                }
              }}
            />
            {/* Checkbox Column */}

            {/* Startoff Column */}
            <span className="w-fit flex items-center gap-1">
              <span className="w-[14px] h-[20px] text-[#27AE65]">
                <Startoff />
              </span>
              <span className="text-black font-medium text-[14px]">
                Startoff
              </span>
            </span>
            {/* Startoff Column */}

            {/* Dropoff Column  */}
            <span className="w-fit flex items-center gap-1">
              <span className="w-[14px] h-[20px] text-[#CF0707]">
                <Startoff />
              </span>
              <span className="text-black font-medium text-[14px]">
                Dropoff
              </span>
            </span>
            {/* Dropoff Column  */}

            {/* Ticket fare Column */}
            <div className="flex items-center gap-4 justify-end">
              <span className="text-[14px] font-medium text-black">
                Ticket Fare
              </span>

              <span className="w-[16px] h-[13px]">
                <Ticket />
              </span>
            </div>
            {/* Ticket fare Column */}
          </div>
        </div>
        {/* Header */}

        {/* Dropoff select tiles */}
        <div className="flex-1 max-h-[22em] flex flex-col gap-2 overflow-y-scroll">
          {state.inputs.unitFaresInputs.map((unitFare, index) => (
            <div
              className="grid grid-cols-[20px_1fr_1fr_1fr] gap-2 place-content-center place-items-center"
              key={index}
            >
              {/* Checkbox Column */}
              <Checkbox
                condition={unitFare?.selected}
                props={{
                  className: `col-span-1 w-[20px] h-[20px]`,
                  onClick: () => {
                    const updatedUnitFares = state.inputs.unitFaresInputs.map((feild) => {
                        if(feild?.number == unitFare?.number) {
                            return {
                                ...feild,
                                selected: ! feild?.selected
                            }
                        }
                        else return feild;
                    });

                    handlers.setInputState({key: 'unitFaresInputs', value: updatedUnitFares});
                  }
                }}
              />
              {/* Checkbox Column */}

              <div className="col-span-1 flex gap-2 items-center justify-self-start">
                <span className="text-[14px] font-medium text-black">
                  {unitFare?.pickupBusstop?.name}
                </span>

                <span className="w-[30px] h-[7px]">
                  <ForwardArrow />
                </span>
              </div>

              <div className="col-span-1 flex gap-2 items-center justify-self-start text-[14px] font-medium text-black">
                {unitFare?.dropoffBusstop?.name}
              </div>

              {/* Amount Input */}
              <div className="w-[8em] h-[50px] relative">
                <span className="w-[21px] h-[21px] absolute top-[calc((100%-21px)/2)] left-[5px] z-[2]">
                  <Ticket />
                </span>

                {/* //!Input */}
                <input
                value={unitFare?.fare}
                disabled={true}
                  className="w-full h-full border-[1px] border-d7d7d7 rounded-[10px] p-[0.3em] pl-[30px] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
                  type="text"
                  placeholder="#0000.00"
                />
                {/* //!Input */}
              </div>
              {/* Amount Input */}
            </div>
          ))}

          {/* Add Row Btn */}
          <CTABtn
            containerProps={{
              className: `bg-transparent border-[1px] border-[#D7D7D7] w-[8em] !h-[35px] !rounded-[10px]`,
              onClick: () => {
                showModal(<NewUnitfareModal />, false)
              }
            }}
            textProps={{
              children: "Add unit fare",
              className: `text-[#D7D7D7] text-[12px]`
            }}
          />
          {/* Add Row Btn */}
        </div>
        {/* Dropoff select tiles */}
      </div>

      {/* UnitFares */}
    </div>
  );
};

export default CreateUnitfares;
