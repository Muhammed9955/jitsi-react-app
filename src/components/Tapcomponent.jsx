import React from "react";

export default function Tap({ icon, text, isActive, onClick, activeIndex }) {
  return (
    <div
      className={` font-bold text-white text-xl flex justify-center items-center w-full cursor-pointer ${
        isActive ? "bg-white" : "bg-primary "
      } `}
      onClick={onClick}
    >
      {icon}
      {/* <Component /> */}
      <p className={`mx-1 ${isActive ? "text-primary" : "text-white"} `}>
        {text}{" "}
      </p>
    </div>
  );
}
