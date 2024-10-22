import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from '../pages/user/Home';
import Signup from '../pages/user/Signup';
import Signin from '../components/user/Signin';
import ForgetPassword from '../components/common/ForgetPassword';

const UserRoutes = () => {
  return (
   <Routes>
    <Route path="/user" element={<Home />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/signin" element={<Signin/>} />
      <Route path="/user/forget-password" element={<ForgetPassword teacher={false}/>} />
   </Routes>
  )
}

export default UserRoutes
