import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const Tab = {
  "Store Settings": {
    tag: "STORE",
    children: [
      {
        "store info": "store_info",
        "services rendered": "store_services",
      },
    ],
  },
  "Payment & Finances": {
    tag: "FINANCE",
    children: [
      {
        "store info": "payment",
        "services rendered": "payment_services",
      },
    ],
  },
  // "User Edits",
  // "Deletions",
  // "View Logins",
  // "Driver Locations",
  // "Payroll",
  // "Tips",
  // "Completed Lessons",
};
function Sidebar({ onClick }) {
  const [activeTab, setActiveTab] = useState("MANAGE");
  const { selectedTab } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setSelectedTab(tab));
  };
  return (
    <div className=" basis-1/4">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      <ul className="flex flex-col py-1.5">
        {Object.keys(Tab).map((k, i) => {
          return (
            <li
              key={i}
              className={`py-0.5 text-[16px] font-medium cursor-pointer flex items-center justify-between ${
                activeTab === Tab[k] ? "text-blue-500" : ""
              }`}
              onClick={() => {
                setActiveTab(Tab[k].tag);
                handleTabClick(Tab[k].tag);
              }}
            >
              {Tab[k].tag} {Tab[k].children && <BiChevronDown />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
