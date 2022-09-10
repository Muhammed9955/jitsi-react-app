import React from "react";
import Avater from "../../Avater";
// import Btn from "../../Btn.component";
import { HiOutlineLogout } from "react-icons/hi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function AccountSectionResponsive({ full_name, img, email }) {
  let navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };
  return (
    <div className="shadow-lg w-24 h-full flex xl:hidden flex-col  justify-between items-start bg-white ">
      <div className="rounded-full border-2 m-auto bg-white w-14 h-14 flex items-center justify-center ">
        <img src={logo} alt="logo" className=" object-contain w-10 h-10 " />
      </div>
      <div className=" flex flex-col items-center justify-between  bg-white w-full h-5/6  shadow-sm rounded-xl mb-5">
        <div className="flex flex-col items-center">
          <Avater img={img} size="w-14 h-14 " hasBorder />
        </div>
        {/* <Btn
          text="Logout"
          onClick={logout}
          width="w-full"
          // icon={<HiOutlineLogout className="w-5 h-5" />}
        /> */}
        <HiOutlineLogout onClick={logout} className="w-8 h-8" />
      </div>
    </div>
  );
}
