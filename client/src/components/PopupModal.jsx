import { FaX } from "react-icons/fa6";
import React from "react";

const PopupModal = ({ title, message, buttons }) => {
  const handleButtonClick = (onClick) => {
    if (onClick) onClick();
  };

  return (
    <div className="fixed h-screen bg-[rgba(0,0,0,0.6)] top-0 right-0 bottom-0 left-0 z-[1100]">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white rounded-[10px] py-3">
          <div className=" flex items-center justify-between w-full pb-2 px-3">
            <span className="font-bold text-sm">{title}</span>
            <button>
              <FaX className="w-5 h-5 font-bold text-black" />
            </button>
          </div>
          <div className="border-t border-b" style={{ minWidth: 300 }}>
            <div className="p-3 font-medium text-sm">{message}</div>
          </div>
          <div className="flex justify-between w-full px-3 pt-4 pb-2 gap-2">
            {buttons.map((b, i) => (
              <button
                className="text-gray-dark bg-[#ebebeb] rounded-[5px] text-xs font-bold px-6 py-2"
                key={i}
                style={{ margin: i === 0 ? "0" : "0 0 0 15px" }}
                onClick={() => handleButtonClick(b.onClick)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
