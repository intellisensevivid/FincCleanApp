import React, { useState } from "react";

const Tab = {
  "Manage User Account": "MANAGE",
  "User Hours": "SHIFT",
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
  console.log(activeTab);
  return (
    <div className=" basis-1/4 h-full bg-gray-200 px-2  ">
      <h1 className="text-3xl font-bold">Users</h1>
      <ul className="flex flex-col py-1.5">
        {Object.keys(Tab).map((k, i) => {
          return (
            <li
              key={i}
              className={`py-0.5 text-[16px] font-medium cursor-pointer ${
                activeTab === Tab[k] ? "text-blue-500" : ""
              }`}
              onClick={() => {
                setActiveTab(Tab[k]);
                onClick(Tab[k]);
              }}
            >
              {k}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
