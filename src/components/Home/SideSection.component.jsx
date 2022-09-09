import React from "react";
import Avater from "../Avater";
import { AiOutlineRight } from "react-icons/ai";
import { getFullName } from "../../util/util-functions";
import { useAuthState } from "../../context/auth";

export default function SideSection({ activeCard, firstAppointment }) {
  const { role } = useAuthState();

  // console.log({ activeCard });
  // console.log({ firstAppointment });
  const full_name = getFullName(
    role,
    activeCard.appointment || firstAppointment
  );

  // console.log({ full_name });
  const profile_img =
    activeCard?.appointment?.user?.profile_img ||
    firstAppointment?.user?.profile_img;
  const blood_group = firstAppointment
    ? firstAppointment.user?.blood_group || "_"
    : activeCard?.appointment?.user?.blood_group || "_";

  return (
    <div className="bg-slate-50 hidden xl:flex w-1/5  flex-col justify-between p-5">
      {activeCard?.appointment || firstAppointment ? (
        <div className="bg-white h-[50vh] py-10 rounded-xl ">
          <div className="flex flex-col items-center ">
            <Avater img={profile_img} size="w-20 h-20" />
            <p className="font-bold text-md mt-2">{full_name}</p>
            <p className="font-bold text-sm text-gray-500 ">
              {activeCard?.appointment?.user?.email}{" "}
            </p>
          </div>
          <div className="border border-b-slate-50 w-10/12 my-5 m-auto" />
          <div className="flex flex-col justify-start items-start px-10 ">
            <div className="flex justify-between items-center w-full mb-4 ">
              <p className="font-bold ">Patient Details</p>
              <AiOutlineRight />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="mb-4 font-medium">Blood </p>
              <p className="mb-4 font-bold text-red-500">{blood_group} </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-[50vh] py-10 rounded-xl text-center flex items-center justify-center">
          <p className="font-bold">No Appointment found</p>
        </div>
      )}
      <div className="h-full bg-white rounded-xl mt-5" />
    </div>
  );
}
