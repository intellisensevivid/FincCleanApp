import { useEffect, useRef, useState } from "react";
import PermissionBox from "./permissionBox";
import { useGetUserRolesQuery } from "../userApiSlice";
import { permissionData } from "../../../../config/permission";

const UserFormModal = ({
  userData,
  formType,
  permissions,
  onSave,
  onClose,
  isOpen,
  error,
}) => {
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    password: userData?.password || "",
    role: userData?.role.name || "",
    hourlyRate: userData?.hourlyRate || "",
    monthlyPay: userData?.monthlyPay || "",
    weeklyHours: userData?.weeklyHours || "",
    phoneNumber: userData?.phoneNumber || "",
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const {
    data: Roles,
    isLoading: isRolesLoading,
    isSuccess: isRolesSuccess,
    isError: isRolesError,
  } = useGetUserRolesQuery();

  useEffect(() => {
    setFormData({
      fullName: userData?.fullName || "",
      email: userData?.email || "",
      password: userData?.password || "",
      role: userData?.role.name || "",
      hourlyRate: userData?.hourlyRate || "",
      monthlyPay: userData?.monthlyPay || "",
      weeklyHours: userData?.weeklyHours || "",
      phoneNumber: userData?.phoneNumber || "",
    });
  }, [userData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      permissions: selectedPermissions,
    }));
  }, [selectedPermissions, setSelectedPermissions]);

  const handleCheckboxChange = (permission) => {
    const isSelected = selectedPermissions.includes(permission);
    if (isSelected) {
      setSelectedPermissions(
        selectedPermissions.filter((p) => p !== permission)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      if (value === "admin") {
        setSelectedPermissions([...permissions]);
      } else if (value === "employee") {
        setSelectedPermissions(["Edit Orders"]);
      } else if (value === "manager") {
        setSelectedPermissions([...permissions]);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = () => {
    onSave(formData);
  };

  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // alert("clicked1");
      console.log(modalRef.current);
      console.log(event.target);
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        alert("clicked");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" fixed z-10 inset-0 h-full bg-gray-700 bg-opacity-50 text-sm md:text-base ">
      <div
        className="flex items-center justify-center p-4 md:p-8"
        ref={modalRef}
      >
        <div className="relative bg-gray-200 min-w-80 md:w-3/5 p-4 md:p-8 rounded-lg shadow-lg  h-[600px] overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="">
              {formType === "add" ? (
                <h2 className="text-2xl md:text-3xl font-semibold">Add User</h2>
              ) : (
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Edit User
                </h2>
              )}
            </div>
            <div className="absolute top-0 right-0 pt-2 pr-4">
              <button
                onClick={onClose}
                className="text-gray-800 hover:text-gray-200 hover:bg-red-500 p-2 rounded-full"
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
          </div>

          <div>
            {error && (
              <div className="bg-red-500 p-1.5 text-center text-white rounded-lg break-words w-8/12 mx-auto">
                <p>{error}</p>
              </div>
            )}
            <form>
              {/* user details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                  />
                  {validationErrors.name && (
                    <span className="block text-sm mt-2 text-red-500">
                      {validationErrors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete={false}
                    value={formData.email}
                    onChange={handleChange}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                  />
                  {validationErrors.email && (
                    <span className="block text-sm mt-2 text-red-500">
                      {validationErrors.email}
                    </span>
                  )}
                </div>
                {formType === "add" ? (
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 font-semibold"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={formData.password}
                      className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                    />
                    {validationErrors.password && (
                      <span className="block text-sm mt-2 text-red-500">
                        {validationErrors.password}
                      </span>
                    )}
                  </div>
                ) : null}

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 font-semibold"
                  >
                    phoneNumber
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                  />
                  {validationErrors.phoneNumber && (
                    <span className="block text-sm mt-2 text-red-500">
                      {validationErrors.phoneNumber}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="role" className="block mb-2 font-semibold">
                    role
                  </label>
                  <select
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                    className="bg-white p-1.5"
                  >
                    <option value="">Select a role</option>

                    {isRolesLoading && <h1>Loading...</h1>}

                    {isRolesSuccess &&
                      Roles.data.map((role) => (
                        <option key={role._id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    {isRolesError && <h1>Error loading roles</h1>}
                  </select>
                  {validationErrors.role && (
                    <span className="block text-sm mt-2 text-red-500">
                      {validationErrors.role}
                    </span>
                  )}
                </div>
              </div>

              {/* pay details and role */}

              <div>
                <div>
                  <label className="" htmlFor="hourlyRate">
                    Hourly rate
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.hourlyRate}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                    name="hourlyRate"
                    id="hourlyRate"
                  />
                </div>

                <div>
                  <label className="" htmlFor="monthlyPay">
                    Monthly Pay
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.monthlyPay}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                    name="monthlyPay"
                    id="monthlyPay"
                  />
                </div>

                <div>
                  <label className="" htmlFor="weeklyHours">
                    Weekly Hours
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData.weeklyHours}
                    className="input w-full outline-offset-0 border-none focus-visible:outline-gray-300 bg-gray-300 focus:bg-gray-100"
                    name="weeklyHours"
                    id="weeklyHours"
                  />
                </div>
              </div>

              {/* permission */}
              <div className="mt-2">
                <h2 className="block mb-1 font-semibold">Permission</h2>
                <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                  {permissions.map((permission) => (
                    <div
                      key={permission}
                      className="p-1.5 bg-gray-300 my-1 rounded-lg"
                    >
                      <label className="flex justify-between items-center">
                        {permission}
                        <input
                          type="checkbox"
                          value={permission}
                          checked={selectedPermissions.includes(permission)}
                          onChange={() => handleCheckboxChange(permission)}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                className="bg-blue-500 p-2 text-white rounded-lg mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
