import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmEmailModal from "./ConfirmEmailModal";
import { signUpSchema } from "../../utils/schema";
import { useRegisterUserMutation } from "./authApiSlice";

const SignupPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    numberOfStores: "1",
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [signUp, { isLoading, isError, error }] = useRegisterUserMutation();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual fields
    const { error } = signUpSchema.extract(name).validate(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    //validate entire form
    const { error } = signUpSchema.validate(formData, {
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

    // here we add logic to register user, send confirmation email and open modal
    try {
      const { error } = await signUp(formData);
      if (error) {
        console.error(error);
      } else {
        setShowModal(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="px-4 md:px-8 bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100">
      <div className="min-h-screen leading-loose  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
          className="mx-auto h-12 w-auto"
          src="logo.png"
          alt="FincCleanApp Logo"
        /> */}
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign up for FincCleanApp
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to={`/login`}
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              log in to your account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <h3 className="text-xl md:text-2xl mb-6 font-semibold text-gray-900">
                  Company Details
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="companyName"
                    className="block font-semibold  text-gray-700"
                  >
                    Company Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.companyName && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.companyName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block  font-semibold text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.location && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="numberOfStores"
                    className="block  font-semibold text-gray-700"
                  >
                    Number of Stores
                  </label>
                  <div className="mt-1">
                    <select
                      id="numberOfStores"
                      name="numberOfStores"
                      onChange={handleChange}
                      className="select select-bordered block w-full py-2 px-3 border bg-white border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    >
                      <option disabled>Select number of stores</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                      <option value={"5"}>5</option>
                      <option value={"6"}>6</option>
                      <option value={"7"}>7</option>
                      <option value={"8"}>8</option>
                      <option value={"9"}>9</option>
                      <option value={"10 or more"}>10 or more</option>
                    </select>
                    {validationErrors.numberOfStores && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.numberOfStores}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl mb-6  font-semibold text-gray-900">
                  Personal Details
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block  font-semibold text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.fullName && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.fullName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block  font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.phoneNumber && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.phoneNumber}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block  font-semibold text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.email && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block  font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={handleChange}
                      className="input input-bordered bg-white border-gray-400 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {validationErrors.password && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading
                      ? `cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:ring-opacity-0`
                      : ""
                  }`}
                >
                  {!isLoading ? (
                    <span>Sign up</span>
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
      {showModal && (
        <ConfirmEmailModal email={formData.email} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default SignupPage;
