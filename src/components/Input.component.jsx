import React from "react";

export default function Input({
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
  icon,
  name,
}) {
  return (
    <div className="flex  flex-col  items-start  w-full mb-6 overflow-hidden 	">
      {label && <p className={`text-md  font-bold mb-2 `}>{label} </p>}
      <div
        className={` ${
          !value?.length > 0 && error ? "border-red-600" : "border-gray-200"
        } flex justify-start items-center border-2 rounded-lg py-2 px-3 w-full bg-white `}
      >
        {icon && icon}
        <input
          className="outline-0 bg-transparent w-full mx-2"
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          // onChange={(e) => setValue(e.target.value)}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
