import React from "react";
import ApointmentState from "../../ApointmentState";
import Avater from "../../Avater";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function ApointmentCardResposive({
  appointment,
  onClick,
  full_name,
  date,
  onAcceptAppointment,
  joinCall,
  status,
  loading,
}) {
  return (
    <div className=" mb-5 bg-white rounded-xl h-20 hidden md:flex items-center justify-between   shadow-md">
      <div className="flex items-center justify-between 500 w-full mx-5">
        <div className="flex items-center cursor-pointer" onClick={onClick}>
          <Avater img={appointment?.user?.profile_img} />
          <p className="font-bold mx-4">{full_name}</p>
        </div>

        <div className="flex">
          <p className="text-slate-500 font-medium mx-4"> 10:00 - 11:00 </p>
          <p className="text-slate-500 font-medium mx-4"> {date} </p>
        </div>
      </div>
      <div className="flex items-center  ">
        <ApointmentState
          onAccept={onAcceptAppointment}
          joinCall={joinCall}
          status={status}
          loading={loading}
        />
        <BiDotsVerticalRounded
          className="h-8 w-8 text-slate-400 cursor-pointer"
          onClick={onClick}
        />
      </div>
    </div>
  );
}
