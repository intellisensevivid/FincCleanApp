import React, { useEffect, useState } from "react";

function ShiftForm({ data, formType, onCLose, users, submit, error }) {
  const [selectUser, setSelectUser] = useState("");
  const [formData, setFormData] = useState({
    user: data?.user || "",
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
    date: data?.date || "",
    task: data?.task || "",
  });

  console.log(formData);
  console.log(users);
  useEffect(() => {
    setFormData({
      user: data?.user || users?.data[0]._id || "",
      startTime: data?.startTime || "",
      endTime: data?.endTime || "",
      date: data?.date || "",
      task: data?.task || "",
    });
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    submit(formData);
  };
  return (
    <div className=" fixed z-10 inset-0 h-full bg-gray-700 bg-opacity-50 text-sm md:text-base ">
      <div className="flex items-center justify-center p-4 md:p-8">
        <div className="relative bg-gray-200 min-w-80 md:w-3/5 p-4 md:p-8 rounded-lg shadow-lg  h-[600px] overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="">
              {formType === "add" ? (
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Create Shift
                </h2>
              ) : (
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Edit Shift
                </h2>
              )}
            </div>
            <div className="absolute top-0 right-0 pt-2 pr-4">
              <button
                onClick={() => onCLose()}
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
          </div>
          <form>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="block mb-2 font-semibold">Select Staff</label>
                <select
                  value={formData.user._id}
                  onChange={handleChange}
                  name="user"
                  className="bg-gray-300 p-1.5"
                >
                  {/* <option>Select Staff</option> */}
                  {users.data.map((user, i) => {
                    return (
                      <option
                        value={user._id}
                        key={user._id}
                        onClick={(e) => setSelectedUser(e.target.value)}
                      >
                        {user.fullName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block mb-2 font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="date"
                  value={formData.date}
                  id="date"
                  className="rounded-lg p-1.5 w-full outline-offset-0 border-none bg-gray-300 focus:bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block mb-2 font-semibold">
                  Clock in
                </label>
                <input
                  type="datetime-local"
                  onChange={handleChange}
                  name="startTime"
                  value={formData.startTime}
                  id="startTime"
                  className="rounded-lg p-1.5 w-full outline-offset-0 border-none bg-gray-300 focus:bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block mb-2 font-semibold">
                  Clock out
                </label>
                <input
                  type="datetime-local"
                  onChange={handleChange}
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  className="rounded-lg p-1.5 w-full outline-offset-0 border-none bg-gray-300 focus:bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="task" className="block mb-2 font-semibold">
                Message
              </label>
              <textarea
                className="rounded-lg p-2.5 w-full outline-offset-0 border-none bg-gray-300 focus:bg-gray-100 resize-none "
                onChange={handleChange}
                name="task"
                value={formData.task}
              ></textarea>
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
  );
}

export default ShiftForm;
