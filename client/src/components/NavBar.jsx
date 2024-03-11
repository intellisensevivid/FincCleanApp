import { Link, useLocation } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

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

const DesktopNav = () => {
  return (
    <div className="flex justify-between w-full">
      <span className="text-xl">FincCleanApp</span>
      <div>
        <NavContent />
      </div>
    </div>
  );
};

const NavContent = () => {
  return (
    <div className="flex justify-center items-center gap-6 flex-col md:flex-row">
      <Link to={`/features`} className={`hover:text-primary`}>
        Features
      </Link>
      <Link to={`/features`} className={`hover:text-primary`}>
        Testimonials
      </Link>
      <Link to={`/features`} className={`hover:text-primary`}>
        Pricing
      </Link>
      <Link to={`/signup`} className="btn btn-primary text-white">
        Sign up
      </Link>
    </div>
  );
};

const NavBar = () => {
  return (
    <>
      <nav>
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

export default NavBar;
