'use client'
import ApiService from "@/api/api.services";
import Modal from "@/components/shared/modal";
import SubHeader from "@/components/shared/sub_header";
import { TicketGridView } from "@/components/tickets/pageComponents";
import { ITicket, ITicketContextFetchState, useTicketContext } from "@/context.state/ticket";
import { useState } from "react";


function Page() {
    const {state, handlers} = useTicketContext();

    const fetchData = async ({
      loader,
      url,
    }: {
      loader: keyof ITicketContextFetchState;
      url: string;
    }) => {
      let resData, resErr;
      handlers.setFetchState({ key: loader, value: true });
  
      await ApiService.getWithBearerToken({ url: `/ride/${url}` })
        .then((data) => {
          handlers.setFetchState({ key: loader, value: false });
  
          resData = data;
        })
        .catch((err) => {
          resErr = err;
        });
  
        return {resData, resErr}
    };
  
    const getTickets = async ({
      loader,
    }: {
      loader: keyof ITicketContextFetchState;
    }) => {
      fetchData({ loader, url: "/tickets/all" })
        .then(({resData: data, resErr}) => {
          const allTickets = (data as any)?.allTickets as ITicket[];
  
          handlers.setLocalState({ key: "allTickets", value: allTickets });
        })
        .catch((err) => {});
    };



  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={(
          <div className="w-fit h-full flex gap-[36px]">

            {[{ name: 'pending', label: 'Pending' }, { name: 'resolved', label: 'Resolved' }].map(({ label, name }, index) => (
              <div
                onClick={() => handlers.setInputState(name as "pending" | "resolved")}
                className={`w-fit h-full border-b-[4px] flex items-center justify-center ${state.inputs. == name ? 'border-b-5D5FEF text-5D5FEF' : 'border-b-transparent text-747474 cursor-pointer'}`} key={index}>{label}</div>
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
      />

      <TicketGridView currentFilter={currentFilter} />

      {/* //!Modal */}
      <Modal containerClassName="w-[25vw] h-fit p-0 rounded-[20px]" style={{}} />
      {/* //!Modal */}

    </div>
  )
}

export default Page;