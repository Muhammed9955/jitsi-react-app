import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoles } from "../../util/hooks";
import { getFullName } from "../../util/util-functions";
import ApointmentState from "../ApointmentState";
import Avater from "../Avater";
// import Modal from "../Modal.component";
import CustomizedSnackbar from "../Snackbar";

export default function ApointmentCard({ appointment, onClick }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDoc, isUser, role } = getRoles();
  const [errMsg, setErrMsg] = useState(null);
  const [status, setStatus] = useState(appointment.status);

  let navigate = useNavigate();
  let location = useLocation();
  console.log({ location });
  console.log({ window_location: window.location });

  const full_name = getFullName(role, appointment);

  const date = dayjs(appointment?.date_time_stamp).format("MMM D, YYYY");
  console.log({ appointment });
  //   console.log({ full_name });

  //   onAcceptAppointment
  const onAcceptAppointment = async () => {
    try {
      const req = isDoc
        ? "/approve-online-appointment"
        : "/approve-online-appointment-hcp";
      const onAcceptAppointmentRes = await axios.post(req, {
        appointment_id: appointment?.id,
      });
      console.log({ onAcceptAppointmentRes });
      if (onAcceptAppointmentRes.data.message === "success") {
        setStatus(1);
      }
    } catch (err) {
      console.log({ err });
    }
  };
  //   joinCall
  const joinCall = async () => {
      
    if (isUser && !appointment.isDoctorJoin) {
      setErrMsg("Sorry doctor hasn't entered yet, please try again later!");
      setOpen(true);
      return;
    } else if (isUser && appointment.isDoctorJoin && appointment.isUserJoin) {
      setErrMsg("Sorry meeting has already started ");
      setOpen(true);
      return;
    }
    try {
      let req;
      switch (role) {
        case "user":
          req = appointment?.hcp ? "/join-call-with-hcp" : "/join-call-with-dr";
          break;
        case "doc":
          req = "/join-call-with-pt-as-dr";
          break;
        case "hcp":
          req = "/join-call-with-pt-as-hcp";
          break;
        default:
          break;
      }
      setLoading(true);
      const onJoinRes = await axios.post(req, {
        appointment_id: appointment?.id,
      });
      setLoading(false);
      console.log({ onJoinRes });
      if (onJoinRes.data.message === "fail") {
        setErrMsg(onJoinRes.data.error);
        setOpen(true);
        return;
      } else if (onJoinRes.data.message === "success") {
        const reqParam = appointment?.hcp ? "HCP" : "DOC";
        navigate(`/room/${appointment?.id}/${reqParam}`);
      }
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  return (
    <>
      <div className="mb-5 bg-white rounded-xl h-20 flex items-center justify-between   shadow-sm">
        <div className="flex items-center justify-between 500 w-full mx-5">
          <div className="flex items-center cursor-pointer" onClick={onClick}>
            <Avater img={appointment?.user?.profile_img} />
            <p className="font-bold mx-4">{full_name}</p>
          </div>
          {/* <Chip
          text={appointment?.type}
          //   bg="bg-green-100"
          //   textColor="text-green-600"
        /> */}
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
      {errMsg && (
        // <Modal showModal={showModal} setShowModal={setShowModal} time={5000000}>
        //   <div className="w-96 h-20 p-5">
        //     <p>cscds</p>
        //   </div>
        // </Modal>
        <CustomizedSnackbar open={open} setOpen={setOpen} msg={errMsg} />
      )}
    </>
  );
}
