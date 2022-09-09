import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function Modal({
  showModal,
  setShowModal,
  children,
  time,
  isCustomStyle,
}) {
  useEffect(() => {
    time &&
      setTimeout(() => {
        setShowModal(false);
      }, time);
  }, [showModal, setShowModal, time]);

  return (
    <>
      {showModal && !isCustomStyle && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-10/12 sm:w-auto my-6 mx-auto max-w-3xl">
              <div className=" p-5 border-0 rounded-2xl shadow-lg relative  w-full bg-white outline-none focus:outline-none">
                <RiCloseFill
                  className={`absolute top-4 left-4 w-6 h-6 hover:cursor-pointer hover:bg-gray-200 rounded-lg `}
                  onClick={() => setShowModal(false)}
                />
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {showModal && isCustomStyle && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          {children}
        </div>
      )}
    </>
  );
}
