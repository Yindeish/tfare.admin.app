'use client'
import SubHeader from "@/components/shared/sub_header";
import { SortCTA } from "@/components/shared/sub_header_components";
import { RowView } from "@/components/transactions/pageComponents";
import { useState } from "react";


function Page() {

  const [currentTab, setCurrentTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [currentFilter, setCurrentFilter] = useState<'user' | 'driver'>('user');


  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={(
          <div className="w-fit h-full flex gap-[36px]">

            {[{ name: 'ongoing', label: 'Ongoing' }, { name: 'completed', label: 'Completed' }].map(({ label, name }, index) => (
              <div
                onClick={() => setCurrentTab(name as "ongoing" | "completed")}
                className={`w-fit h-full border-b-[4px] flex items-center justify-center ${currentTab == name ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`} key={index}>{label}</div>
            ))}

            {/* //!filter: By Order, By User */}
            {[{ name: 'user', label: 'Users' }, { name: 'driver', label: 'Drivers' }].map(({ label, name }, index) => (
              <div
                onClick={() => setCurrentFilter(name as "user" | "driver")}
                className={`w-fit h-fit flex items-center justify-center my-auto ${index === 0 ? 'border-l-[1px] border-l-d7d7d7 pl-[0.5em] ml-[1em]' : ''} ${currentFilter == name ? ' text-5D5FEF' : 'text-747474 cursor-pointer'}`} key={index}>{label}</div>
            ))}
            {/* //!filter: By Order, By User */}
          </div>
        )}
        trailing={(
          <div className="w-fit h-full flex items-center gap-[20px]">
            <SortCTA
              onClick={() => { }}
            />
          </div>
        )}
        baseContainerClassName="min-h-[74px]"
      />

      <RowView currentFilter={currentFilter} />
    </div>
  )
}

export default Page;