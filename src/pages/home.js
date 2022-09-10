import React, { useState } from "react";
import { useAuthState } from "../context/auth";

import Spinner from "../components/Spinner.component";
import AccountSection from "../components/Home/AccountSection/AccountSection";
import BodySection from "../components/Home/BodySection.component";
import SideSection from "../components/Home/SideSection.component";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import dayjs from "dayjs";

export default function Home() {
  const {
    userData,
    profile,
    role,
    appointments: allAppointments,
    loading,
  } = useAuthState();
  const [activeCard, setActiveCard] = useState({
    index: 0,
  });
  let navigate = useNavigate();

  console.log({ profile });
  console.log({ userData });
  console.log({ allAppointments });

  const full_name = `${userData?.first_name} ${userData?.last_name}` || "";
  const token = Cookies.get("token");

  if (!token) {
    navigate("/login");
  }
  if (loading)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center  ">
        <Spinner className="text-primary" color="" size={80} />
      </div>
    );

  return (
    <div className="w-full h-full bg-slate-50">
      {/* left section */}
      <div className="w-full h-screen flex bg-white">
        <AccountSection
          img={userData?.profile_img}
          full_name={full_name}
          email={userData?.email}
        />
        {/* mid section */}
        <BodySection
          profile={profile}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          role={role}
          appointments={allAppointments}
        />
        <SideSection
          userData={userData}
          full_name={full_name}
          activeCard={activeCard}
          firstAppointment={allAppointments[0]}
        />
      </div>
    </div>
  );
}
