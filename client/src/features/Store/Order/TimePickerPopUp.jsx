import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTimePickerPopUp } from "../../../app/modalSlice";
import {
  addDeliveryDate,
  addDeliveryEndTime,
  addDeliveryStartTime,
  addPickupDate,
  addPickupEndTime,
  addPickupStartTime,
  addPickupTime,
} from "./orderSlice";
// import { BiTime } from 'react-icons/bi';

const TimePickerPopup = ({ deliveryOption, handleDeliveryOptionChange }) => {
  const { isTimePickerPopUp } = useSelector((state) => state.modal);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupStartTime, setPickupStartTime] = useState(new Date());
  const [pickupEndTime, setPickupEndTime] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [deliveryStartTime, setDeliveryStartTime] = useState(new Date());
  const [deliveryEndTime, setDeliveryEndTime] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setPickupDate(new Date());
    setPickupTime(new Date());
    setPickupStartTime(new Date());
    setPickupEndTime(null);
    setDeliveryDate(null);
    setDeliveryStartTime(new Date());
    setDeliveryEndTime(null);
    dispatch(addPickupDate(new Date().toString()));
    dispatch(addPickupTime(new Date().toString()));
    dispatch(addPickupStartTime(new Date().toString()));
    dispatch(addPickupEndTime(""));
    dispatch(addDeliveryDate(""));
    dispatch(addDeliveryStartTime(new Date().toString()));
    dispatch(addDeliveryEndTime(""));
  }, [deliveryOption, dispatch]);

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    console.log(date);
  };

  const handlePickupTimeChange = (time) => {
    setPickupTime(new Date());
    console.log(time);
  };

  const handlePickupAndDeliveryDateChange = (date) => {
    const [start, end] = date;
    setPickupDate(start);
    setDeliveryDate(end);
    console.log("start:", start, "end:", end);
    dispatch(addPickupDate(start.toString()));
    dispatch(addDeliveryDate(end.toString()));
  };

  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
    console.log(date);
    dispatch(addDeliveryDate(date.toString()));
  };

  const handlePickupStartTimeChange = (time) => {
    setPickupStartTime(time);
    console.log(time);
    const oneHourLater = new Date(time);
    oneHourLater.setHours(oneHourLater.getHours() + 1);
    setPickupEndTime(oneHourLater);
    dispatch(addPickupStartTime(time.toString()));
    dispatch(addPickupEndTime(oneHourLater.toString()));
  };

  const handleDeliveryStartTimeChange = (time) => {
    setDeliveryStartTime(time);
    console.log(time);
    const oneHourLater = new Date(time);
    oneHourLater.setHours(oneHourLater.getHours() + 1);
    setDeliveryEndTime(oneHourLater);
    dispatch(addDeliveryStartTime(time.toString()));
    dispatch(addDeliveryEndTime(oneHourLater.toString()));
  };

  const handlePickupEndTimeChange = (time) => {
    setPickupEndTime(time);
    console.log(time);
    dispatch(addPickupEndTime(time.toString()));
  };

  const handleDeliveryEndTimeChange = (time) => {
    setDeliveryEndTime(time);
    console.log(time);
    dispatch(addDeliveryEndTime(time.toString()));
  };

  const handleClose = () => {
    dispatch(toggleTimePickerPopUp());
  };

  return (
    <>
      {isTimePickerPopUp && (
        <div className="absolute w-full z-10 bottom-14  flex items-center justify-center bg-opacity-50 rounded-lg shadow-lg">
          <div className="bg-gradient-to-b from-gray-100 via-blue-50 to-blue-100 w-full h-full rounded-lg overflow-auto shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Select Order Type</h2>
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
              <div className="flex items-center gap-2">
                <select
                  id="deliveryOption"
                  value={deliveryOption}
                  onChange={handleDeliveryOptionChange}
                  className="select bg-gray-300"
                >
                  <option value="inStore">In-Store</option>
                  <option value="pickupAndDelivery">Pickup and Delivery</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              {deliveryOption === "inStore" && (
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex flex-col gap-2">
                    <label>Pickup Date:</label>
                    <DatePicker
                      selected={pickupDate}
                      onChange={handlePickupDateChange}
                      inline
                    />
                  </div>
                  <div className="flex flex-col gap-2 float-none">
                    <label>Pickup Time:</label>
                    <div className="flex gap-2">
                      <div>
                        <DatePicker
                          selected={pickupTime}
                          onChange={handlePickupTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeCaption="Time"
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {deliveryOption === "pickupAndDelivery" && (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex flex-col gap-2">
                    <label>Pickup/Delivery Date Range:</label>
                    <DatePicker
                      selected={pickupDate}
                      startDate={pickupDate}
                      endDate={deliveryDate}
                      onChange={handlePickupAndDeliveryDateChange}
                      selectsRange
                      inline
                    />
                  </div>
                  <div className="">
                    <div className="flex flex-row md:flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <label>Pickup Start Time:</label>
                        <DatePicker
                          selected={pickupStartTime}
                          onChange={handlePickupStartTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Pickup End Time:</label>
                        <DatePicker
                          selected={pickupEndTime}
                          onChange={handlePickupEndTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <label>Delivery Start Time:</label>
                        <DatePicker
                          selected={deliveryStartTime}
                          onChange={handleDeliveryStartTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Delivery End Time:</label>
                        <DatePicker
                          selected={deliveryEndTime}
                          onChange={handleDeliveryEndTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {deliveryOption === "pickup" && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <label>Pickup Date:</label>
                    <DatePicker
                      selected={pickupDate}
                      onChange={handlePickupDateChange}
                      inline
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Pickup Time Range:</label>
                    <div className="flex md:flex-col items-center gap-2">
                      <div>
                        <DatePicker
                          selected={pickupStartTime}
                          onChange={handlePickupStartTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                      <span>-</span>
                      <div>
                        <DatePicker
                          selected={pickupEndTime}
                          onChange={handlePickupEndTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {deliveryOption === "delivery" && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <label>Delivery Date:</label>
                    <DatePicker
                      selected={deliveryDate}
                      onChange={handleDeliveryDateChange}
                      inline
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Delivery Time Range:</label>
                    <div className="flex md:flex-col items-center gap-2">
                      <div>
                        <DatePicker
                          selected={deliveryStartTime}
                          onChange={handleDeliveryStartTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                      <span>-</span>
                      <div>
                        <DatePicker
                          selected={deliveryEndTime}
                          onChange={handleDeliveryEndTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          dateFormat="h:mm aa"
                          className="select w-32 bg-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimePickerPopup;
