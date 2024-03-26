import React from "react";
import Sidebar from "./component/Sidebar";
import { useSelector } from "react-redux";
import StoreConfig from "./component/store/StoreConfig";

function Admin() {
  const { selectedTab } = useSelector((state) => state.store);
  return (
    <div className="flex gap-2 h-full">
      <Sidebar />
      <div className="w-full">
        {selectedTab === "STORE" && <StoreConfig />}
        {/* {selectedTab === "STORE" && <StoreConfig />} */}
      </div>
    </div>
  );
}

export default Admin;
