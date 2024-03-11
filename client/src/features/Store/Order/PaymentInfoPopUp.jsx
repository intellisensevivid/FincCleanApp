import { useDispatch, useSelector } from "react-redux";
import { togglePaymentInfoPopUp } from "../../../app/modalSlice";
import { useState } from "react";
import { roundToTwoDecimalPlaces } from "../../../utils";
import { resetOrder } from "./orderSlice";

const PaymentInfoPopUp = () => {
  const { isPaymentInfoPopUp } = useSelector((state) => state.modal);
  const { totalPrice } = useSelector((state) => state.order);
  const [paymentMethod, setPaymentMethod] = useState("payOnCollection");
  const [setNotification] = useState();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(togglePaymentInfoPopUp());
  };

  const handleResetOrder = () => {
    dispatch(resetOrder());
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNotificationChange = (e) => {
    setNotification(e.target.value);
  };

  return (
    <>
      {isPaymentInfoPopUp && (
        <div className="absolute w-full z-10 bottom-14 flex items-center justify-center bg-opacity-50 rounded-lg shadow-lg">
          <div className="bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100 w-full rounded-lg overflow-auto shadow-lg p-4 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Payment</h2>
              <button
                onClick={handleClose}
                className="text-gray-800 hover:text-gray-200 hover:bg-red-500"
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  onChange={handlePaymentMethodChange}
                  defaultValue={paymentMethod}
                  className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                >
                  <option value="payOnCollection">Pay on collection</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
                <select
                  name="notification"
                  id="notification"
                  onChange={handleNotificationChange}
                  className="select block w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                >
                  <option disabled>Notify By SMS</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span>SubTotal</span>
                  <span className="flex gap-2 items-center leading-none">
                    <span>NGN</span>
                    <span className="p-2 rounded-md bg-gray-300">
                      {totalPrice}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="flex gap-2 items-center leading-none">
                    <span>NGN</span>
                    <span className="p-2 rounded-md bg-gray-300">
                      {roundToTwoDecimalPlaces(0)}
                    </span>
                  </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="flex gap-2 items-center leading-none">
                    <span>NGN</span>
                    <span className="p-2 rounded-md bg-gray-300">
                      {totalPrice}
                    </span>
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="text-blue-500 font-bold"
                    onClick={handleResetOrder}
                  >
                    Reset Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentInfoPopUp;
