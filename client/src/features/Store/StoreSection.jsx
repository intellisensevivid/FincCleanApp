import { useSelector } from "react-redux";
import ProductCard from "./Product/ProductCard";
import ParentProductModal from "./Product/ParentProductModal";
import { useGetStoreProductsQuery } from "./Product/productApiSlice";

const emptyArray = [];

const StoreSection = () => {
  // const dispatch = useDispatch();
  const { selectedSection } = useSelector((state) => state.store);
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

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log("products: ", products);
  }

  // const handleSectionClick = (section) => {
  //   dispatch(setSelectedSection(section));
  // };

  // const sections = [
  //   {
  //     _id: "65d5e927bf8db7e299ece474",
  //     name: "washDryFold",
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:14:31.107Z",
  //     updatedAt: "2024-02-21T12:14:31.107Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5e9f0bf8db7e299ece478",
  //     name: "retail",
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:17:52.403Z",
  //     updatedAt: "2024-02-21T12:17:52.403Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5e9ffbf8db7e299ece47c",
  //     name: "pickupAndDelivery",
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:18:07.624Z",
  //     updatedAt: "2024-02-21T12:18:07.624Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5e9ffbf8db7e299ece47d",
  //     name: "alterationsAndRepair",
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:18:07.624Z",
  //     updatedAt: "2024-02-21T12:18:07.624Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5e9ffbf8db7e299ece47e",
  //     name: "dryCleaning",
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:18:07.624Z",
  //     updatedAt: "2024-02-21T12:18:07.624Z",
  //     __v: 0,
  //   },
  // ];

  // const products = [
  //   {
  //     _id: "65d5efec7a44ab0fd49c8ecd",
  //     name: "Large Flat Rate Bag",
  //     section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //     productType: "normal",
  //     children: null,
  //     price: 500,
  //     expressPrice: 700,
  //     piecePerProduct: 1,
  //     extraDays: 0,
  //     upcharge: 0,
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:43:24.341Z",
  //     updatedAt: "2024-02-21T12:43:24.341Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5efec7a44ab0fd49c8ecb",
  //     name: "Laundry",
  //     section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //     productType: "parent",
  //     price: 500,
  //     children: [
  //       {
  //         _id: "65d5f24eabc744ee549ee143",
  //         name: "premium laundry",
  //         section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //         productType: "weight",
  //         parent: { _id: "65d5efec7a44ab0fd49c8ecb", name: "Laundry" },
  //         children: [],
  //         price: 700,
  //         expressPrice: 1000,
  //         piecePerProduct: 1,
  //         extraDays: 0,
  //         upcharge: 0,
  //         business: "65cf7c47f9107de57ceab49d",
  //         createdAt: "2024-02-21T12:53:34.339Z",
  //         updatedAt: "2024-02-21T13:04:26.057Z",
  //         __v: 0,
  //       },
  //       {
  //         _id: "65d5f24eabc744ee549ee144",
  //         name: "laundry",
  //         section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //         productType: "weight",
  //         parent: { _id: "65d5efec7a44ab0fd49c8ecb", name: "Laundry" },
  //         children: [],
  //         price: 700,
  //         expressPrice: 1000,
  //         piecePerProduct: 1,
  //         extraDays: 0,
  //         upcharge: 0,
  //         business: "65cf7c47f9107de57ceab49d",
  //         createdAt: "2024-02-21T12:53:34.339Z",
  //         updatedAt: "2024-02-21T13:04:26.057Z",
  //         __v: 0,
  //       },
  //     ],
  //     expressPrice: 700,
  //     piecePerProduct: 1,
  //     extraDays: 0,
  //     upcharge: 0,
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:43:24.341Z",
  //     updatedAt: "2024-02-21T12:43:24.341Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5f1277a44ab0fd49c8ed0",
  //     name: "Bags",
  //     section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //     productType: "normal",
  //     children: null,
  //     price: 300,
  //     expressPrice: 500,
  //     piecePerProduct: 1,
  //     extraDays: 1,
  //     upcharge: 0,
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:48:39.609Z",
  //     updatedAt: "2024-02-21T12:48:39.609Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "65d5f24eabc744ee549ee143",
  //     name: "premium laundry",
  //     section: { _id: "65d5e927bf8db7e299ece474", name: "washDryFold" },
  //     productType: "weight",
  //     parent: { _id: "65d5efec7a44ab0fd49c8ecb", name: "Laundry" },
  //     children: [],
  //     price: 700,
  //     expressPrice: 1000,
  //     piecePerProduct: 1,
  //     extraDays: 0,
  //     upcharge: 0,
  //     business: "65cf7c47f9107de57ceab49d",
  //     createdAt: "2024-02-21T12:53:34.339Z",
  //     updatedAt: "2024-02-21T13:04:26.057Z",
  //     __v: 0,
  //   },
  // ];

  const productsPerSection = (section) => {
    return products.filter((product) => product.section._id === section);
  };

  return (
    <section className="relative h-full">
      <section className="relative h-3/5 min-h-80 md:min-h-80 overflow-y-auto bg-gray-200 mt-2 leading-normal">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2 h-full">
          {productsPerSection(selectedSection).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              productType={product?.productType}
            />
          ))}
        </div>
        <ParentProductModal />
      </section>
    </section>
  );
};

export default StoreSection;
