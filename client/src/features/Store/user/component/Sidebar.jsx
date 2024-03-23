import React, { useState } from "react";

const Tab = [
  "Manage User Account",
  "View Hours",
  // "User Edits",
  // "Deletions",
  // "View Logins",
  // "Driver Locations",
  // "Payroll",
  // "Tips",
  // "Completed Lessons",
];
function Sidebar({ onClick }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className=" basis-1/4">
      <h1 className="text-3xl font-bold">Users</h1>
      <ul className="flex flex-col py-1.5">
        {Tab.map((k, i) => {
          return (
            <li
              key={i}
              className={`py-0.5 text-[16px] font-medium cursor-pointer ${
                activeTab === i ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveTab(i)}
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
