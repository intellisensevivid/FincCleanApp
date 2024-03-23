import { useState } from "react";
import ManageUser from "./component/ManageUser";
import Sidebar from "./component/Sidebar";
import { useGetStoreUsersQuery } from "./userApiSlice";

const UserPage = () => {
  const [tab, setTab] = useState("manage");
  // get store users and then pass it to manageUser
  const { data, isLoading, isError, isSuccess } = useGetStoreUsersQuery();

  console.log(data, isLoading, isError, isSuccess);
  let content;
  if (isLoading) {
    content = <h1>Loading....</h1>;
  }
  if (isError) {
    content = <h1>sorry an error occured</h1>;
  }

  if (isSuccess) {
    content = (
      <div className="w-full">
        {
          tab === "manage" && <ManageUser users={data} />
          //   tab === "edit" && <Dashboard />
        }
      </div>
    );
  }
  return (
    <div className=" py-16 px-4 md:px-8">
      <div className="flex gap-2">
        {/* sidebar */}
        <Sidebar onClick={(type) => setTab(type)} />
        {/* middle section */}

        <>{content}</>
      </div>
    </div>
  );
};

export default UserPage;
