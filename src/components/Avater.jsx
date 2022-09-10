import React from "react";
import { profile_img_placeholder } from "../util/constants";

export default function Avater({
  img,
  size = "w-14 h-14",
  hasBorder,
  className,
}) {
  return (
    <img
      className={`object-cover rounded-full ${
        hasBorder && "border-4 border-primary"
      }  ${size} ${className}`}
      src={img || profile_img_placeholder}
      alt="img"
    />
  );
}
