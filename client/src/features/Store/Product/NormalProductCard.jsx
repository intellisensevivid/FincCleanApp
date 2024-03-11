import { useDispatch, useSelector } from "react-redux";
import { setOrderItems } from "../Order/orderSlice";

const NormalProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.order);

  let item = items.find((item) => item.product === product._id);

  let itemQuantity = item ? item.quantity : 0;

  const incrementQuantity = () => {
    dispatch(
      setOrderItems({ product: product._id, quantity: itemQuantity + 1 })
    );
  };

  const decrementQuantity = () => {
    dispatch(
      setOrderItems({ product: product._id, quantity: itemQuantity - 1 })
    );
  };

  return (
    <div className="flex flex-col justify-between text-xs bg-gray-100 w-full h-36 md:h-40 overflow-hidden shadow-md rounded-md cursor-pointer">
      <div
        className="flex flex-col justify-center flex-grow p-2 items-center"
        onClick={incrementQuantity}
      >
        <span className="text-center">{product.name}</span>
        <img
          src=""
          alt={product ? product.name : ""}
          className="object-cover"
        />
      </div>
      {itemQuantity > 0 && (
        <div className="flex">
          <span className="w-1/2 block text-sm text-center p-1 rounded-es-md bg-blue-500 text-white">
            {itemQuantity}
          </span>
          <span
            className="text-center flex-grow bg-gray-200 p-1 rounded-ee-md"
            onClick={decrementQuantity}
          >
            -
          </span>
        </div>
      )}
    </div>
  );
};

export default NormalProductCard;
