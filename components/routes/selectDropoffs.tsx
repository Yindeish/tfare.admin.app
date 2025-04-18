'use client';

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
import { usePathname, useRouter } from "next/navigation";

const SelectDropoffs = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    validationSchema: new ObjectSchema({
      cityName: string().required("City Name is required!"),
      startOffName: string().required("sStartOff Name is required!"),
      dropoffName: string().required("Dropoff Name is required!"),
      driverCommission: number().required("Driver Commission is required!"),
    }),
    initialValues: {
      cityName: "",
      startOffName: "",
      dropoffName: "",
      driverCommission: "",
    },
    onSubmit: (values) => {},
  });
  const { handlers, state } = useRouteContext();
  const router = useRouter();
  const path = usePathname();

  const switchToStage = ({
    path,
    stage,
  }: {
    path: string;
    stage: "initial" | "final";
  }) => {
    router.push(`${path}?stage=${stage}`);
  };

  const proceed = () => {
    if(state.inputs.selectedBusstops.length == 0) return;
    handlers.setLocalState({key: 'routeCreationStage', value: 'final'});
    switchToStage({path, stage: state.local.routeCreationStage as 'final'});
  }


  useEffect(() => {
    const allBusstops = [
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'lekki',
        order: 1,
        _id: '9865790'
      },
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'ajah',
        order: 2,
        _id: '9865790'
      },
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'ikate',
        order: 3,
        _id: '9865790'
      },
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'oshodi',
        order: 4,
        _id: '9865790'
      },
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'yaba',
        order: 5,
        _id: '9865790'
      },
      {
        city: {
          _id: '6656589',
          name: 'yaba',
          stateName: 'lagos'
        },
        name: 'ojodu',
        order: 6,
        _id: '9865790'
      },
    ].map((item, index) => ({...item, number: index+1}));
    handlers.setLocalState({key: 'allBusstops', value: allBusstops });
    handlers.setLocalState({key: 'matchBusstops', value: allBusstops });
  }, []) //testing

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-between">
      {/* Header */}
      <div className="flex justify-end">
        <div className="w-fit flex gap-3 items-center">
          <span>Status</span>

          <CupertinoBtn
            indicatorProps={{
              className: ``,
              onClick: () => {
                handlers.setInputState({key: 'statusActive', value: !state.inputs.statusActive})
              },
            }}
            on={state.inputs.statusActive}
            sliderProps={{
              className: ``,
            }}
          />
        </div>
      </div>
      {/* Header */}

      {/* Dropoffs */}
      <div className="h-fit bg-white shadow-md flex flex-col gap-4 px-5 py-3">
        {/* Header - Search block, Dropoff CTAs */}
        <div className="h-auto flex flex-col gap-2">
          {/* Dropoffs Header */}
          <div className="flex gap-2 items-center">
            <span className="w-[14px] h-[20px] text-[#747474]">
              <Startoff />
            </span>

            <span className="text-[14px] font-medium text-black">
              In-Trip Dropoffs (select multiple)
            </span>
          </div>
          {/* Dropoffs Header */}

          {/* Dropoff CTAs */}
          <div className="w-[30em] max-w-full h-[50px] overflow-x-scroll">
            <div className="w-fit h-full flex gap-3">
              {state.inputs.selectedBusstops
              .map((dropoff, index) => (
                <CTABtn
                  containerProps={{
                    children: (
                      <span className="w-[40px] h-[21px]">
                        <Bus />
                      </span>
                    ),
                    className: "h-full cursor-default",
                  }}
                  textProps={{
                    children: dropoff?.name,
                    className: "capitalize",
                  }}
                  key={index}
                />
              ))}
            </div>
          </div>
          {/* Dropoff CTAs */}

          {/* Search Bar */}
          <div className="w-full h-[50px] relative">
            {/* //!Search */}
            <svg
              className="w-[21px] h-[21px] absolute top-[calc((100%-21px)/2)] left-[15px] z-[2]"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0859 17.4575C16.5042 17.4575 20.0859 13.8758 20.0859 9.4575C20.0859 5.03922 16.5042 1.4575 12.0859 1.4575C7.66766 1.4575 4.08594 5.03922 4.08594 9.4575C4.08594 13.8758 7.66766 17.4575 12.0859 17.4575Z"
                stroke="#747474"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0859 14.4575C14.8459 14.4575 17.0859 12.2175 17.0859 9.4575"
                stroke="#747474"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.195 13.5175L1.585 17.1275C0.805 17.9075 0.805 19.1775 1.585 19.9575C2.365 20.7375 3.635 20.7375 4.415 19.9575L8.025 16.3475"
                stroke="#747474"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* //!Search */}

            {/* //!Input */}
            <input
              value={state.inputs.searchText}
              onChange={({target:{value}}) => {
                handlers.setInputState({key: 'searchText', value});

                const matchBusstops = state.local.allBusstops.filter((busstop) => busstop?.name.toLowerCase()?.includes(value?.toLowerCase()));

                handlers.setLocalState({key: 'matchBusstops', value: matchBusstops});
              }}
              className="w-full h-full border-[1px] border-d7d7d7 rounded-full p-[0.3em] pl-[42px] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
              type="text"
              placeholder="Search"
            />
            {/* //!Input */}
          </div>
          {/* Search Bar */}
        </div>
        {/* Header - Search block, Dropoff CTAs */}

        {/* Dropoff select tiles */}
        <div className="flex-1 max-h-[15em] flex-col overflow-y-scroll">
          {state.local.matchBusstops
            .map((dropoff, index) => (
              <SelectDropoffTile dropoff={dropoff} key={index} />
            ))}
        </div>
        {/* Dropoff select tiles */}
      </div>

      {/* Other Settings */}
      <div className="flex flex-col gap-2">
        <div className="text-[16px] font-bold text-black">Other Settings</div>

        <div className="flex items-center justify-between">
          <div className="text-[14px] font-medium text-black">Customizable</div>

          <CupertinoBtn indicatorProps={{}} on={state.inputs.customizable} sliderProps={{
            onClick: () => {
              handlers.setInputState({key: 'customizable', value: !state.inputs.customizable})
            }
          }} />
        </div>
      </div>
      {/* Other Settings */}

      {/* Proceed Btn */}
      <Btn
        props={{
          children: "Proceed",
          onClick: proceed,
          className: `${state.inputs.selectedBusstops.length == 0 ? 'opacity-[0.5] cursor-not-allowed' : ''}`
        }}
      />
      {/* Proceed Btn */}
      {/* Dropoffs */}
    </div>
  );
};

export default SelectDropoffs;
