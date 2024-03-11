import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPlus, BiSolidEditAlt, BiUser } from "react-icons/bi";
import { toggleAddCustomerModal } from "../../../app/modalSlice";
import { addOrderCustomer, deleteOrderCustomer } from "../Order/orderSlice";
import { useLazySearchCustomersQuery } from "./customerApiSlice";
import { debounce } from "../../../utils";

const CustomerInput = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.order);
  const [query, setQuery] = useState("");
  const [
    searchCustomers,
    { data: searchResults = [], isFetching, isError, error },
  ] = useLazySearchCustomersQuery();

  const handleSearch = debounce(async (e) => {
    const updatedQuery = e.target.value;
    setQuery(e.target.value);
    if (!updatedQuery.length) {
      return;
    }
    await searchCustomers(updatedQuery).unwrap();
  }, 300);

  const openAddCustomerModal = () => {
    dispatch(toggleAddCustomerModal());
  };

  const closeModal = () => {
    dispatch(deleteOrderCustomer());
  };

  const handleSelectCustomer = (customer) => {
    dispatch(
      addOrderCustomer({
        id: customer._id,
        name: customer.name,
        address: customer.streetAddress,
      })
    );
    setQuery("");
  };

  console.log(customer);
  console.log("search results", searchResults);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 relative">
        {customer?.id ? (
          <>
            <span className="flex-grow bg-gray-200 truncate ... px-4 h-12 pt-2 rounded-lg">
              <span className=" w-full block gap-4 bg-gray-300 p-1 pb-2 text-sm relative rounded-md">
                <span className="w-11/12 block truncate ...">
                  {customer.name} {customer.address}
                </span>
                <div className="absolute top-2 right-1">
                  <button
                    onClick={closeModal}
                    className="text-gray-800 hover:text-gray-200 hover:bg-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </span>
            </span>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-md"
              onClick={openAddCustomerModal}
            >
              <BiUser className="font-semibold text-2xl" />
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-md"
              onClick={openAddCustomerModal}
            >
              <BiSolidEditAlt className="font-semibold text-2xl" />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="customer"
              id="Customer"
              placeholder="Customer"
              onChange={handleSearch}
              className="input w-full bg-gray-200"
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center items-center w-12 h-12 rounded-md"
              onClick={openAddCustomerModal}
            >
              <BiPlus className="font-semibold" />
            </button>
            {query.length > 0 && (
              <div className="absolute top-14 z-10 shadow-xl w-full border-2 border-white bg-blue-200 p-4">
                {isFetching ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : isError ? (
                  <div>{error?.data?.message}</div>
                ) : (
                  <ul className="max-h-80 flex flex-col gap-2 overflow-y-auto">
                    {searchResults.length > 0 &&
                      searchResults.map((customer, index) => (
                        <React.Fragment key={customer._id}>
                          <li
                            className="cursor-pointer"
                            onClick={() => handleSelectCustomer(customer)}
                          >
                            {customer.name}
                          </li>
                          {index !== searchResults.length - 1 && <hr />}
                        </React.Fragment>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerInput;
