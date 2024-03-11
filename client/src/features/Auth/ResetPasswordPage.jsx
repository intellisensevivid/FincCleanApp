import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useResetPasswordMutation } from "./authApiSlice";
import { resetPasswordSchema } from "../../utils/schema";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const { token } = useParams();
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate individual fields
    const { error } = resetPasswordSchema.extract(name).validate(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error ? error.details[0].message : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate entire form
    const { error } = resetPasswordSchema.validate(formData, {
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

    const sanitizedFormData = {};

    for (const [key, value] of Object.entries(formData)) {
      sanitizedFormData[key] = DOMPurify.sanitize(value);
    }

    try {
      const { error } = await resetPassword({
        ...sanitizedFormData,
        token,
      }).unwrap();
      if (error) {
        console.error(error);
      } else {
        alert(`Password reset successful`);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="px-4 md:px-8 bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100">
      <div className="min-h-screen leading-loose py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="sm:mx-auto w-full sm:w-full sm:max-w-xl">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Reset Password
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-2xl">
              <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm space-y-px">
                    <div className="mb-4">
                      <label
                        htmlFor="newPassword"
                        className="block font-semibold  text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          autoComplete="current-password"
                          required
                          onChange={handleChange}
                          className="input input-bordered bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Enter new password"
                        />
                        {validationErrors.newPassword && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.newPassword}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block font-semibold  text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="current-password"
                          required
                          onChange={handleChange}
                          className="input input-bordered bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Confirm password"
                        />
                        {validationErrors.confirmPassword && (
                          <span className="block text-sm mt-2 text-red-500">
                            {validationErrors.confirmPassword}
                          </span>
                        )}
                      </div>
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
                        <span>Reset password</span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <span className="pr-2">Resetting</span>{" "}
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

                  <div className="text-sm">
                    <p>
                      Or{" "}
                      <Link
                        to={`/login`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Already Have Account Login!
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
