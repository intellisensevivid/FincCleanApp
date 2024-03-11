import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StoreNavBar from "./StoreNavBar";
import { useGetStoreProductsQuery } from "../features/Store/Product/productApiSlice";
import Loading from "./Loading";

const StoreLayout = () => {
  const location = useLocation();
  const { isLoading } = useGetStoreProductsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 h-screen text-gray-900 flex flex-col w-full">
          <header className="mx-auto py-2 pe-2 w-full">
            <StoreNavBar />
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default StoreLayout;
