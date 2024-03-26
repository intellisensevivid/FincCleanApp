import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../storeSlice";

const tabs = [
  {
    name: "Store Settings",
    tag: "STORE",
    children: [
      { name: "Store Information", tag: "STORE" },
      { name: "Services Rendered", tag: "store_services" },
    ],
  },
  {
    name: "Payment & Finances",
    tag: "FINANCE",
    children: [
      { name: "Payment Information", tag: "payment" },
      { name: "Payment Services", tag: "payment_services" },
    ],
  },
  // Add more tabs as needed
];

function Sidebar({ onClick }) {
  const [activeTab, setActiveTab] = useState(null);
  const { selectedTab } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const handleTabClick = (tag) => {
    setActiveTab(activeTab === tag ? null : tag);
    dispatch(setSelectedTab(tag));
  };

  return (
    <div className="basis-1/4 bg-gray-200 px-2 h-full ">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      <ul className="flex flex-col py-1.5">
        {tabs.map((tab, index) => (
          <div key={index}>
            <li
              className={`py-0.5 leading-6 font-semibold  text-[16px] text-[#1e1f25] cursor-pointer flex items-center hover:text-blue-500 justify-between 
              
              `}
              onClick={() => handleTabClick(tab.tag)}
            >
              {tab.name}{" "}
              {tab.children &&
                (activeTab === tab.tag ? <BiChevronUp /> : <BiChevronDown />)}
            </li>
            {activeTab === tab.tag && tab.children && (
              <ul className="px-2.5 text-sm">
                {tab.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className={` text-[16px]   cursor-pointer flex items-center hover:text-blue-500 hover:bg-white p-2.5 justify-between ${
                      selectedTab === child.tag
                        ? "text-blue-500 font-medium"
                        : ""
                    }`}
                    onClick={() => dispatch(setSelectedTab(child.tag))}
                  >
                    {child.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
