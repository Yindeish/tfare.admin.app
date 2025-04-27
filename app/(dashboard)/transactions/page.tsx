"use client";
import ApiService from "@/api/api.services";
import SubHeader from "@/components/shared/sub_header";
import { SortCTA } from "@/components/shared/sub_header_components";
import { RowView } from "@/components/transactions/pageComponents";
import { useLayoutContext } from "@/context.state/shared/layout";
import { useModal } from "@/context.state/shared/modal";
import {
  ITransaction,
  ITransactionContextFetchState,
  useTransactionContext,
} from "@/context.state/transaction";
import { useEffect, useState } from "react";

function Page() {
  const { state: layoutState, updateState } = useLayoutContext();
  const {
    state: { fetch, local, inputs },
    handlers,
  } = useTransactionContext();
  const { showModal } = useModal();

  const getTransactions = async ({
    loader,
  }: {
    loader: keyof ITransactionContextFetchState;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: `/user/ride/transactions/all` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        const allTransactions = data?.allTransactions as ITransaction[];
        handlers.setLocalState({
          key: "allTransactions",
          value: allTransactions,
        });
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (local.allTransactions?.length == 0)
      getTransactions({ loader: "fetchingTransactions" });
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-f9f7f8">
      <SubHeader
        leading={
          <div className="w-fit h-full flex gap-[36px]">
            {[
              { name: "ongoing", label: "Ongoing" },
              { name: "completed", label: "Completed" },
            ].map(({ label, name }, index) => (
              <div
                onClick={() =>
                  handlers.setInputState({
                    key: "status",
                    value: name as "ongoing" | "completed",
                  })
                }
                className={`w-fit h-full border-b-[4px] flex items-center justify-center ${
                  inputs.status == name
                    ? "border-b-5D5FEF text-5D5FEF"
                    : "border-b-transparent text-747474 cursor-pointer"
                }`}
                key={index}
              >
                {label}
              </div>
            ))}

            {/* //!filter: By Order, By User */}
            {[
              { name: "user", label: "Users" },
              { name: "driver", label: "Drivers" },
            ].map(({ label, name }, index) => (
              <div
                onClick={() =>
                  handlers.setInputState({ key: "method", value: name })
                }
                className={`w-fit h-fit flex items-center justify-center my-auto ${
                  index === 0
                    ? "border-l-[1px] border-l-d7d7d7 pl-[0.5em] ml-[1em]"
                    : ""
                } ${
                  inputs.method == name
                    ? " text-5D5FEF"
                    : "text-747474 cursor-pointer"
                }`}
                key={index}
              >
                {label}
              </div>
            ))}
            {/* //!filter: By Order, By User */}
          </div>
        }
        trailing={
          <div className="w-fit h-full flex items-center gap-[20px]">
            <SortCTA onClick={() => {}} />
          </div>
        }
        baseContainerClassName="min-h-[74px]"
      />

      <RowView />
    </div>
  );
}

export default Page;
