import React from "react";
import { RiPlayCircleFill } from "react-icons/ri";
import { MdPendingActions } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { useAuthState } from "../context/auth";
import Spinner from "./Spinner.component";

export default function ApointmentState({
  status = 0,
  onAccept,
  onReject,
  joinCall,
  loading,
}) {
  const { role } = useAuthState();
  let style = {};
  const pendingState =
    role === "user"
      ? {
          bgColor: "bg-slate-200 border",
          textColor: "text-gray-600",
          icon: <MdPendingActions className="text-gray-600 mx-1 w-5 h-5 " />,
          text: "Pneding",
        }
      : {
          bgColor: "bg-green-200 border",
          textColor: "text-green-500",
          icon: <BiCheckCircle className="text-green-500 mx-1 w-5 h-5 " />,
          text: "Approve",
          onClick: onAccept,
        };
  switch (status) {
    case 0:
      style = pendingState;
      break;
    case 1:
      style = {
        bgColor: "bg-black border",
        textColor: "text-white",
        icon: <RiPlayCircleFill className="text-white mx-1 w-5 h-5 " />,
        text: "Start",
        onClick: joinCall,
      };
      break;
    case 2:
      style = {
        bgColor: "bg-green-50 border",
        textColor: "text-green-500",
        icon: <BiCheckCircle className="text-green-500 mx-1 w-5 h-5 " />,
        text: "Completed",
      };
      break;
    case 3:
      style = {
        bgColor: "bg-red-50 border",
        textColor: "text-red-500",
        icon: <TiCancel className="text-red-500 mx-1 w-5 h-5 " />,
        text: "Canceled",
      };
      break;
    default:
      style = pendingState;
      break;
  }
  return (
    <div
      className={`rounded-xl px-6 py-3  flex items-center justify-center cursor-pointer hover:shadow-lg mx-4 ${style.bgColor} w-[150px]`}
      onClick={() => style.onClick()}
    >
      {loading ? (
        <Spinner size={20} />
      ) : (
        <>
          {" "}
          {style.icon}
          <p className={`font-medium ${style.textColor}`}>{style.text} </p>
        </>
      )}
    </div>
  );
}
