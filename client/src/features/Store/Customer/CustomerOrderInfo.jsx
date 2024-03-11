import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BiTime,
  BiArrowToTop,
  BiCalendar,
  BiCalendarCheck,
  BiArrowToBottom,
} from "react-icons/bi";
import { FiTruck } from "react-icons/fi";
import { useGetStoreProductsQuery } from "../Product/productApiSlice";
import { roundToTwoDecimalPlaces } from "../../../utils";
import {
  addOrderType,
  setPaymentMethod,
  setTotalPrice,
} from "../Order/orderSlice";
import {
  togglePaymentInfoPopUp,
  togglePaymentMethodModal,
  toggleTimePickerPopUp,
} from "../../../app/modalSlice";
import TimePickerPopup from "../Order/TimePickerPopUp";
import PaymentInfoPopUp from "../Order/PaymentInfoPopUp";

const emptyArray = [];

const CustomerOrderInfo = () => {
  const { items } = useSelector((state) => state.order);
  const toggleRef = useRef();
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoreProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      data: data?.products ?? emptyArray,
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });
  const dispatch = useDispatch();
  const [deliveryOption, setDeliveryOption] = useState("inStore");
  const { isPaymentInfoPopUp } = useSelector((state) => state.modal);
  const {
    pickupDate,
    pickupStartTime,
    pickupEndTime,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
  } = useSelector((state) => state.order);

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
    dispatch(addOrderType(e.target.value));
  };

  const handleOpenPopUp = () => {
    dispatch(toggleTimePickerPopUp());
  };

  const handlePaymentInfoPopUp = () => {
    dispatch(togglePaymentInfoPopUp());
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.error(error);
  }

  if (isSuccess) {
    console.log("products: ", products);
  }

  const handleChange = () => {};

  const handleOpenPaymentModal = () => {
    if (
      deliveryOption === "pickup" &&
      (!pickupDate || !pickupStartTime || !pickupEndTime)
    ) {
      alert(
        "If you are scheduling a pickup from a customer, you must select the date and start and end times for the pickup"
      );
      return;
    }
    if (
      deliveryOption === "delivery" &&
      (!deliveryDate || !deliveryStartTime || !deliveryEndTime)
    ) {
      alert(
        "If you are scheduling a delivery to a customer, you must select the date and start and end times for the delivery"
      );
      return;
    }
    if (
      deliveryOption === "pickupAndDelivery" &&
      (!pickupDate ||
        !deliveryDate ||
        !pickupStartTime ||
        !pickupEndTime ||
        !deliveryStartTime ||
        !deliveryEndTime)
    ) {
      alert(
        "If you are scheduling a pickup and delivery, you must select a date range for pickup and delivery, start and end times for the pickup, and start and end times for the delivery"
      );
      return;
    }
    dispatch(setTotalPrice(roundToTwoDecimalPlaces(selectTotalPrice())));
    dispatch(setPaymentMethod("payOnCollection"));
    dispatch(togglePaymentMethodModal());
  };

  const selectProduct = (id) => {
    return products.find((product) => product._id === id);
  };

  const numberOfBags = () => {
    return items.reduce((a, c) => a + (c.bags ? c.bags.length : 0), 0);
  };

  const selectTotalPrice = () => {
    const totalPrice = items.reduce(
      (a, c) => a + c.quantity * (selectProduct(c.product)?.price ?? 0),
      0
    );
    return totalPrice;
  };

  const getTotalPieces = () => {
    return items.reduce(
      (a, c) => a + (!c.bags || !c.bags.length ? c.quantity : 1),
      0
    );
  };

  console.log(items);
  return (
    <div className="flex flex-col  h-full gap-4">
      <div className="overflow-auto">
        <div className="md:mt-2 flex justify-between items-center px-4 py-2 bg-gray-200 rounded-md">
          <label htmlFor="express">Express</label>
          <input
            type="checkbox"
            name="express"
            id="express"
            ref={toggleRef}
            onChange={handleChange}
            className="toggle toggle-primary toggle-sm bg-gray-200"
          />
        </div>
        <div className="max-h-60 overflow-auto mt-2">
          {items.length > 0 &&
            items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <div className="col-span-2">
                  <span className="font-semibold">
                    {item.bags
                      ? roundToTwoDecimalPlaces(item.quantity)
                      : item.quantity}
                  </span>
                </div>
                <div className="col-span-8">
                  <div className="flex flex-col ">
                    <span className="mb-2 font-semibold">
                      {selectProduct(item.product)?.name}
                    </span>
                    {item.bags &&
                      item.bags.length > 0 &&
                      item.bags.map((bag, i) => (
                        <span key={i} className="text-sm text-gray-600 mb-1">
                          {roundToTwoDecimalPlaces(bag)}kg
                        </span>
                      ))}
                  </div>
                </div>
                <div className="col-span-2 text-end">
                  <span className="font-semibold">
                    {roundToTwoDecimalPlaces(
                      selectProduct(item.product)?.price * item.quantity
                    )}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="p-2 md:w-1/2 flex justify-between items-center bg-gray-200">
            <span>Pieces</span>
            <span>{getTotalPieces()}</span>
          </div>
          <div className="p-2 md:w-1/2 flex justify-between items-center bg-gray-200">
            <span>Bags</span>
            <span>{numberOfBags()}</span>
          </div>
        </div>
        <div className="bg-gray-200 flex justify-between p-2">
          <input
            type="text"
            className="w-full outline-none bg-transparent"
            placeholder="Notes"
          />
          <div className="flex items-center gap-1">
            <label htmlFor="save">Save</label>
            <input
              type="checkbox"
              name="save"
              id="save"
              className="toggle toggle-sm toggle-primary"
            />
          </div>
        </div>
        <div className="relative flex gap-2">
          <button
            className="btn btn-success text-base text-white flex-grow"
            onClick={handleOpenPaymentModal}
          >
            <span>Submit</span>
            <span>NGN{roundToTwoDecimalPlaces(selectTotalPrice())}</span>
          </button>
          <button
            type="button"
            className="rounded-md w-12 flex items-center justify-center bg-blue-200 text-blue-500 active:translate-y-[1px] transform transition-all"
            onClick={handleOpenPopUp}
          >
            {deliveryOption === "inStore" ? (
              <BiTime />
            ) : deliveryOption === "pickup" ? (
              <BiCalendar />
            ) : deliveryOption === "pickupAndDelivery" ? (
              <FiTruck />
            ) : (
              <BiCalendarCheck />
            )}
          </button>
          <TimePickerPopup
            handleDeliveryOptionChange={handleDeliveryOptionChange}
            deliveryOption={deliveryOption}
          />
          <button
            type="button"
            className="rounded-md w-12 flex items-center justify-center bg-blue-200 text-blue-500 active:translate-y-[1px] transform transition-all"
            onClick={handlePaymentInfoPopUp}
          >
            {isPaymentInfoPopUp ? <BiArrowToBottom /> : <BiArrowToTop />}
          </button>

          <PaymentInfoPopUp />
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderInfo;
