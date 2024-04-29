import React from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'
import Teachers from '../../components/admin/Teachers'

const TeacherManagment = () => {
  return (
    <div>
      <section className="flex gap-6 bg-gray-200">
        <AdminSideBar />
        <div className="text-2xl  w-full mt-7">
          <h1 className=" text-2lg font-bold m-4">Teacher Management</h1>
          <Teachers />
        </div>
      </section>
    </div>
  )
}

export default TeacherManagment
