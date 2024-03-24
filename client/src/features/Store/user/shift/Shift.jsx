import { useState } from "react";
import ShiftForm from "./ShiftForm";
import {
  useCreateShiftMutation,
  useDeleteShiftMutation,
  useEditShiftMutation,
  useGetAllSHiftsQuery,
} from "./shitApiSlice";
import { FaSpinner } from "react-icons/fa";
import UserTable from "../component/UserTable";

function Shift({ users }) {
  const columns = [
    { Header: "Name", accessor: "user" },
    { Header: "Email", accessor: "clock-in" },
    { Header: "Permission", accessor: "permissions.length" },
    { Header: "Role", accessor: "role.name" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [formError, setFormError] = useState("");
  const [selectedShift, setSelectedShift] = useState();

  const [createShift, { isSuccess: createSuccess, error: createError }] =
    useCreateShiftMutation();
  const [editShift, { isSuccess: editSuccess, error: editError }] =
    useEditShiftMutation();
  // const [deleteShift,{isLoading,isError,error}] = useDeleteShiftMutation()
  const { data, isSuccess, isLoading, isError, error } = useGetAllSHiftsQuery();

  let content;

  if (isError) {
    content = <h1>An error occured</h1>;
  }
  if (isLoading) {
    content = <FaSpinner className=" animate-spin text-blue-500" />;
  }
  if (isSuccess) {
    content =
      data.data.length > 0 ? (
        <UserTable
          columns={columns}
          data={data.data}
          onEdit={() => {
            setFormType("edit");
            setFormType(true);
          }}
        />
      ) : (
        <p className="bg-blue-300 text-blue-500 mt-3">No Data found</p>
      );
  }

  const handleSubmit = async (mutatedData) => {
    // make API call
    setFormError("");

    try {
      if (formType === "add") {
        const user = await createShift(mutatedData).unwrap();
        if (createSuccess) {
          setIsModalOpen(false);
        }
        console.log(user);
      } else if (formType === "edit") {
        const user = await editShift({
          userId: selectedShift._id,
          body: mutatedData,
        }).unwrap();
        if (editSuccess) {
          setIsModalOpen(false);
        }
        console.log(user);
      }
    } catch (error) {
      let errorMessage = error || editError || createError;
      setFormError(errorMessage.message || error.message);
      setTimeout(() => {
        setFormError();
      }, 4000);
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Manage Users account</h1>
        <button
          onClick={() => {
            setFormType("add");
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white button px-3 py-1.5 rounded-lg"
        >
          Create Shift
        </button>
      </div>
      {content}

      {isModalOpen && (
        <ShiftForm
          users={users}
          onCLose={() => setIsModalOpen(false)}
          data={data}
          formType={formType}
          submit={handleSubmit}
          error={formError}
        />
      )}
    </div>
  );
}

export default Shift;
