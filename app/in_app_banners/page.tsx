'use client'
import in_app_images from "@/constants/images/in_app_banners";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Topup } from "@/public/icons/shared/modalSvgs";
import { ToggleBtn } from "@/components/drivers/modalComponents";
import Modal from "@/components/shared/modal";
import { useModal } from "@/context.state/shared/modal";
import BannersModal from "@/components/in_app_banners/modalComponents";


function Page() {
  const { showModal } = useModal()

  const addNewBanner = () => {
    showModal(<BannersModal />, false)
  }


  return (
    <div className="w-full h-full bg-f9f7f8 flex flex-col gap-[3em] pl-[2em]">

      {/* //!Active Banners */}
      <div className="w-full h-full flex flex-col gap-[2em]">
        <span className="font-medium text-[32px] leading-[38px] text-black">Active Banners</span>

        <div className="w-full h-full grid grid-cols-3 gap-[1em]">

          {Array.from({ length: 1 }).map((_, index) => (
            <div className="w-full h-[30vh] bg-white rounded-[10px] flex flex-col justify-between p-[1em]" style={{ boxShadow: '0px 0px 10px #00000010' }} key={index}>

              <div className="w-full h-[75%] bg-FFAE02 rounded-[10px] flex items-center justify-center gap-[1em]">
                <img className="w-[70px] h-[70px]" src={in_app_images.yellow_car.src} alt="" />

                <div className="flex flex-col gap-[0.5em] w-[60%]">
                  <span className="font-extrabold text-[27px] leading-[27px] text-black">Order a Ride</span>

                  <span className="font-normal text-[14px] leading-[17px] text-2C333C">Get 15% discount on all your rides today!</span>
                </div>
              </div>

              <div className="w-full h-[25%] flex items-center justify-between">
                <ToggleBtn on={true} onClick={() => { }} className="sticky" />

                <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.35" y="0.35" width="44.3" height="44.3" rx="22.15" fill="white" />
                  <rect x="0.35" y="0.35" width="44.3" height="44.3" rx="22.15" stroke="#D7D7D7" strokeWidth="0.7" />
                  <path d="M28.75 17.083L28.2336 25.4373C28.1016 27.5717 28.0357 28.6389 27.5007 29.4063C27.2361 29.7856 26.8956 30.1058 26.5006 30.3463C25.7017 30.833 24.6325 30.833 22.4939 30.833C20.3526 30.833 19.2819 30.833 18.4825 30.3454C18.0873 30.1044 17.7467 29.7837 17.4822 29.4037C16.9474 28.6352 16.8829 27.5664 16.7538 25.429L16.25 17.083" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 17.0837H30M25.8797 17.0837L25.3109 15.9101C24.933 15.1305 24.744 14.7408 24.4181 14.4977C24.3458 14.4437 24.2693 14.3958 24.1892 14.3542C23.8283 14.167 23.3951 14.167 22.5287 14.167C21.6407 14.167 21.1967 14.167 20.8297 14.3621C20.7484 14.4053 20.6708 14.4552 20.5977 14.5113C20.268 14.7642 20.0839 15.1683 19.7155 15.9764L19.2108 17.0837" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

              </div>
            </div>
          ))}

          {/* //!Add New Banner */}
          <div onClick={addNewBanner} className="w-fit h-fit bg-white flex items-center gap-[10px] justify-center rounded-[10px] px-[1.5em] py-[0.75em] cursor-pointer" style={{ boxShadow: '0px 0px 10px #00000010' }}>
            <AiOutlinePlusCircle className="w-[24px] h-[24px] text-black fill-black-700" />

            <span className="font-medium text-[14px] leading-[18px] text-black">Add New Banner</span>
          </div>
          {/* //!Add New Banner */}

        </div>
      </div>
      {/* //!Active Banners */}

      {/* //!Inactive Banners */}
      <div className="w-full h-full flex flex-col gap-[2em]">
        <span className="font-medium text-[32px] leading-[38px] text-black">Inactive Banners</span>

        <div className="w-full h-full grid grid-cols-3 gap-[1em]">

          {[
            { bgColor: '#5D5FEF', ctaBgColor: '#EF5DA8', ctaTextColor: 'white', text: 'Accept Trips', textColor: 'white' },
            { bgColor: '#009FB7', ctaBgColor: '#FFAE02', ctaTextColor: 'black', text: 'Book a  Trip', textColor: 'black' },
          ].map(({ bgColor, ctaTextColor, ctaBgColor, text, textColor }, index) => (
            <div className="w-full h-[30vh] bg-white rounded-[10px] flex flex-col justify-between p-[1em]" style={{ boxShadow: '0px 0px 10px #00000010' }} key={index}>

              <div className="w-full h-[75%] rounded-[10px] flex items-center justify-center gap-[1em] p-[1em]" style={{ backgroundColor: bgColor }}>
                <img className="w-[70px] h-[70px]" src={in_app_images.yellow_car.src} alt="" />

                <div className="flex flex-col gap-[0.5em] w-fit">
                  <span className="font-extrabold text-[27px] leading-[27px]" style={{ color: textColor }}>{text}</span>
                </div>

                <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center" style={{ backgroundColor: ctaBgColor }}>
                  <svg className="w-[15px] h-[28px]" style={{ color: ctaTextColor }} viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.734904 2.37232L12.0014 13.9302L0.734904 25.4881C0.533202 25.6946 0.420281 25.9718 0.420281 26.2604C0.420281 26.5491 0.533202 26.8263 0.734904 27.0328C0.832871 27.1328 0.949804 27.2122 1.07886 27.2665C1.20791 27.3207 1.34648 27.3486 1.48647 27.3486C1.62645 27.3486 1.76502 27.3207 1.89407 27.2665C2.02313 27.2122 2.14006 27.1328 2.23803 27.0328L14.226 14.7373C14.4365 14.5213 14.5543 14.2317 14.5543 13.9302C14.5543 13.6287 14.4365 13.3391 14.226 13.1231L2.24034 0.827572C2.1423 0.726877 2.02508 0.646845 1.8956 0.592197C1.76612 0.53755 1.62701 0.509396 1.48647 0.509396C1.34593 0.509396 1.20681 0.53755 1.07733 0.592197C0.947851 0.646845 0.830631 0.726877 0.73259 0.827572C0.530889 1.03407 0.417969 1.31129 0.417969 1.59995C0.417969 1.88861 0.530889 2.16582 0.73259 2.37232H0.734904Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>

              <div className="w-full h-[25%] flex items-center justify-between">
                <ToggleBtn on={true} onClick={() => { }} className="sticky" />

                <svg className="w-[45px] h-[45px]" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.35" y="0.35" width="44.3" height="44.3" rx="22.15" fill="white" />
                  <rect x="0.35" y="0.35" width="44.3" height="44.3" rx="22.15" stroke="#D7D7D7" strokeWidth="0.7" />
                  <path d="M28.75 17.083L28.2336 25.4373C28.1016 27.5717 28.0357 28.6389 27.5007 29.4063C27.2361 29.7856 26.8956 30.1058 26.5006 30.3463C25.7017 30.833 24.6325 30.833 22.4939 30.833C20.3526 30.833 19.2819 30.833 18.4825 30.3454C18.0873 30.1044 17.7467 29.7837 17.4822 29.4037C16.9474 28.6352 16.8829 27.5664 16.7538 25.429L16.25 17.083" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 17.0837H30M25.8797 17.0837L25.3109 15.9101C24.933 15.1305 24.744 14.7408 24.4181 14.4977C24.3458 14.4437 24.2693 14.3958 24.1892 14.3542C23.8283 14.167 23.3951 14.167 22.5287 14.167C21.6407 14.167 21.1967 14.167 20.8297 14.3621C20.7484 14.4053 20.6708 14.4552 20.5977 14.5113C20.268 14.7642 20.0839 15.1683 19.7155 15.9764L19.2108 17.0837" stroke="#747474" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

              </div>
            </div>
          ))}

        </div>
      </div>
      {/* //!Inactive Banners */}

      {/* //!Modal */}
      <Modal containerClassName="w-[25vw] h-fit p-0 rounded-[20px]" />
      {/* //!Modal */}
    </div>
  )
}

export default Page;