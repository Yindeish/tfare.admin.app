'use client'
import Modal from "@/components/shared/modal";
import SubHeader from "@/components/shared/sub_header";
import { GridViewCTA, RowViewCTA, SortCTA } from "@/components/shared/sub_header_components";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useState } from "react";
import { RideGridView, ByOrderRowView, ByUserRowView } from "@/components/rides/pageComponents";


function Page() {
  const { state: layoutState, updateState } = useLayoutContext()

  const [currentTab, setCurrentTab] = useState<'ongoing' | 'completed'>('ongoing');
  const [currentFilter, setCurrentFilter] = useState<'order' | 'user'>('order');

  const activeSvgClassName = "w-[20px] h-[20px] text-5D5FEF";
  const inActiveSvgClassName = "w-[20px] h-[20px] text-black";


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
            {[{ name: 'order', label: 'By Order' }, { name: 'user', label: 'By User' }].map(({ label, name }, index) => (
              <div
                onClick={() => setCurrentFilter(name as "order" | "user")}
                className={`w-fit h-fit flex items-center justify-center my-auto ${index === 0 ? 'border-l-[1px] border-l-d7d7d7 pl-[0.5em] ml-[1em]' : ''} ${currentFilter == name ? ' text-5D5FEF' : 'text-747474 cursor-pointer'}`} key={index}>{label}</div>
            ))}
            {/* //!filter: By Order, By User */}
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
        <RideGridView currentFilter={currentFilter} />
        :
        currentFilter === 'order' ?
          <ByOrderRowView />
          :
          <ByUserRowView />
      }

      {/* //!Modal */}
      <Modal containerClassName="w-[97vw] h-[90vh] top-[5vh] p-0 rounded-tl-[20px] rounded-tr-[20px]" />
      {/* //!Modal */}

    </div>
  )
}

export default Page;