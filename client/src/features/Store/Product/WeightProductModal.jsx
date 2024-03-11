import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWeightProductId,
  toggleWeightProductModal,
} from "../../../app/modalSlice";
import {
  setWeightOrderItems,
  addWeightToOrder,
  deleteWeightFromOrder,
} from "../Order/orderSlice";
import { BiTrash } from "react-icons/bi";

const WeightProductModal = () => {
  const { isWeightProductModal, weightProductId } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.order);
  const weightRef = useRef();

  const closeModal = () => {
    dispatch(setWeightProductId(null));
    dispatch(toggleWeightProductModal());
    setFormData({
      currentWeight: 0,
    });
  };

  let item = items.find((item) => item.product === weightProductId);

  let bags = item ? item.bags : [];

  const [formData, setFormData] = useState({
    currentWeight: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (!formData.currentWeight) {
      return;
    }
    dispatch(
      setWeightOrderItems({
        product: weightProductId,
        bags: [parseFloat(formData.currentWeight)],
      })
    );
    weightRef.current.value = "";
    closeModal();
  };

  const handleAddWeight = () => {
    if (formData.currentWeight) {
      dispatch(
        addWeightToOrder({
          id: weightProductId,
          weight: parseFloat(formData.currentWeight),
        })
      );
      setFormData((prevData) => ({
        ...prevData,
        currentWeight: 0,
      }));
    } else {
      return;
    }
    weightRef.current.value = "";
  };

  const handleDeleteWeight = (index) => {
    dispatch(
      deleteWeightFromOrder({ productId: weightProductId, weightIndex: index })
    );
  };

  const handleNextBag = (e) => {
    e.preventDefault();
    handleAddWeight();
  };

  return (
    <>
      {isWeightProductModal && (
        <div className="fixed inset-0 z-10 bg-gray-700 bg-opacity-50 h-full overflow-y-auto">
          <div className="flex items-center justify-center h-full p-4 md:p-8">
            <div className="relative bg-gray-200 min-w-80 md:w-2/5 p-4 md:p-8 rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 pt-2 pr-4">
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
              <div className="mb-8">
                <h2 className="text-3xl font-semibold">Enter Weight</h2>
              </div>
              <div>
                <form className="" onSubmit={handleAddOrder}>
                  <div>
                    <div className="text-center">
                      <input
                        type="number"
                        name="currentWeight"
                        id="currentWeight"
                        min={0}
                        ref={weightRef}
                        placeholder={0}
                        className="input bg-gray-300 text-3xl font-bold w-1/3"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row justify-between items-center gap-8 mt-8">
                    <input
                      type="text"
                      name="notes"
                      id="notes"
                      placeholder="Notes"
                      className="input bg-gray-300"
                    />
                    <div className="w-1/2 flex justify-between gap-2 bg-gray-300 h-full p-3 rounded-lg">
                      <label htmlFor="wetWeight">Wet Weight</label>
                      <input
                        type="checkbox"
                        name="wetWeight"
                        id="wetWeight"
                        className=""
                      />
                    </div>
                  </div>
                  {bags && bags.length ? (
                    <ul className="mt-6">
                      {bags.map((weight, index) => (
                        <li
                          key={index}
                          className="mb-2 flex w-1/3 justify-between items-center"
                        >
                          <span>{Math.round(weight)}kg</span>
                          <button onClick={() => handleDeleteWeight(index)}>
                            <BiTrash className="text-red-500 text-xl" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="flex justify-between items-center mt-12">
                    <button
                      type="reset"
                      className="btn bg-gray-300 border-gray-300 text-gray-900 font-bold hover:bg-gray-400 hover:border-gray-400"
                    >
                      Reset
                    </button>
                    <div className="flex gap-4">
                      <button
                        className="btn bg-gray-300 border-gray-300 text-base text-gray-900 hover:bg-gray-400 hover:border-gray-400 font-bold"
                        onClick={handleNextBag}
                      >
                        Next Bag
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success text-base text-white font-bold"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeightProductModal;
