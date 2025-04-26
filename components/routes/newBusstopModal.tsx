import { useFormik } from "formik";
import SelectInputTile from "./selectInput";
import { number, ObjectSchema, string } from "yup";
import Ticket from "./svgs/ticket";
import { CTABtn } from "./ctaBtn";
import { useModal } from "@/context.state/shared/modal";
import {
  IBusStop,
  IBusStopInput,
  ICityInput,
  IUnitFare,
  IUnitFareInput,
  useRouteContext,
} from "@/context.state/route";
import Location from "./svgs/location";
import { useEffect, useState } from "react";
import Bus from "./svgs/bus";

const busstops = ["Ikate", "Lekki", "Oshodi"];

const NewBusstopModal = () => {
  const { state, handlers } = useRouteContext();
  const { hideModal } = useModal();

  const [fieldsInvalid, setFeildInvalid] = useState(
    state.inputs.cityNameInput == "" || state.inputs.busstopNameInput == ""
  );

  const createBusstop = () => {
    if (fieldsInvalid) return;

    const newBusstop = {
      city: state.inputs.city,
      name: state.inputs.cityNameInput,
    } as IBusStopInput;

    handlers.setLocalState({
      key: "allBusstops",
      value: [...state.local.allBusstops, newBusstop],
    }); // testing
    hideModal();
  };

  useEffect(() => {
    setFeildInvalid(
      state.inputs.cityNameInput == "" || state.inputs.busstopNameInput == ""
    );
  }, [state.inputs]);

  return (
    <div className="bg-white flex flex-col gap-4 p-[1em]">
      <div className="text-black font-bold text-[22px]">New Bus Stop</div>

      {/* City Input */}
      <SelectInputTile
        label={{
          className: ``,
          children: "City",
        }}
        select={{
          list: state.local.allBusstops?.map((item) => ({
            textContent: item?.name,
            value: String(item?.name),
          })),
          trigger: {
            error: undefined,
            touched: false,
            placeholder: "Select City",
            value: state.inputs.city?.name,
            className: `bg-[#F9F7F8] rounded-[10px] border-[#D7D7D7] border-[1px]`,
          },
          select: {
            onValueChange: (val: string) => {
              handlers.setInputState({ key: "cityNameInput", value: val });
              const city = state.local.allCities.find(
                (city) => String(city?._id?.toLowerCase()) === val.toLowerCase()
              );

              handlers.setInputState({ key: "city", value: city });
            },
            value: state.inputs.cityNameInput
          },
        }}
      />
      {/* City Input */}

      {/* Busstop Name */}
      <div className="flex flex-col gap-2">
        <div className="text-black text-[14px] font-medium flex gap-4 items-center">
          <span className="w-[20px] h-[20px]">
            <Bus />
          </span>
          Bus Stop Name
        </div>

        <input
          onChange={({ target: { value } }) => {
            handlers.setInputState({ key: "busstopNameInput", value });
          }}
          value={state.inputs.busstopNameInput}
          className="w-full h-[50px] bg-[#F9F7F8] border-[1px] border-d7d7d7 rounded-[10px] p-[1em] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
          type="text"
          placeholder={"Enter State Name"}
        />
      </div>
      {/* Busstop Name */}

      {/* See On Map */}
      <div
        className={`w-full relative ${
          fieldsInvalid ? "cursor-not-allowed opacity-[0.5]" : "cursor-pointer"
        }`}
      >
        <div className="flex gap-4 items-center">
          <span className="text-[14px] font-bold text-[#5D5FEF]">
            SELECT ON MAP
          </span>

          <span className="w-[24px] h-[24px]">
            <Location />
          </span>
        </div>
      </div>
      {/* See On Map */}

      {/* Save Btn */}
      <CTABtn
        containerProps={{
          className: `w-full !rounded-[10px] ${
            fieldsInvalid
              ? "bg-transparent cursor-not-allowed"
              : "bg-[#5D5FEF] cursor-pointer"
          }`,
          onClick: () => createBusstop(),
        }}
        textProps={{
          children: "Create Bus Stop",
          className: `${
            fieldsInvalid ? "text-[#D7D7D7]" : "text-white"
          } text-[12px]`,
        }}
      />
      {/* Save Btn */}
    </div>
  );
};

export default NewBusstopModal;
