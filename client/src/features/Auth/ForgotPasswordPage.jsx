import { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useForgotPasswordMutation } from "./authApiSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isError, error }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedEmail = DOMPurify.sanitize(email);

    const { error } = await forgotPassword({ email: sanitizedEmail });
    if (error) {
      console.error(error);
    } else {
      alert(`An email has been sent to ${email} to reset your password`);
    }
  };

  return (
    <section className="px-4 md:px-8 bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100">
      <div className="min-h-screen leading-loose py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="sm:mx-auto w-full sm:w-full sm:max-w-xl">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Forgot Password
              </h2>
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input input-bordered bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                        />
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
                        <span>Request new password</span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <span className="pr-2">Requesting</span>{" "}
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

export default ForgotPasswordPage;
