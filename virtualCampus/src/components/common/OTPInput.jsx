import React, { useRef, useState } from 'react'

const OTPInput = ({onOTPChange}) => {
    const [otp,setOTP] =useState(["","","","","",""]);
    const otpField = Array.from({length:6},(_,index)=>index);
    const otpInputRefs = otpField.map(()=>useRef(null))

    const handleChange = (e,index)=>{
        const value = e.target.value;
        const newOTP = [...otp];
        newOTP[index] = value;

        if(index <5 && value !== ""){
            const nextInputRef = otpInputRefs[index+1];
            if(nextInputRef.current){
                nextInputRef.current.focus();
            }
        }
        setOTP(newOTP);
        onOTPChange(newOTP.join(""));
    };

    const handleKeyDown = (e,index)=>{
        if(e.key === 'Backspace' && index >0 && !otp[index]){
            const prevInputRef = otpInputRefs[index-1];
            if(prevInputRef.current){
                prevInputRef.current.focus();
            }
        }
    }


  return (
    <div className="text-center">
    <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
    <div className="flex justify-center items-center">
      {otpField.map((index) => (
        <input
          key={index}
          type="text"
          className="w-12 h-12 text-center text-2xl border border-gray-400 rounded-md mx-2"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={otpInputRefs[index]}
          maxLength={1}
        />
      ))}
    </div>
    </div>
  )
}

export default OTPInput
