import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/user/Home';
import Header from './components/Header';
import Signup from './pages/user/Signup';
import Signin from './pages/user/Signin';


const App = () => {
  return (
  <BrowserRouter>

    <Routes>
      <Route path="/user" element={<Home />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/signin" element={<Signin />} />


    </Routes>
  </BrowserRouter>
  )
}

export default App
