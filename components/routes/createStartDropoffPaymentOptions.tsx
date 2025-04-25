import { useFormik } from "formik";
import { CTABtn } from "./ctaBtn";
import SelectInputTile from "./selectInput";
import PlusInCircle from "./svgs/plusInCircle";
import { number, ObjectSchema, string } from "yup";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import Checkbox from "./checkbox";
import { IBusStop, IRouteContextFetchState, useRouteContext } from "@/context.state/route";
import { useModal } from "@/context.state/shared/modal";
import NewCityModal from "./newCityModal";
import ApiService from "@/api/api.services";

const CreateStartDropoffPaymentOptions = () => {
  const { state: {fetch, inputs, local}, handlers } = useRouteContext();
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
      driverCommission: inputs.driverCommission,
    },
    onSubmit: (values) => {},
  });
  const { showModal } = useModal();

  const getAllBusstops = async ({
    loader
  }: {
    loader: keyof IRouteContextFetchState;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: `/user/ride/busstops/all` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const allBusstops = (data?.allBusstops as IBusStop[])
        handlers.setLocalState({key: 'allBusstops', value: allBusstops});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if(local.allBusstops?.length == 0) 
      getAllBusstops({loader: 'fetchingBusstops' });
  }, [])


  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Header */}
      <div className="flex justify-between">
        <span className="text-[22px] font-bold text-[#747474]">
          Create New Route
        </span>

        <CTABtn
          containerProps={{
            children: (
              <span className="w-[24px] h-[25px]">
                <PlusInCircle />
              </span>
            ),
            className: `bg-[#5D5FEF]`,
            onClick: () => showModal(<NewCityModal />, false),
          }}
          textProps={{
            children: "Create New City",
            className: `text-white`,
          }}
        />
      </div>
      {/* Header */}

      {/* City Name, Startoff Name, Dropoff Name, Paymnt Options, Driver Commission */}
      <div className="flex-1 bg-white shadow-md  flex flex-col gap-4 px-5 py-3">
        {/* City Name, Startoff Name, Dropoff Name, */}
        <div className="flex flex-col gap-2">
          {[
            {
              label: "City",
              placeholder: "Select City",
              dropdownList: local.allCities?.map((city) => ({id: city?._id,name: city?.name})),
              onSelect: (val: string) => {
                setFieldValue("cityName", val);

                const city = local.allCities.find(
                  (city) => city?._id === val
                );
  
                // setFieldValue("cityName", city?.name);
                handlers.setInputState({ key: "city", value: city });
              },
              error: errors.cityName,
              touched: touched.cityName,
              value: values.cityName,
            },
            {
              label: "Startoff Bus Stop",
              placeholder: "Select Bus Stop",
              dropdownList: local.allBusstops?.map((busstop) => ({id: busstop?._id, name: busstop?.name})),
              onSelect: (val: string) => {
                setFieldValue("startOffName", val);

                const busstop = local.allBusstops.find(
                  (busstop) => busstop?._id === val
                );
  
                // setFieldValue("cityName", busstop?.name);
                handlers.setInputState({ key: "pickupBusstop", value: busstop });
              },
              error: errors.startOffName,
              touched: touched.startOffName,
              value: values.startOffName,
            },
            {
              label: "Endpoint Bus Stop",
              placeholder: "Select Bus Stop",
              dropdownList: local.allBusstops?.map((busstop) => ({id: busstop?._id, name: busstop?.name})),
              onSelect: (val: string) => {
                setFieldValue("dropoffName", val);

                const busstop = local.allBusstops.find(
                  (busstop) => busstop?._id === val
                );
  
                // setFieldValue("dropoffName", busstop?.name);
                handlers.setInputState({ key: "dropoffBusstop", value: busstop });
              },
              error: errors.dropoffName,
              touched: touched.dropoffName,
              value: values.dropoffName,
            },
          ].map(
            (
              {
                dropdownList,
                label,
                placeholder,
                error,
                onSelect,
                touched,
                value,
              },
              index
            ) => (
              <SelectInputTile
                label={{
                  className: ``,
                  children: label,
                }}
                select={{
                  list: dropdownList?.map((item) => ({
                    textContent: item?.name,
                    value: String(item?.id),
                  })),
                  trigger: {
                    error,
                    touched,
                    placeholder,
                    value,
                    className: `bg-[#F9F7F8] rounded-[10px] border-[#D7D7D7] border-[1px]`,
                  },
                  select: { onValueChange: onSelect, value },
                }}
                key={index}
              />
            )
          )}
          {/* City Name, Startoff Name, Dropoff Name, */}
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-bold text-black">
            Payment Options
          </div>

          {[
            { label: "Wallet", value: "wallet" },
            { label: "Cash", value: "cash" },
            { label: "Points", value: "points" },
            { label: "Pay Online", value: "online" },
          ].map(({ label, value }, index) => {
            const optionChecked =
              inputs.selectedPaymentOptions.includes(value);

            return (
              <div className="flex justify-between" key={index}>
                <span>{label}</span>

                <Checkbox
                  condition={optionChecked}
                  props={{
                    onClick: () => {
                      if (optionChecked) {
                        handlers.setInputState({
                          key: "selectedPaymentOptions",
                          value: inputs.selectedPaymentOptions.filter(
                            (item) => item !== value
                          ),
                        });
                      } else
                        handlers.setInputState({
                          key: "selectedPaymentOptions",
                          value: [
                            ...inputs.selectedPaymentOptions,
                            value,
                          ],
                        });
                    },
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Payment Options */}

        {/* Driver Commission */}
        <div className="flex justify-between">
          <div className="text-[16px] font-bold text-black">
            Driver Commission
          </div>

          {/* Input */}
          <input
            onChange={({ target: { value } }) => {
              setFieldValue("driverCommission", value);
              handlers.setInputState({key: 'driverCommission', value})
            }}
            value={values.driverCommission}
            className="w-[35px] h-[35px] bg-[#F9F7F8] border-[1px] border-d7d7d7 p-[0.3em] rounded-[10px] active:border-black active:outline focus:border-black focus-within:border-black active:outline-none focus-within:outline-none focus:outline-none"
            type="number"
            placeholder="1%"
          />
          {/* Input */}
        </div>
        {/* Driver Commission */}
      </div>
      {/* City Name, Startoff Name, Dropoff Name, Paymnt Options, Driver Commission */}
    </div>
  );
};

export default CreateStartDropoffPaymentOptions;
