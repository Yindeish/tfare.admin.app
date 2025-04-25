import { permanentRedirect } from "next/navigation";


function Page() {

  permanentRedirect('/home') 


  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-[100px] text-white font-black font-sans">SUPER ADMIN <br /> DASHBOARD</div>
      <span className="text-[100px] text-white font-black font-sans">ADMIN</span>
    </div>
  )
}

export default Page;