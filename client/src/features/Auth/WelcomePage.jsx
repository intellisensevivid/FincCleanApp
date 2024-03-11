import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { configureStoreSchema } from "../../utils/schema";
import { useConfigureStoreMutation } from "./authApiSlice";

const WelcomePage = () => {
  const [formData, setFormData] = useState({
    language: "english",
    pickupAndDelivery: "yes",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [configureStore, { isLoading, isError, error }] =
    useConfigureStoreMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual fields
    const { error } = configureStore.extract(name).validate(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate entire form
    const { error } = configureStoreSchema.validate(formData, {
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

    try {
      const { error } = await configureStore(formData);
      if (error) {
        console.error(error);
      } else {
        navigate("/store");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="px-4 md:px-8 bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100">
      <div className="min-h-screen flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto w-full sm:w-full sm:max-w-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="mt-6 text-center text-3xl md:text-4xl font-semibold text-gray-900">
              Welcome to FincCleanApp
            </h2>
            <p className="mt-6 text-center text-gray-600">
              Your account has been created.
            </p>
            <p className="text-center text-gray-600">
              Now let`s tailor your account and get you started on the guided
              tour
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-px">
                  <div className="mb-4">
                    <label
                      htmlFor="language"
                      className="block  font-semibold text-gray-700"
                    >
                      Language
                    </label>
                    <div className="mt-1">
                      <select
                        id="language"
                        name="language"
                        onChange={handleChange}
                        className="select select-bordered block w-full py-2 px-3 border bg-white border-gray-400 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                      >
                        <option disabled>Select language</option>
                        <option value={"english"}>English</option>
                      </select>
                      {validationErrors.language && (
                        <span className="block text-sm mt-2 text-red-500">
                          {validationErrors.language}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="pickupAndDelivery"
                      className="block font-semibold text-gray-700"
                    >
                      Do you want to offer Pickup and Delivery
                    </label>
                    <div className="mt-1">
                      <select
                        id="pickupAndDelivery"
                        name="pickupAndDelivery"
                        onChange={handleChange}
                        className="select select-bordered block w-full py-2 px-3 border bg-white border-gray-400 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                      >
                        <option disabled>Select option</option>
                        <option value={"yes"}>Yes</option>
                        <option value={"no"}>No</option>
                      </select>
                      {validationErrors.pickupAndDelivery && (
                        <span className="block text-sm mt-2 text-red-500">
                          {validationErrors.pickupAndDelivery}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isLoading
                        ? `cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:ring-opacity-0`
                        : ""
                    }`}
                  >
                    {!isLoading ? (
                      <span>Submit Store Settings and Begin Tour</span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="pr-2">Submitting</span>{" "}
                        <span className="loading loading-bars loading-xs"></span>
                      </span>
                    )}
                  </button>
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
    </section>
  );
};

export default WelcomePage;
