import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import Users from "../../components/admin/Users";

const UsersManagement = () => {
  return (
    <div>
      <section className="flex gap-6 bg-gray-200">
        <AdminSideBar />
        <div className="text-2xl  w-full mt-7">
          <h1 className=" text-2lg font-bold m-4">User Management</h1>
          <Users />
        </div>
      </section>
    </div>
  );
};

export default UsersManagement;
