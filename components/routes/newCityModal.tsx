import { useFormik } from "formik";
import SelectInputTile from "./selectInput";
import { number, ObjectSchema, string } from "yup";
import Ticket from "./svgs/ticket";
import { CTABtn } from "./ctaBtn";
import { useModal } from "@/context.state/shared/modal";
import {
  ICityInput,
  IUnitFare,
  IUnitFareInput,
  useRouteContext,
} from "@/context.state/route";
import Location from "./svgs/location";
import { useEffect, useState } from "react";
import ApiService from "@/api/api.services";
import { toast } from "@/hooks/use-toast";
import { VscLoading } from "react-icons/vsc";

const busstops = ["Ikate", "Lekki", "Oshodi"];

const NewCityModal = () => {
  const { state, handlers } = useRouteContext();
  const { hideModal } = useModal();

  const [fieldsInvalid, setFeildInvalid] = useState(
    state.inputs.stateNameInput == "" || state.inputs.cityNameInput == ""
  );

  const createCity = async () => {
    if (fieldsInvalid) return;

    const newCity = {
      name: state.inputs.cityNameInput,
      stateName: state.inputs.stateNameInput,
    } as ICityInput;

    handlers.setFetchState({ key: "uploadingCity", value: true });

    await ApiService.postWithBearerToken({
      url: `/ride/city/create`,
      data: newCity
    })
      .then((data) => {
        handlers.setFetchState({ key: "uploadingCity", value: false });

        const msg = data?.msg;
        const code = data?.code;

        toast({
          title: "City Upload",
          description: msg,
        });

        if(code == 200 || code == 201) hideModal();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setFeildInvalid(
      state.inputs.stateNameInput == "" || state.inputs.cityNameInput == ""
    );
  }, [state.inputs.stateNameInput, state.inputs.cityNameInput]);

  return (
    <div className="bg-white flex flex-col gap-4 p-[1em]">
      <div className="text-black font-bold text-[22px]">New City</div>

      {[
        {
          label: "City Name",
          placeholder: "Enter City Name",
          dropdownList: busstops,
          onChange: (val: string) => {
            handlers.setInputState({ key: "cityNameInput", value: val });
          },
          value: state.inputs.cityNameInput,
        },
        {
          label: "State Name",
          placeholder: "Enter State Name",
          dropdownList: busstops,
          onChange: (val: string) => {
            handlers.setInputState({ key: "stateNameInput", value: val });
          },
          value: state.inputs.stateNameInput,
        },
      ].map(({ label, placeholder, onChange, value }, index) => (
        <div className="flex flex-col gap-3" key={index}>
          <div className="text-black text-[14px] font-medium">{label}</div>

          <input
            onChange={({ target: { value } }) => onChange(value)}
            value={value}
            className="w-full h-[50px] bg-[#F9F7F8] border-[1px] border-d7d7d7 rounded-[10px] p-[1em] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
            type="text"
            placeholder={placeholder}
            key={index}
          />
        </div>
      ))}

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
          onClick: () => !state.fetch.uploadingCity && createCity(),
        }}
        textProps={{
          children: <span className="inline-flex gap-2 items-center">Create City {state.fetch.uploadingCity && <VscLoading className="animate-spin" />}</span>,
          className: `${
            fieldsInvalid ? "text-[#D7D7D7]" : "text-white"
          } text-[12px]`,
        }}
      />
      {/* Save Btn */}
    </div>
  );
};

export default NewCityModal;
