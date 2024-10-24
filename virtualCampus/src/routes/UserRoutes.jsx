import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from '../pages/user/Home';
import Signup from '../pages/user/Signup';
import Signin from '../components/user/Signin';
import ForgetPassword from '../components/common/ForgetPassword';
import Courses from '../pages/user/Courses';
import CourseDetails from '../components/user/CourseDetails';
import UserProfile from '../components/user/UserProfile';

const UserRoutes = () => {
  return (
   <Routes>
    <Route path="/user" element={<Home />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/signin" element={<Signin/>} />
      <Route path="/user/forget-password" element={<ForgetPassword teacher={false}/>} />
      <Route path="/user/course" element={<Courses/>} />
      <Route path="/user/courseDetails/:id" element={<CourseDetails />} />
      <Route path="/user/profile" element={<UserProfile/>} />

   </Routes>
  )
}

export default UserRoutes
