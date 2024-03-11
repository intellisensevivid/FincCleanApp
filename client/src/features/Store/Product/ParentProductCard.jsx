import { useDispatch } from "react-redux";
import {
  toggleParentProductModal,
  setChildProducts,
  setParentProductName,
} from "../../../app/modalSlice";

const ParentProductCard = ({ childProducts, product }) => {
  const dispatch = useDispatch();

  console.log(childProducts, "childproduct");
  const handleClick = () => {
    dispatch(setChildProducts(childProducts));
    dispatch(setParentProductName(product.name));
    dispatch(toggleParentProductModal());
  };

  return (
    <div
      className="flex flex-col bg-gray-100 text-xs justify-center items-center w-full h-36 md:h-40 p-2 overflow-hidden shadow-md rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-center">{product.name}</span>
      <img
        src={childProducts ? childProducts[0].image : ""}
        alt={product?.name || ""}
        className="object-cover"
      />
    </div>
  );
};

export default ParentProductCard;
