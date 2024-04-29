import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/user/Home';
import Header from './components/user/Header';
import Signup from './pages/user/Signup';
import Signin from './components/user/Signin';
import TeacherSignup from './pages/Teacher/TeacherSignup';
import TeacherDash from './pages/Teacher/TeacherDash';
import TeacherSignin from './components/teacher/TeacherSignin';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import TeacherManagment from './pages/admin/TeacherManagment';
import AddCourse from './components/teacher/AddCourse';




const App = () => {
  return (
  <BrowserRouter>

    <Routes>
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/users' element={<UsersManagement />} />
      <Route path='/admin/teachers' element={<TeacherManagment />} />



      <Route path="/user" element={<Home />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/signin" element={<Signin/>} />


      <Route path="/teacher" element={<TeacherDash />}/>
      <Route path="/teacher/signup" element={<TeacherSignup />}/>
      <Route path="/teacher/signin" element={<TeacherSignin />}/>
      <Route path="/teacher/add-course" element={<AddCourse />}/>


    </Routes>
  </BrowserRouter>
  )
}

export default App
