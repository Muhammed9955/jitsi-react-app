import React from "react";
import ApointmentCard from "./ApointmentCard/ApointmentCard";
import "../../App.css";
import { getRoles } from "../../util/hooks";
import Spinner from "../Spinner.component";
export default function BodySection({ setActiveCard, appointments, profile }) {
  const { isUser } = getRoles();
  console.log({ appointments });

  if (!appointments)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center  ">
        <Spinner className="text-primary" color="" size={80} />
      </div>
    );

  return (
    <div className="w-full xl:w-3/5 bg-slate-50 p-5  xl:p-10 ">
      <p className="font-bold text-xl mb-5"> Online Appointments </p>

      {isUser && (
        <div className="h-full overflow-y-auto rounded-xl px-0  lg:px-5  ">
          {appointments?.map((i, n) => (
            <ApointmentCard
              key={n}
              appointment={i}
              onClick={() => setActiveCard({ index: n, appointment: i })}
            />
          ))}
        </div>
      )}
      {!isUser && (
        <div className="h-full overflow-y-scroll rounded-xl px-0  lg:px-5 ">
          {appointments?.map((i, n) => (
            <ApointmentCard
              key={n}
              appointment={i}
              onClick={() => setActiveCard({ index: n, appointment: i })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
