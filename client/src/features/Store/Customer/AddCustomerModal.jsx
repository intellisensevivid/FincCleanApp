import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddCustomerModal } from "../../../app/modalSlice";
import { addCustomerSchema } from "../../../utils/schema";
import { useCreateCustomerMutation } from "./customerApiSlice";
import { addOrderCustomer } from "../Order/orderSlice";

const AddCustomerModal = () => {
  const { isAddCustomerModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    secondaryTelephone: "",
    email: "",
    streetAddress: "",
    aptNumber: "",
    city: "",
    postCode: "",
    driverInstructions: "",
    notes: "",
    privateNotes: "",
    priceList: "default",
    paymentMethod: "storeDefault",
    marketing: "no",
    invoiceStyle: "default",
    starch: "noPreference",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [createCustomer, { isLoading, isError, error }] =
    useCreateCustomerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual fields
    const { error } = addCustomerSchema.extract(name).validate(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();

    //validate entire form
    const { error } = addCustomerSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(
        (detail) => (errors[detail.path[0]] = detail.message)
      );
      setValidationErrors(errors);
      console.error(validationErrors, error);
      return;
    }

    // here we add logic to create customer
    try {
      const customer = await createCustomer(formData).unwrap();
      dispatch(
        addOrderCustomer({
          id: customer._id,
          name: customer.name,
          address: customer.streetAddress,
        })
      );
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    dispatch(toggleAddCustomerModal());
  };
  return (
    <>
      {isAddCustomerModal && (
        <div className="fixed z-10 inset-0 h-full bg-gray-700 bg-opacity-50 text-sm md:text-base overflow-y-auto">
          <div className="flex items-center justify-center p-4 md:p-8">
            <div className="relative bg-gray-200 min-w-80 md:w-3/5 p-4 md:p-8 rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-800 hover:text-gray-200 hover:bg-red-500 p-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Add Customer
                </h2>
              </div>
              <div>
                <form onSubmit={handleCreateCustomer}>
                  <div className="text-gray-500 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 font-semibold"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.name && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.name}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="telephone"
                          className="block mb-2 font-semibold"
                        >
                          Tel
                        </label>
                        <input
                          type="text"
                          name="telephone"
                          id="telephone"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.telephone && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.telephone}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="secondaryTelephone"
                          className="block mb-2 font-semibold"
                        >
                          Secondary Tel
                        </label>
                        <input
                          type="text"
                          name="secondaryTelephone"
                          id="secondaryTelephone"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.secondaryTelephone && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.secondaryTelephone}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 font-semibold"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.email && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.email}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="streetAddress"
                          className="block mb-2 font-semibold"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.streetAddress && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.streetAddress}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="aptNumber"
                          className="block mb-2 font-semibold"
                        >
                          Apt Number
                        </label>
                        <input
                          type="text"
                          name="aptNumber"
                          id="aptNumber"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.aptNumber && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.aptNumber}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block mb-2 font-semibold"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.city && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.city}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="postCode"
                          className="block mb-2 font-semibold"
                        >
                          Post Code
                        </label>
                        <input
                          type="text"
                          name="postCode"
                          id="postCode"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.postCode && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.postCode}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="driverInstructions"
                          className="block mb-2 font-semibold"
                        >
                          Driver Instructions
                        </label>
                        <input
                          type="text"
                          name="driverInstructions"
                          id="driverInstructions"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.driverInstructions && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.driverInstructions}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="notes"
                          className="block mb-2 font-semibold"
                        >
                          Notes
                        </label>
                        <input
                          type="text"
                          name="notes"
                          id="notes"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.notes && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.notes}
                          </span>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="privateNotes"
                          className="block mb-2 font-semibold"
                        >
                          Private Notes
                        </label>
                        <input
                          type="text"
                          name="privateNotes"
                          id="privateNotes"
                          onChange={handleChange}
                          className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        />
                        {validationErrors.privateNotes && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.privateNotes}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="priceList"
                          className="block mb-2 font-semibold"
                        >
                          Price List
                        </label>
                        <select
                          name="priceList"
                          id="priceList"
                          onChange={handleChange}
                          className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        >
                          <option value="default">Default</option>
                        </select>
                        {validationErrors.priceList && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.priceList}
                          </span>
                        )}
                      </div>

                      <div className="">
                        <label
                          htmlFor="paymentMethod"
                          className="block mb-2 font-semibold"
                        >
                          Payment Method
                        </label>
                        <select
                          name="paymentMethod"
                          id="paymentMethod"
                          onChange={handleChange}
                          className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        >
                          <option value="storeDefault">Default</option>
                          <option value="cash">Cash</option>
                          <option value="card">Card</option>
                          <option value="payOnCollection">
                            Pay on collection
                          </option>
                        </select>
                        {validationErrors.paymentMethod && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.paymentMethod}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="marketing"
                          className="block mb-2 font-semibold"
                        >
                          Marketing Opt-in
                        </label>
                        <select
                          name="marketing"
                          id="marketing"
                          defaultValue={"no"}
                          onChange={handleChange}
                          className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {validationErrors.marketing && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.marketing}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="invoiceStyle"
                          className="block mb-2 font-semibold"
                        >
                          Invoice Style
                        </label>
                        <select
                          name="invoiceStyle"
                          id="invoiceStyle"
                          onChange={handleChange}
                          className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                        >
                          <option value="default">Store default</option>
                        </select>
                        {validationErrors.invoiceStyle && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.invoiceStyle}
                          </span>
                        )}
                      </div>
                    </div>
                    <h2 className="text-lg text-gray-900 font-semibold">
                      Order Preferences
                    </h2>
                    <div className="md:w-1/3">
                      <label
                        htmlFor="starch"
                        className="block mb-2 font-semibold"
                      >
                        Starch
                      </label>
                      <select
                        name="starch"
                        id="starch"
                        onChange={handleChange}
                        className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                      >
                        <option value="noPreference">No preference</option>
                        <option value="starch">Starch</option>
                        <option value="noStarch">No Starch</option>
                        <option value="lightStarch">Light Starch</option>
                        <option value="heavyStarch">Heavy Starch</option>
                      </select>
                      {validationErrors.starch && (
                        <span className="block text-sm mt-2 text-red-500">
                          {validationErrors.starch}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        type="submit"
                        className={`btn btn-success text-lg text-white ${
                          isLoading
                            ? `cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:ring-opacity-0`
                            : ""
                        }`}
                      >
                        {!isLoading ? (
                          <span>Submit</span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <span className="pr-2">Submitting</span>{" "}
                            <span className="loading loading-bars loading-xs"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    {isError && (
                      <span className="block text-sm mt-2 text-red-500">
                        {error?.data?.message ||
                          error?.data?.error?.details[0].message}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomerModal;
