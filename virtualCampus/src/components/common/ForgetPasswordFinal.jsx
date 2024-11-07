import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {  forgetPasswordFinal } from '../../api/userapi';
import { TforgetPasswordFinal } from '../../api/teacherapi';
import { toast } from 'react-toastify';

const ForgetPasswordFinal = ({email,teacher}) => {
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');

    const navigate = useNavigate()
   
    const handlePassword  = async (e)=>{
        e.preventDefault();
        if(password != cpassword){
          return  toast.error("Passwords do not match")
         }
        const data = {
            email,
            password,
        }
       
        if(teacher){
          const response = await TforgetPasswordFinal(data);
          if(response?.status ==200){
            navigate('/teacher/signin')
            
          }
        }else{

          const response = await forgetPasswordFinal(data);
          console.log(response,'sfs')
          
          if(response?.status ==200){
            navigate('/user/signin')
            
          }
        }

    }
  return (
    <div>
      <div>
        <form onSubmit={handlePassword}>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              name="password_confirmation"
              className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-10 mt-5">
            
          <button
            className="border-primary w-full cursor-pointer rounded-md border bg-3447AE py-3 px-5 text-base text-white transition hover:bg-opacity-90"
            type="submit"
            style={{ backgroundColor: "#3447AE" }}
            >
            Change Password
          </button>
            </div>
          
        </form>
      </div>
    </div>
  )
}

export default ForgetPasswordFinal
