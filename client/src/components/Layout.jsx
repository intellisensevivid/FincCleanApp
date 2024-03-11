import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      <header className="container mx-auto py-4">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
