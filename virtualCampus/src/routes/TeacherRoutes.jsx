import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import TeacherDash from '../pages/Teacher/TeacherDash';
import TeacherSignup from '../pages/Teacher/TeacherSignup';
import TeacherSignin from '../components/teacher/TeacherSignin';
import AddCourse from '../components/teacher/AddCourse';
import ForgetPassword from '../components/common/ForgetPassword';
import CourseDetails from '../components/teacher/CourseDetails';
import SingleCourseDetails from '../components/teacher/SingleCourseDetails';
import AllCourses from '../components/teacher/AllCourses';

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route index element={<TeacherDash />} />
      <Route path="signup" element={<TeacherSignup />} />
      <Route path="signin" element={<TeacherSignin />} />
      <Route path="add-course" element={<AddCourse />} />
      <Route path="forget-password" element={<ForgetPassword teacher={true} />} />
      <Route path="courseDetails" element={<CourseDetails />} />
      <Route path="courseDetails/:id" element={<SingleCourseDetails />} />
      <Route path="allCourses" element={<AllCourses />} />


  
    </Routes>
  )
}

export default TeacherRoutes
