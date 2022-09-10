import React from "react";
import Avater from "../../Avater";
import Btn from "../../Btn.component";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function AccountSection({ full_name, img, email }) {
  let navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };
  return (
    <div className=" h-full   bg-slate-50 hidden xl:flex w-1/5  flex-col  justify-between px-5">
      <div className="rounded-full border-2 m-auto bg-white w-20 h-20 flex items-center justify-center my-5 mr-auto">
        <img src={logo} alt="logo" className=" object-contain w-14 h-14 " />
      </div>
      <div className="shadow-md flex flex-col items-center justify-between  bg-white w-full h-5/6 p-5  rounded-xl mb-5">
        <div className="flex flex-col items-center">
          <Avater img={img} size="w-20 h-20 " hasBorder />
          <p className="font-bold  ">{full_name}</p>
          <p className="font-medium text-slate-400 text-sm">{email || ""} </p>
        </div>
        <Btn
          text="Logout"
          onClick={logout}
          width="w-full"
          // icon={<HiOutlineLogout className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}
