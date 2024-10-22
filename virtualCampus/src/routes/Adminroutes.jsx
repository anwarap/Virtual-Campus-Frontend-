import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLogin from '../pages/admin/AdminLogin';
import UsersManagement from '../pages/admin/UsersManagement';
import TeacherManagment from '../pages/admin/TeacherManagment';
import Category from '../pages/admin/Category';
import CourseManagement from '../pages/admin/CourseManagement';
import PendingCourses from '../pages/admin/PendingCourses';
import CourseDetails from '../pages/admin/CourseDetails';
import NotFound from '../components/common/NotFound';



const Adminroutes = () => {
  return (
   <Routes>
      <Route index element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<UsersManagement />} />
      <Route path="teachers" element={<TeacherManagment />} />
      <Route path="category" element={<Category />} />
      <Route path="courses" element={<CourseManagement />} />
      <Route path="pending-courses" element={<PendingCourses />} />
      <Route path="courses/:id" element={<CourseDetails />} />


      {/* Handle unmatched routes */}
      <Route path="*" element={<NotFound />} />

      {/* Redirect to dashboard if the route is not specified */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      
   </Routes>
  )
}

export default Adminroutes
