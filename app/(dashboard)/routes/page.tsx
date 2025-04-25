"use client";

import Btn from "@/components/routes/btn";
import CreateStartDropoffPaymentOptions from "@/components/routes/createStartDropoffPaymentOptions";
import CreateUniitfares from "@/components/routes/createUnitFares";
import SelectDropoffs from "@/components/routes/selectDropoffs";
import ViewPresetRoutes from "@/components/routes/viewPresetRoutes";
import ViewRouteBusstops from "@/components/routes/viewRouteBusstops";
import Modal from "@/components/shared/modal";
import { useRouteContext } from "@/context.state/route";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Route() {
  const searchParams = useSearchParams();
  const stage = searchParams.get("stage") as "initial" | "final";
  const router = useRouter();
  const path = usePathname();
  const {
    state: { inputs, fetch, local },
    handlers,
  } = useRouteContext();

  const switchToStage = ({
    path,
    stage,
  }: {
    path: string;
    stage: "initial" | "final";
  }) => {
    router.push(`${path}?stage=${stage}`);
  };

  const routeCreateable = () => {
    const {city, pickupBusstop, dropoffBusstop, selectedPaymentOptions, unitFaresInputs, selectedBusstops, driverCommission} = inputs;

    return city && pickupBusstop && dropoffBusstop && selectedPaymentOptions.length >=1 && unitFaresInputs.length >=1 && selectedBusstops.length >=1 && driverCommission != ''
  }

  //   Updating stage in state
  useEffect(() => {
    handlers.setLocalState({key:'routeCreationStage', value: stage});
  }, []);
  //   Updating stage in state

  useEffect(() => {
    if (local.routeCreationStage || local.routeCreationStage != null)
      switchToStage({ path, stage: local.routeCreationStage });
  }, [local.routeCreationStage]);

  return (
    <div
      className={`w-full h-full flex flex-col bg-f9f7f8 overflow-y-scroll p-[1.5em] ${
        stage ? "pr-[5em]" : ""
      }`}
    >
      {!stage && (
        <div className="w-full h-full grid grid-cols-[7fr_4fr] grid-rows-1 gap-[2em]">
          <div className="col-span-1 row-span-1 bg-red-70">
            <ViewPresetRoutes />
          </div>

          <div className="col-span-1 row-span-1 bg-red-70">
            <ViewRouteBusstops />
          </div>
        </div>
      )}

      {stage && (
        <div className="w-full h-full grid grid-cols-[4fr_0.5fr_4fr] grid-rows-[auto_auto] gap-y-3 justify-between">
          <div className="col-start-1 col-end-2 row-start-1 row-end-2">
            <CreateStartDropoffPaymentOptions />
          </div>

          {/* Spacer */}
          <div className="col-start-2 col-end-3 row-start-1 row-end-2" />
          {/* Spacer */}

          <div className="col-start-3 col-end-4 row-start-1 row-end-2">
            {stage == "initial" ? <SelectDropoffs /> : <CreateUniitfares />}
          </div>

          {/* Create Route Btn */}
          <Btn
            props={{
              children: "Create Route",
              className: `col-start-1 -col-end-1 row-start-2 row-end-3 h-[40px] border-[1px] ${
                routeCreateable()
                  ? "bg-[#5D5FEF] border-[#5D5FEF] cursor-pointer text-white"
                  : "bg-transparent border-[#D7D7D7] text-[#D7D7D7] cursor-not-allowed"
              }`,
            }}
          />
          {/* Create Route Btn */}
        </div>
      )}

       {/* //!Modal */}
       <Modal containerClassName="w-[30em] h-fit min-h-[15em] max-h-[90vh] top-[5vh] p-0 rounded-tl-[0px] rounded-tr-[0px] overflow-hidden cursor-default" containerStyle={{ padding: 0 }} />
      {/* //!Modal */}
    </div>
  );
}

export default Route;
