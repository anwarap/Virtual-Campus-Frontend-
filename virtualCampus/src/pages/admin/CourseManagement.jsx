import React from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import AdminAllCourses from '../../components/admin/AdminAllCourses';

const CourseManagement = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <section className="flex flex-col md:flex-row gap-6">
        <AdminSideBar />
        <div className="w-full mt-7">
          <h1 className="text-center text-2xl md:text-3xl font-bold m-4">All Courses</h1>
          <AdminAllCourses />
        </div>
      </section>
    </div>
  );
}

export default CourseManagement;
