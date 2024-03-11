import { useDispatch, useSelector } from "react-redux";
import { TbCreditCard, TbCashBanknote } from "react-icons/tb";
import { togglePaymentMethodModal } from "../../../app/modalSlice";
import { resetOrder, setPaymentMethod } from "./orderSlice";
import { useCreateOrderMutation } from "./orderApiSlice";

const PaymentMethodModal = () => {
  const { totalPrice } = useSelector((state) => state.order);
  const { isPaymentMethodModal } = useSelector((state) => state.modal);
  const { paymentMethod, customer, orderType } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  const handleMethodSelect = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const closeModal = () => {
    dispatch(togglePaymentMethodModal());
  };

  console.log(order);

  const handleCreateOrder = async () => {
    if (!paymentMethod) {
      alert("You must select a payment method");
      return;
    }

    const dateData = {};
    if (orderType === "inStore") {
      dateData.pickupDate = new Date(order.pickupDate);
      dateData.pickupTime = new Date(order.pickupTime);
    }
    if (orderType === "pickupAndDelivery") {
      dateData.pickupDate = new Date(order.pickupDate);
      dateData.pickupStartTime = new Date(order.pickupEndTime);
      dateData.deliveryDate = new Date(order.deliveryDate);
      dateData.deliveryStartTime = new Date(order.deliveryStartTime);
      dateData.deliveryEndTime = new Date(order.deliveryEndTime);
    }
    if (orderType === "pickup") {
      dateData.pickupDate = new Date(order.pickupDate);
      dateData.pickupStartTime = new Date(order.pickupStartTime);
      dateData.pickupEndTime = new Date(order.pickupEndTime);
    }
    if (orderType === "delivery") {
      dateData.deliveryDate = new Date(order.deliveryDate);
      dateData.deliveryStartTime = new Date(order.deliveryStartTime);
      dateData.deliveryEndTime = new Date(order.deliveryEndTime);
    }
    if (!customer.id) {
      alert("You must select a customer");
      return;
    }
    console.log("orderType: ", orderType);
    console.log(customer);
    const { error } = await createOrder({
      items: order.items,
      orderType: order.orderType,
      paymentStatus: order.paymentStatus,
      customer: customer.id,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
      ...dateData,
    });
    if (error) {
      console.error(error);
    } else {
      alert("Order created successfully");
      dispatch(togglePaymentMethodModal());
      dispatch(resetOrder());
    }
  };

  return (
    <>
      {isPaymentMethodModal && (
        <div className="fixed z-10 inset-0 h-full flex items-center justify-center p-4 md:p-8 overflow-y-auto bg-gray-700 bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Payment</h2>
              <button
                onClick={closeModal}
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
            <div className="text-center mt-4 mb-8">
              <p className="text-2xl md:text-3xl font-bold">NGN{totalPrice}</p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleMethodSelect("cash")}
                className={`flex items-center justify-center p-4 rounded-lg border text-2xl shadow-md border-gray-300 ${
                  paymentMethod === "cash" ? "bg-blue-500 text-white" : ""
                }`}
              >
                <span className="flex flex-col justify-center items-center">
                  <TbCashBanknote className="text-5xl" />
                  <span>Cash</span>
                </span>
              </button>
              <button
                onClick={() => handleMethodSelect("card")}
                className={`flex items-center justify-center p-4 rounded-lg border text-2xl shadow-md border-gray-300 ${
                  paymentMethod === "card" ? "bg-blue-500 text-white" : ""
                }`}
              >
                <span className="flex flex-col justify-center items-center">
                  <TbCreditCard className="text-5xl" />
                  <span>Card</span>
                </span>
              </button>
              <button
                onClick={() => handleMethodSelect("payOnCollection")}
                className={`text-lg p-4 rounded-lg border border-gray-300 shadow-md ${
                  paymentMethod === "payOnCollection"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                Pay on Collection
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleCreateOrder}
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
            <div>
              {isError && (
                <span className="block text-sm mt-2 text-red-500">
                  {error?.data?.message ||
                    error?.data?.error?.details[0].message}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethodModal;
