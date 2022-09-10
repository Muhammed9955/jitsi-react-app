import axios from "axios";

export const getFullName = (role, appointment) => {
  let full_name;
  switch (role) {
    case "user":
      appointment?.doctor
        ? (full_name = `${appointment?.doctor?.first_name} ${appointment?.doctor?.last_name}`)
        : (full_name = `${appointment?.hcp?.first_name} ${appointment?.hcp?.last_name}`);
      break;
    case "doc":
      full_name = `${appointment?.user?.first_name} ${appointment?.user?.last_name}`;
      break;
    case "hcp":
      full_name = `${appointment?.user?.first_name} ${appointment?.user?.last_name}`;
      break;

    default:
      break;
  }
  return full_name;
};

export const getAllAppointments = async (role, dispatch, profile, token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log({ profile });

  if (role === "user") {
    const appointmentsRes = await axios.get("/get-online-appointments");
    // console.log({ appointmentsRes });
    const allAppointments = [
      ...appointmentsRes?.data.online_appointments,
      ...appointmentsRes?.data.hcp_online_appointments,
    ];
    dispatch("GET_APPOINTMENTS", allAppointments);
    console.log({ appointmentsRes });
  } else {
    dispatch("GET_APPOINTMENTS", [
      ...profile.pending_online_appointments,
      ...profile.approved_online_appointments,
    ]);
  }
};
