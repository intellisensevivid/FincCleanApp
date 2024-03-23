import { useState } from "react";
import UserFormModal from "./userFormModal";
import { permissionData } from "../../../../config/permission";
import { RiEdit2Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import UserTable from "./UserTable";
import {
  useEditStoreUserMutation,
  useAddStoreUserMutation,
} from "../userApiSlice";

function ManageUser({ users }) {
  const columns = [
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Permission", accessor: "permissions.length" },
    { Header: "Role", accessor: "role.name" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formType, setFormType] = useState("add");

  const [addStoreUser, { isLoading, isError, error }] =
    useAddStoreUserMutation();
  const [
    editStoreUser,
    { isLoading: eIsLoading, isError: eIsError, error: editError },
  ] = useEditStoreUserMutation();

  const handleEditUser = (user) => {
    setFormType("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = () => {
    setFormType("add");
    setIsModalOpen(true);
  };

  const handleSubmit = async (mutatedData) => {
    // make API call

    try {
      if (formType === "add") {
        const user = await addStoreUser(mutatedData).unwrap();
        // after this maybe add it to the list of user in the userslice
        console.log(user);
        setIsModalOpen(false);
      } else if (formType === "edit") {
        const user = await editStoreUser({
          userId: selectedUser._id,
          body: mutatedData,
        }).unwrap();
        // after this maybe edit it to the list of user in the userslice
        console.log(user);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full ">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl font-bold">Manage Users account</h1>
        <button
          onClick={() => handleAddUser()}
          className="bg-blue-500 text-white button px-3 py-1.5 rounded-lg"
        >
          Add User
        </button>
      </div>
      <div>
        {!users ? (
          <h1>No user data at the moment</h1>
        ) : (
          <UserTable
            columns={columns}
            data={users.data}
            onEdit={handleEditUser}
          />
        )}
        {/* {users.data.map((user) => {
          return (
            <div
              key={user._id}
              className="flex items-center justify-evenly mt-3 text-semibold"
            >
              <h1>{user.fullName}</h1>
              <h1>{user.email}</h1>
              <h1>{user.permissions.length}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleEditUser(user);
                    
                  }}
                >
                  <RiEdit2Line />
                </button>
                <FaTrash />
              </div>
            </div>
          );
        })} */}
      </div>

      {isModalOpen && (
        <UserFormModal
          userData={formType === "edit" ? selectedUser : null}
          loading={isLoading || eIsLoading}
          error={error || editError}
          formType={formType}
          permissions={permissionData}
          onSave={handleSubmit}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
}

export default ManageUser;