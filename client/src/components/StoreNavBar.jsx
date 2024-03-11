import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BiMenuAltRight,
  BiSearch,
  BiMessage,
  BiInfoCircle,
  BiMenu,
} from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { setSelectedTab } from "../features/Store/storeSlice";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const handleToggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // close menu when screen gets resized  to large screen
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (isMenuOpen && screenWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // close menu when user navigates to a different page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="flex justify-between w-full px-4">
        <span className="text-xl">FincCleanApp</span>
        <button className="" onClick={handleToggleNav}>
          {!isMenuOpen ? (
            <BiMenuAltRight className="text-3xl" />
          ) : (
            <AiOutlineClose className="text-3xl" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute left-0 right-0 bg-gray-100 z-10 shadow-lg shadow-gray-300 py-16">
          <NavContent />
        </div>
      )}
    </>
  );
};

const AdminNav = () => {
  return (
    <>
      <button className="ml-2 dropdown">
        <BiMenu className="text-xl" />
      </button>
      {/* <div className="dropdown-content">
        <ul className="flex flex-col gap-2">
          <li>Search</li>
          <li>Metrics</li>
          <li>Products</li>
          <li>Users</li>
          <li>Hardware</li>
          <li>Search</li>
          <li>Search</li>
          <li>Search</li>
          <li>Admin</li>
        </ul>
      </div> */}
    </>
  );
};

const DesktopNav = () => {
  return (
    <div className="flex justify-between w-full">
      {/* <div> */}
      {/* <span className="text-xl">FincCleanApp</span> */}
      <AdminNav />
      {/* </div> */}
      <div>
        <NavContent />
      </div>
      <div>
        <NavUtilContent />
      </div>
    </div>
  );
};

const NavContent = () => {
  const { selectedTab } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <div className="flex justify-center items-center gap-6 flex-col md:flex-row">
      <button
        onClick={() => handleTabClick("order")}
        className={`hover:text-primary ${
          selectedTab === "order"
            ? "text-blue-500 font-bold"
            : "text-gray-500 font-semibold"
        }`}
      >
        New Order
      </button>
      <button
        onClick={() => handleTabClick("cleaning")}
        className={`hover:text-primary ${
          selectedTab === "cleaning"
            ? "text-blue-500 font-bold"
            : "text-gray-500 font-semibold"
        }`}
      >
        Cleaning
      </button>
      <button
        onClick={() => handleTabClick("machine")}
        className={`hover:text-primary ${
          selectedTab === "machine"
            ? "text-blue-500 font-bold"
            : "text-gray-500 font-semibold"
        }`}
      >
        Machines
      </button>
      <button
        onClick={() => handleTabClick("ready")}
        className={`hover:text-primary ${
          selectedTab === "ready"
            ? "text-blue-500 font-bold"
            : "text-gray-500 font-semibold"
        }`}
      >
        Ready
      </button>
      <button
        onClick={() => handleTabClick("pickup")}
        className={`hover:text-primary ${
          selectedTab === "pickup"
            ? "text-blue-500 font-bold"
            : "text-gray-500 font-semibold"
        }`}
      >
        Pickups
      </button>
    </div>
  );
};

const NavUtilContent = () => {
  return (
    <div className="flex justify-end items-center gap-2 lg:gap-4">
      <BiSearch className="text-xl" />
      <BiMessage className="text-xl" />
      <button className="flex justify-start items-center gap-1">
        <span className="hidden md:block">Help</span>
        <BiInfoCircle className="text-xl" />
      </button>
      <button className="flex justify-center items-center rounded-full text-sm bg-blue-500 text-white w-7 h-7">
        <span>EA</span>
      </button>
      <button className="text-xs bg-blue-500 text-white p-2 rounded-md">
        JOIN NOW
      </button>
    </div>
  );
};

const StoreNavBar = () => {
  return (
    <>
      <nav className="text-gray-500 py-2 shadow-md">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <DesktopNav />
        </div>
      </nav>
    </>
  );
};

export default StoreNavBar;
