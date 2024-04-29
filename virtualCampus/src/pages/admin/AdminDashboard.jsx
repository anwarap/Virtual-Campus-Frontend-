import React from 'react'
import AdminSideBar from '../../components/admin/AdminSideBar'

const AdminDashboard = () => {
  return (
    <>
    <section className='flex gap-6 bg-gray-200'>
      <AdminSideBar />
      <div className="text-2xl  w-full mt-7">
          <h1 className=" text-2lg font-bold m-4">Welcome Admin,</h1>
          
      </div>

    </section>
    </>
  )
}

export default AdminDashboard
