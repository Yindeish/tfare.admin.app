import shared_images from "@/constants/images/shared";
import { useAuthContext } from "@/context.state/auth";
import { IoChevronDownSharp } from "react-icons/io5";
import MenuTile from "./menuTile";

function HeaderUserBlock() {
  const {
    state: {
      local: { user },
    },
    handlers: { signout },
  } = useAuthContext();

  return (
    <div className="w-fit h-fit">
      <MenuTile
        triggerProps={{
          children: (
            <div className="flex items-center gap-[1em] w-fit h-fit cursor-pointer">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={user?.picture}
                alt=""
              />

              <div className="flex flex-col items-start gap-[0.3em] ">
                <span className="font-bold text-[16px] text-black">
                  {user?.fullName}
                </span>
                <span className="font-normal text-[16px] text-747474">
                  {user?.email}
                </span>
              </div>

              <IoChevronDownSharp className="text-747474 w-[30px] h-[20px]" />
            </div>
          ),
        }}
        list={[
          {
            children: (
              <span className="text-[16px] font-normal text-CF0707 pt-[1em] cursor-pointer">
                Logout
              </span>
            ),
            onClick: () => {
              signout();
            },
        }
        ]}
      />
    </div>
  );
}

export default HeaderUserBlock;
