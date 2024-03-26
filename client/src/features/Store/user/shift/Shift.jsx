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
import PopupModal from "../../../../components/PopupModal";
import { formatDate, formatTime } from "../../../../utils/date";

function Shift({ users }) {
  const columns = [
    { Header: "Name", accessor: "user.fullName" },
    { Header: "Clock-in", accessor: "startTime" },
    { Header: "Clock-out", accessor: "endTime" },
    { Header: "Date", accessor: "date" },
    { Header: "Message", accessor: "task" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [formError, setFormError] = useState("");
  const [selectedShift, setSelectedShift] = useState();

  const [createShift, { isSuccess: createSuccess, error: createError }] =
    useCreateShiftMutation();
  const [editShift, { isSuccess: editSuccess, error: editError }] =
    useEditShiftMutation();
  const [deleteShift] = useDeleteShiftMutation();
  const { data, isSuccess, isLoading, isError, error } = useGetAllSHiftsQuery();

  let content;

  if (isError) {
    content = <h1>An error occured</h1>;
  }
  if (isLoading) {
    content = <FaSpinner className=" animate-spin text-blue-500" />;
  }

  const showDeleteConfirmation = (data) => {
    setSelectedShift(data);
    PopupModal({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete shift?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteShift(data),
        },
        {
          label: "No",
        },
      ],
      options: {
        onClose: () => console.log("Modal closed"),
      },
    });
  };

  const handleEditShift = (shiftdata) => {
    setFormType("edit");
    setSelectedShift(shiftdata);
    setIsModalOpen(true);
  };
  const handleDeleteShift = async (shiftdata) => {
    const res = await deleteShift({
      shiftId: shiftdata._id,
    }).unwrap();
  };

  if (isSuccess) {
    const formattedData =
      data.data.length > 0
        ? data.data.map((item) => ({
            ...item,
            date: formatDate(item.date),
            startTime: formatTime(item.startTime),
            endTime: formatTime(item.endTime),
            createdAt: formatDate(item.createdAt),
            updatedAt: formatDate(item.updatedAt),
          }))
        : [];

    content =
      data.data.length > 0 ? (
        <UserTable
          columns={columns}
          data={formattedData}
          onEdit={handleEditShift}
          onDelete={showDeleteConfirmation}
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
        const shift = await createShift(mutatedData).unwrap();
        setIsModalOpen(false);
      } else if (formType === "edit") {
        const shift = await editShift({
          shiftId: selectedShift._id,
          body: mutatedData,
        }).unwrap();
        setIsModalOpen(false);
      }
    } catch (error) {
      let errorMessage = error || editError || createError;
      setFormError(errorMessage.data.error.details[0].message || error.message);
      setTimeout(() => {
        setFormError();
      }, 4000);
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Users Hours</h1>
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
          data={formType === "edit" ? selectedShift : null}
          formType={formType}
          submit={handleSubmit}
          error={formError}
        />
      )}
    </div>
  );
}

export default Shift;
