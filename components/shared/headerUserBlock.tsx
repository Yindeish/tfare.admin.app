import shared_images from "@/constants/images/shared";
import { IoChevronDownSharp } from "react-icons/io5";



function HeaderUserBlock() {


    return (
        <div className="flex items-center gap-[1em] w-fit h-fit cursor-pointer">
            <img className="w-[50px] h-[50px] rounded-full" src={shared_images.user_profile_image.src} alt="" />

            <div className="flex flex-col gap-[0.3em] ">
                <span className="font-bold text-[16px] text-black">{'John Shane'}</span>
                <span className="font-normal text-[16px] text-747474">{'johnshane@gmail.com'}</span>
            </div>

            <IoChevronDownSharp className="text-747474 w-[30px] h-[20px]" />
        </div>
    )
}

export default HeaderUserBlock;