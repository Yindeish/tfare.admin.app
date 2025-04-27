'use client'
import ApiService from "@/api/api.services";
import DriverModal from "@/components/drivers/modalComponents";
import KeyValueBlock from "@/components/shared/key_value_block";
import Modal from "@/components/shared/modal";
import StatusBadge from "@/components/shared/status_badge";
import SubHeader from "@/components/shared/sub_header";
import { GridViewCTA, RowViewCTA, SortCTA } from "@/components/shared/sub_header_components";
import homeimages from "@/constants/images/home";
import shared_images from "@/constants/images/shared";
import { IUser } from "@/context.state/auth";
import { IDriversContextFetchState, useDriverContext } from "@/context.state/driver";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useModal } from "@/context.state/shared/modal";
import { Expand } from "@/public/icons/homeSvgs";
import { useEffect, useState } from "react";


function Page() {
  const [currentTab, setCurrentTab] = useState<'all' | 'new'>('all')
  const { state: layoutState, updateState } = useLayoutContext()
  const { state: {fetch, local}, handlers } = useDriverContext()
  const { showModal } = useModal()

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";

  const getDrivers = async ({
    loader,
  }: {
    loader: keyof IDriversContextFetchState;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    // await ApiService.getWithBearerToken({ url: `/user/driver/drivers/all` })
    await ApiService.getWithBearerToken({ url: `/user/rider/riders/all` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const drivers = data?.allDrivers as IUser[];
        handlers.setLocalState({key: 'allDrivers', value: drivers});
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // if(local.allTrips?.length == 0) 
      getDrivers({loader: 'fetchingDrivers'});
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={(
          <div className="w-fit h-full flex gap-[36px]">

            {[{ name: 'all', label: 'All Drivers' }, { name: 'new', label: 'New Drivers' }].map(({ label, name }, index) => (
              <div
                onClick={() => setCurrentTab(name as "all" | "new")}
                className={`w-fit h-full border-b-[4px] flex items-center justify-center ${currentTab == name ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`} key={index}>{label}</div>
            ))}
          </div>
        )}
        trailing={(
          <div className="w-fit h-full flex items-center gap-[20px]">
            <GridViewCTA
              onClick={() => updateState({ key: 'view', value: 'grid' })}
              svgClassName={layoutState.view === 'grid' ? activeSvgClassName : inActiveSvgClassName}
            />

            <RowViewCTA
              onClick={() => updateState({ key: 'view', value: 'row' })}
              svgClassName={layoutState.view === 'row' ? activeSvgClassName : inActiveSvgClassName}
            />

            <SortCTA
              onClick={() => { }}
            />
          </div>
        )}
      />

      {layoutState.view === 'grid' ?
        // !Grid View
        (<div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8 overflow-y-scroll">

          <div className="w-full h-fit grid grid-cols-3 gap-[1em]">
            {local.allDrivers?.map((driver, index) => (
              <div className="col-span-1 w-full h-[40vh] flex flex-col gap-[1em] rounded-[20px] p-[1.3em] bg-white" style={{ boxShadow: '0px 0px 10px 0px #00000010' }} key={index}>

                <div className="w-full h-fit flex items-start justify-between">
                  <img className="w-[50px] h-[50px] rounded-full" src={driver?.picture || driver?.avatar} alt="" />

                  <div className="w-[70%] flex flex-col gap-[12px]">
                    <span className="font-medium text-[14px] text-black">{driver?.fullName}</span>
                    <span className="font-normal text-[12px] text-747474">#{driver?._id?.slice(0, 10)}{'..'}</span>
                  </div>

                  <Expand onClick={() => {
                    handlers.setLocalState({
                      key: 'selectedDriver', value: driver
                    })
                    showModal(<DriverModal />, false)
                  }} className="w-[18px] h-[18px] text-747474 cursor-pointer" />
                </div>

                <KeyValueBlock
                  keyValueArray={[
                    { key: 'Phone Number', value: driver?.fullName },
                    { key: 'Email Address', value: driver?.email },
                    { key: 'Current Earnings', value: '₦ -' },
                  ]}
                  containerClassName="gap-[0.75em] pb-[1em] border-b-[0.7px] border-b-d7d7d7"
                  keyClassName="font-normal text-[14px] text-747474"
                  valueClassName="font-normal text-[14px] text-black"
                />

                <div className="w-full h-fit flex items-center justify-between">
                  <span>Status</span>

                  <StatusBadge status="active" />
                </div>
              </div>
            ))}
          </div>

        </div>)
        // !Grid View
        :
        // !Row View
        (<div className="w-[97%] h-[calc(100%-74px)] flex flex-col gap-[1em] mx-auto py-[1em] bg-f9f7f8">
          {/* //!Header */}
          <div className="w-full h-[70px] grid grid-cols-[6fr_6fr_3fr_3fr_2fr] gap-[10px] items-center bg-FCDDEC border-[0.7px] border-d7d7d7 rounded-[20px] px-[0.5em]">
            {/* //!Drivername, UserID */}
            <div className="col-span-1 w-full h-fit flex items-center gap-[0.5em]">
              <svg className="w-[50px] h-[50px]" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25.5" cy="25" r="24.65" fill="#F9F7F8" stroke="#D7D7D7" strokeWidth="0.7" />
                <path d="M25.5 24C27.7091 24 29.5 22.2091 29.5 20C29.5 17.7909 27.7091 16 25.5 16C23.2909 16 21.5 17.7909 21.5 20C21.5 22.2091 23.2909 24 25.5 24Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23.5 26H27.5C30.26 26 32.5 28.24 32.5 31V32C32.5 33.1 31.6 34 30.5 34H20.5C19.4 34 18.5 33.1 18.5 32V31C18.5 28.24 20.74 26 23.5 26Z" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="w-fit h-fit flex flex-col gap-[12px]">
                <span className="font-medium text-[14px] text-black">Driver name</span>

                <span className="font-medium text-[12px] text-747474">UserID</span>
              </div>
            </div>
            {/* //!Drivername, UserID */}

            {/* //!Email */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474">Email Address</div>
            {/* //!Email */}

            {/* //!Phone Number */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474">Phone Number</div>
            {/* //!Phone Number */}

            {/* //!Current Earnings */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474">Current Earnings</div>
            {/* //!Current Earnings */}

            {/* //!Status */}
            <div className="col-span-1 w-full h-fit font-medium text-[14px] text-747474">Status</div>
            {/* //!Status */}
          </div>
          {/* //!Header */}

          {/* //!Body */}
          <div className="w-full h-[calc(100%-70px)] flex flex-col gap-[0.3em] rounded-[20px] bg-white border-[0.7px] border-d7d7d7 overflow-y-scroll">

            {local?.allDrivers?.map((driver, index) => (
              <div className="w-full h-[50px] grid grid-cols-[6fr_6fr_3fr_3fr_2fr] gap-[10px] items-center py-[0.3em] px-[0.5em]" key={index}>
                {/* //!User Avatar,Username,User ID, Expand CTA */}
                <div className="col-span-1 w-full h-fit flex items-center gap-[0.5em]">
                  <img className="w-[50px] h-[50px] rounded-full" src={driver?.picture || driver?.avatar} alt="" />

                  <div className="w-[75%] h-fit flex flex-col gap-[12px]">
                    <span className="font-medium text-[14px] text-black">{driver?.fullName}</span>

                    <span className="font-medium text-[12px] text-747474">#{driver?._id?.slice(0, 10)}{'..'}</span>
                  </div>

                  <Expand onClick={() => {
                    handlers.setLocalState({
                      key: 'selectedDriver', value: driver
                    })
                    showModal(<DriverModal />, false)
                  }} className="w-[18px] h-[18px] cursor-pointer" />
                </div>
                {/* //!User Avatar,Username,User ID, Expand CTA */}

                {/* //!Email Address */}
                <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black">{driver?.email}</div>
                {/* //!Email Address */}

                {/* //!Phone Number */}
                <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black">{driver?.phoneNumber?.toString()}</div>
                {/* //!Phone Number */}

                {/* //!Current Earnings*/}
                <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black">₦ {'-'}</div>
                {/* //!Current Earnings*/}

                {/* //!Status*/}
                <div className="col-span-1 w-full h-fit font-medium text-[14px] text-black">
                  <StatusBadge status="active" className="text-[12px]" dotClassName="w-[10px] h-[10px]" />
                </div>
                {/* //!Status*/}
              </div>
            ))}

          </div>
          {/* //!Body */}
        </div>)
        // !Row View
      }

      {/* //!Modal */}
      <Modal containerClassName="w-[97vw] h-[90vh] top-[5vh] p-0 rounded-tl-[20px] rounded-tr-[20px]" />
      {/* //!Modal */}


    </div>
  )
}

export default Page;