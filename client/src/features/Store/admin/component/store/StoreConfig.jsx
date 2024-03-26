import React from "react";
import StoreDetailsForm from "./StoreInfoForm";
import { useGetStoreQuery } from "../../../storeApiSlice";

const StoreConfig = () => {
  const { data, isSuccess, isError, isLoading } = useGetStoreQuery();

  // Handle form submission
  const handleSubmit = (formData) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="w-full bg-white h-screen">
      {isError && <div>Error fetching store data.</div>}
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <StoreDetailsForm formData={data.data} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default StoreConfig;
