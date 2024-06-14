import React, { useState } from 'react'
import OTPInput from './OTPInput';
import { forgetPassword1,forgetPassword2 } from '../../api/userapi';
import {TforgetPassword1,TforgetPassword2} from '../../api/teacherapi';
import ForgetPasswordFinal from './ForgetPasswordFinal';
import { toast } from 'react-toastify';
const ForgetPassword = ({teacher}) => {

    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('');
    const [next,setNext] = useState(false);
    const [final,setFinal] = useState(false);

    const handleEmail = async(e)=>{
        e.preventDefault();
        const obj = {
            email,
            username:email
        }
        if(teacher){
          const response = await TforgetPassword1(obj)
          if(response?.status == 200){
            console.log('dadad')
            setNext(true)
            
        }
        }else{

          const response = await forgetPassword1(obj)
          if(response?.status == 200){
  
              setNext(true)
              
          }
        }
        
    }

    const handleOtpchange = (otp)=>{
        setOtp(otp);
    }

    const submitOtp = async(e)=>{
        e.preventDefault();
        const data = {
          otp: otp,
        }
        if(teacher){
          const response = await TforgetPassword2(data);
          if(response?.status == 200){
            console.log('adada')
            setFinal(true)}
        }else{
          const response = await forgetPassword2(data);
          if(response?.status == 200){
            setFinal(true)}

        }
    }
  return (
    <div>
      <div>
    <main
        id="content"
        role="main"
        className="w-full max-w-md mx-auto p-6"
      >
        <div className="mt-7 bg-white  rounded-xl shadow-lg ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="flex justify-center text-2xl font-bold">
                Forgot password?
              </h1>
              
            </div>
            {final != true ? (
              !next ? (
              
                <div className="mt-5">
                  <form onSubmit={handleEmail}>
                    <div className="grid gap-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold ml-1 mb-2 "
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                            aria-describedby="email-error"
                          />
                        </div>
                        {/* <p
                          className="hidden text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p> */}
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                      >
                        Reset password
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="w-full">
                  <form onSubmit={submitOtp}>
                    <OTPInput onOTPChange={handleOtpchange} />
                    <div className='mb-10 mt-5'>

                    <button className="border-primary w-full cursor-pointer rounded-md border bg-3447AE py-3 px-5 text-base text-white transition hover:bg-opacity-90" type="submit" style={{ backgroundColor: "#3447AE" }}>Submit</button>
                    </div>
                  </form>
                </div>
                
              )
            ) : (
                <ForgetPasswordFinal email={email} teacher={teacher} />
            )}
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default ForgetPassword
