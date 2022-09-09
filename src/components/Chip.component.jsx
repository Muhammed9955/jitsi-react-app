import React from "react";

export default function Chip({
  bg = "bg-gray-300",
  textColor = "text-gray-600",
  text,
}) {
  return (
    <div className={`rounded-2xl font-medium px-4 py-1 ${bg} ${textColor} `}>
      {text}
    </div>
  );
}
