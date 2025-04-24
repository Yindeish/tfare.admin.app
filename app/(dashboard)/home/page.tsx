"use client";

import ApiService from "@/api/api.services";
import homeimages from "@/constants/images/home";
import { useHomeContext } from "@/context.state/home";
import {
  Buckets,
  Bus,
  CarProceed,
  Expand,
  HeadPhone,
} from "@/public/icons/homeSvgs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Home() {
  const router = useRouter();
  const {
    state: {
      local: { activeRides, activeTrips, pendingTickets, totalEarnings },
      fetch
    },
    handlers,
  } = useHomeContext();

  const fetchData = async ({
    loader,
    url,
  }: {
    loader:
      | "fetchingEarnings"
      | "fetchingRides"
      | "fetchingTickets"
      | "fetchingTrips";
    url: string;
  }) => {
    handlers.setFetchState({ key: loader, value: true });

    await ApiService.getWithBearerToken({ url: `/user/${url}` })
      .then((data) => {
        handlers.setFetchState({ key: loader, value: false });
        return data?.data;
      })
      .catch((err) => {});
  };

  const getAllActiveRides = async () => {
    const data = (await fetchData({
      url: "/ride/activeRides",
      loader: "fetchingRides",
    })) as any;
    handlers.setLocalState({ key: "activeRides", value: data?.activeRides || 0 });
  };

  const getAllActiveTrips = async () => {
    const data = (await fetchData({
      url: '/trip/activeTrips',
      loader: "fetchingTrips",
    })) as any;
    handlers.setLocalState({ key: "activeTrips", value: data?.activeTrips || 0 });
  };

  const getAllPendingTicktets = async () => {
    const data = (await fetchData({
      url: '/ride/pendingTickets',
      loader: "fetchingTickets",
    })) as any;
    handlers.setLocalState({
      key: "pendingTickets",
      value: data?.pendingTickets || 0,
    });
  };

  const getAllEarnings = async () => {
    const data = (await fetchData({
      url: '/ride/totalEarnings',
      loader: "fetchingEarnings",
    })) as any;
    handlers.setLocalState({
      key: "totalEarnings",
      value: data?.totalEarnings || 0,
    });
  };

  useEffect(() => {
    if (activeRides == 0) getAllActiveRides();
    if (activeTrips == 0) getAllActiveTrips();
    if (pendingTickets == 0) getAllPendingTicktets();
    if (totalEarnings == 0) getAllEarnings();
  }, []);

  return (
    <div className="w-full h-full p-[2em] bg-f9f7f8 grid grid-cols-4 grid-rows-[27%_73%] gap-[24px]">
      {/* //!Shortcuts, Active Rides, Active Trips, Pending Tickets, Total Earnings */}
      {[
        {
          title: "Active Rides",
          value: activeRides,
          link: "/rides",
          icon: <CarProceed className="text-EF5DA8 w-[29px] h-[25px]" />,
          loading: fetch.fetchingRides
        },
        {
          title: "Active trips",
          value: activeTrips,
          link: "/trips",
          icon: <Bus className="text-EF5DA8 w-[30px] h-[30px]" />,
          loading: fetch.fetchingTrips
        },
        {
          title: "Pending Tickets",
          value: pendingTickets,
          link: "/tickets",
          icon: <HeadPhone className="text-EF5DA8 w-[30px] h-[25px]" />,
          loading: fetch.fetchingTickets
        },
        {
          title: "Total Earnings",
          value: totalEarnings,
          link: "/earnings",
          icon: <Buckets className="text-EF5DA8 w-[30px] h-[30px]" />,
          loading: fetch.fetchingEarnings
        },
      ].map(({ icon, title, value, link, loading }, index) => (
        <div
          className="col-span-1 row-span-1 w-full h-full rounded-[10px] flex flex-col gap-[10px] p-[0.85em] bg-white"
          style={{ boxShadow: "0px 0px 10px 0px #00000010" }}
          key={index}
        >
          <div className="w-full flex items-center justify-between">
            {icon}

            {/* <span onClick={() => router.push(link)}> */}
            <Link href={link}>
              <Expand className="w-[18px] h-[18px] text-747474 cursor-pointer" />
            </Link>
          </div>

          <span className="text-[22px] leading-[22px] font-normal text-black">
            {title}
          </span>

         {loading? (<AiOutlineLoading3Quarters className="w-[30px] h-[30px] animate-spin" />) : <span className="text-[48px] leading-[40px] font-normal text-black">
            {value}
          </span>}
        </div>
      ))}
      {/* //!Shortcuts, Active Rides, Active Trips, Pending Tickets, Total Earnings */}

      {/* //!Map */}
      <div className="col-start-1 col-span-full row-start-2 -row-end-1 bg-white rounded-[10px] flex flex-col gap-[10px] py-[0.85em] px-[1.2em]">
        <div className="flex items-center justify-between">
          <span className="font-medium text-[32px] text-black">City Map</span>

          <span className="bg-white rounded-[10px] border-[0.7px] border-d7d7d7 flex items-center gap-[10px] p-[0.5em] cursor-pointer">
            <span className="font-medium text-[14px] text-black">Trips</span>

            <GoChevronDown className="text-747474 w-[25px] h-[18px]" />
          </span>
        </div>

        <img
          className="w-full h-[85%] rounded-[15px]"
          src={homeimages.map.src}
          alt=""
        />
      </div>
      {/* //!Map */}
    </div>
  );
}

export default Home;
