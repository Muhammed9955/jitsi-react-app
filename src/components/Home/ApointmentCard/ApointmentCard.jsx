import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRoles } from "../../../util/hooks";
import { getFullName } from "../../../util/util-functions";

import CustomizedSnackbar from "../../Snackbar";
import ApointmentCardComp from "./ApointmentCard.component";
import ApointmentCardResposive from "./ApointmentCardResposive.component";

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
      <ApointmentCardComp
        appointment={appointment}
        onClick={onClick}
        full_name={full_name}
        date={date}
        onAcceptAppointment={onAcceptAppointment}
        joinCall={joinCall}
        status={status}
        loading={loading}
      />
      <ApointmentCardResposive
        appointment={appointment}
        onClick={onClick}
        full_name={full_name}
        date={date}
        onAcceptAppointment={onAcceptAppointment}
        joinCall={joinCall}
        status={status}
        loading={loading}
      />
      {errMsg && (
        <CustomizedSnackbar open={open} setOpen={setOpen} msg={errMsg} />
      )}
    </>
  );
}
