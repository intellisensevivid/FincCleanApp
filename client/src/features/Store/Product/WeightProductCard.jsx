import { useDispatch, useSelector } from "react-redux";
import {
  toggleWeightProductModal,
  setWeightProductId,
} from "../../../app/modalSlice";

const WeightProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.order);

  const openModal = () => {
    dispatch(toggleWeightProductModal());
    dispatch(setWeightProductId(product._id));
  };

  let item = items.find((item) => item.product === product._id);

  let quantity = item ? item.quantity : 0;

  return (
    <div
      className="flex flex-col bg-gray-100 text-xs w-full h-36 md:h-40 overflow-hidden shadow-md rounded-md cursor-pointer"
      onClick={openModal}
    >
      <div className="flex flex-col p-2 justify-center flex-grow items-center">
        <span className="text-center">{product.name}</span>
        <img
          src=""
          alt={product ? product.name : ""}
          className="object-cover"
        />
      </div>
      {quantity > 0 && (
        <div className="flex">
          <span className="w-1/2 block text-sm p-1 text-center rounded-es-md rounded-se-md bg-blue-500 text-white">
            {Math.round(quantity)}
          </span>
        </div>
      )}
    </div>
  );
};

export default WeightProductCard;
