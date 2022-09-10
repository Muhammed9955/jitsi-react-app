import React from "react";
import Spinner from "./Spinner.component";

const Btn = ({
  icon,
  text,
  onClick,
  className = "bg-primary rounded-lg  text-base ",
  colorOnHover = "hover:bg-primary ",
  size,
  bgColor,
  textSize,
  textColor = "text-white",
  p = "py-3 px-2",
  rounded = "rounded-lg",
  otherStyles,
  loading,
  width = "w-full",
  border = "",
  m,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-center font-bold flex items-center justify-center hover:cursor-pointer hover:shadow-lg  ${colorOnHover} ${width} ${rounded}  ${textColor} ${size} ${bgColor} ${textSize} ${p} ${m} ${border}  ${otherStyles}  ${className}`}
    >
      <span className={`${text && "ml-2"}`}> {icon && icon}</span>
      {loading ? (
        <Spinner style={{ color: "#FFFFFF" }} size={25} isButton />
      ) : (
        text
      )}
    </button>
  );
};

export default Btn;
