import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from '../pages/user/Home';
import Signup from '../pages/user/Signup';
import Signin from '../components/user/Signin';
import ForgetPassword from '../components/common/ForgetPassword';
import Courses from '../pages/user/Courses';
import CourseDetails from '../components/user/CourseDetails';
import UserProfile from '../components/user/UserProfile';
import Success from '../components/common/Success';

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
      <Route path="/user/success" element={<Success/>} />


   </Routes>
  )
}

export default UserRoutes
