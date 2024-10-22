import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css'
import Adminroutes from './routes/Adminroutes';
import UserRoutes from './routes/UserRoutes';
import TeacherRoutes from './routes/TeacherRoutes';



const App = () => {
  return (
  <BrowserRouter>

    <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<Adminroutes />} />
        <Route path="/teacher/*" element={<TeacherRoutes />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
