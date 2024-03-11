import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleParentProductModal,
  setChildProducts,
  closeParentProductModal,
} from "../../../app/modalSlice";
import WeightProductCard from "./WeightProductCard";
import NormalProductCard from "./NormalProductCard";

const ParentProductModal = () => {
  const { isParentProductModal, childProducts, parentProductName } =
    useSelector((state) => state.modal);
  const { selectedSection } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleParentProductModal());
    dispatch(setChildProducts(null));
  };

  useEffect(() => {
    dispatch(closeParentProductModal());
  }, [dispatch, selectedSection]);

  return (
    <div>
      {isParentProductModal && (
        <div className="absolute z-10 inset-0 h-full bg-gray-700 bg-opacity-50">
          <div className="flex items-center justify-center h-full">
            <div className="relative h-64 flex flex-col bg-gray-200 min-w-80 md:min-w-96 p-4 md:p-8 rounded-lg shadow-lg">
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
              <div className="">
                <h2 className="text-3xl font-semibold">{parentProductName}</h2>
              </div>
              <div className="mt-8 overflow-y-auto">
                <ul className="flex flex-col w-1/2 gap-4">
                  {childProducts &&
                    childProducts.length &&
                    childProducts.map((childProduct) =>
                      childProduct.productType === "weight" ? (
                        <WeightProductCard
                          key={childProduct._id}
                          product={childProduct}
                        />
                      ) : (
                        <NormalProductCard
                          key={childProduct._id}
                          product={childProduct}
                        />
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentProductModal;
