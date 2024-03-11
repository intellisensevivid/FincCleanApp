import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmEmailMutation } from "./authApiSlice";

// eslint-disable-next-line react/prop-types
const ConfirmEmailModal = ({ email, onClose }) => {
  const [pin, setPin] = useState("");
  const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // here we add logic to verify PIN from our backend
    const { error } = await confirmEmail({ pin });
    if (error) {
      console.log(error);
      return;
    } else {
      onClose();
      navigate("/welcome");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto leading-loose">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
              Confirm Email
            </h2>
            <p className="text-center text-gray-600 mb-4">
              We sent a 6 digit PIN to your email address{" "}
              <strong>{email}</strong>. Please enter it below.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label
                  htmlFor="pin"
                  className="block font-semibold text-gray-700"
                >
                  PIN
                </label>
                <input
                  id="pin"
                  name="pin"
                  type="text"
                  autoComplete="off"
                  required
                  onChange={(e) => setPin(e.target.value)}
                  placeholder={`123456`}
                  className="input input-bordered bg-gray-100 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={`inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading
                      ? `cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 focus:ring-opacity-0`
                      : ""
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailModal;
