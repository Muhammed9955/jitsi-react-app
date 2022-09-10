import React from "react";
import ApointmentState from "../../ApointmentState";
import Avater from "../../Avater";

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
    <div className="flex flex-col md:hidden justify-between items-center  bg-white rounded-xl h-auto p-3 mt-14 shadow-md">
      {/* <div className="flex items-center cursor-pointer " onClick={onClick}>
        <Avater img={appointment?.user?.profile_img} />
        <p className="font-bold mx-4">{full_name}</p>
    </div> */}
      <Avater
        img={appointment?.user?.profile_img}
        hasBorder
        className="w-20 h-20 -mt-12"
      />
      <p className="font-bold mx-4">{full_name}</p>

      <p className="text-slate-500 font-medium mb-2"> 10:00 - 11:00 </p>
      <p className="text-slate-500 font-medium mb-2"> {date} </p>
      <ApointmentState
        onAccept={onAcceptAppointment}
        joinCall={joinCall}
        status={status}
        loading={loading}
      />
    </div>
  );
}
