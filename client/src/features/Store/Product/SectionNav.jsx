import { useDispatch, useSelector } from "react-redux";
import { translateString } from "../../../utils";
import CustomerInput from "../Customer/CustomerInput";
import { useGetStoreProductsQuery } from "./productApiSlice";
import { setSelectedSection } from "../storeSlice";

const emptyArray = [];

const SectionNav = () => {
  const {
    data: sections,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoreProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      data: data?.sections ?? emptyArray,
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const { selectedSection } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  const handleSectionClick = (section) => {
    dispatch(setSelectedSection(section));
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log(sections);
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4">
        <CustomerInput />
      </div>
      <div className="col-span-12 md:col-span-8 md:order-first">
        <nav className="flex items-center overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section._id}
              onClick={() => handleSectionClick(section._id)}
              className={`rounded-md px-4 py-2 shrink-0 ${
                selectedSection === section._id
                  ? "bg-blue-500 text-white font-bold"
                  : "text-gray-700 font-semibold"
              }`}
            >
              {translateString(section.name)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionNav;
