import React from 'react'
import Header from '../../components/user/Header'
import UserCourses from '../../components/user/UserCourses'

const Courses = () => {
  return (
    <>
         <Header />
         <div className="text-2xl w-full flex justify-center">
    <h1 className="mt-5 text-lg sm:text-2xl font-bold m-4 underline">COURSES</h1>
  </div>
        <section className="flex gap-6 ">
        {/* <AdminSideBar /> */}
        <div className="text-2xl  w-full mt-7">
         
          <UserCourses />
          </div>
        </section>
    </>
  )
}

export default Courses
