import React from "react";
import { HiInformationCircle } from "react-icons/hi";

export default function Alert({ msg }) {
  return (
    <div
      class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <HiInformationCircle className="text-xl mr-4" />
      <p className="font-medium ">{msg}</p>
    </div>
  );
}
