import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSchema } from "../../utils/schema";
import { useLoginUserMutation } from "./authApiSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual fields
    const { error } = loginSchema.extract(name).validate(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate entire form
    const { error } = loginSchema.validate(formData, {
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
      const { error } = await login(formData).unwrap();
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
      <div className="min-h-screen leading-loose flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto w-full sm:w-full sm:max-w-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to={`/signup`}
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Register Now!
              </Link>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-2xl">
            <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm space-y-px">
                  <div className="mb-4">
                    <label
                      htmlFor="email-address"
                      className="block font-semibold  text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={handleChange}
                        className="input input-bordered bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
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
                      className="block font-semibold  text-gray-700"
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
                        className="input input-bordered bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                      {validationErrors.password && (
                        <span className="block text-sm mt-2 text-red-500">
                          {validationErrors.password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="checkbox checkbox-primary h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to={`/forgotpassword`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isLoading
                        ? `cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:ring-opacity-0`
                        : ""
                    }`}
                  >
                    {!isLoading ? (
                      <span>Log in</span>
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

export default LoginPage;
