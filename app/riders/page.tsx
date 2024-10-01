import SubHeader from "@/components/shared/sub_header";


function Page() {


  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={(
          <div className="w-fit h-full flex gap-[36px]">
            <div className={`w-fit h-full border-b-[4px] flex items-center justify-center ${true ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`}>All Rides</div>
            <div className={`w-fit h-full border-b-[4px] flex items-center justify-center ${false ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`}>New Rides</div>
          </div>
        )}
        trailing={(
          <div className="w-fit h-full flex gap-[36px]">
            <div className={`w-fit h-full border-b-[4px] flex items-center justify-center ${true ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`}>All Rides</div>
            <div className={`w-fit h-full border-b-[4px] flex items-center justify-center ${false ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`}>New Rides</div>
          </div>
        )}
      />

      <div className="w-[85%] h-[calc(100%-74px)] mx-auto py-[1em] bg-f9f7f8">

        <div className="w-full h-full grid grid-cols-3 grid-rows-2"></div>

      </div>
    </div>
  )
}

export default Page;