import ParentProductCard from "./ParentProductCard";
import WeightProductCard from "./WeightProductCard";
import NormalProductCard from "./NormalProductCard";

const ProductCard = ({ product, productType }) => {
  console.log(productType);
  const isParentProduct = productType === "parent";
  const isWeightProduct = productType === "weight" && !product.parent;
  const isNormalProduct = productType === "normal" && !product.parent;

  return (
    <div>
      {isParentProduct && (
        <ParentProductCard
          childProducts={product?.children}
          product={product}
        />
      )}
      {isWeightProduct && <WeightProductCard product={product} />}
      {isNormalProduct && <NormalProductCard product={product} />}
    </div>
  );
};

export default ProductCard;
