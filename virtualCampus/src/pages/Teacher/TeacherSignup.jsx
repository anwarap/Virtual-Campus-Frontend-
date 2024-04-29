import React, { useEffect, useState } from "react";
import OTPInput from "../../components/common/OTPInput";
import { signup, verify,resendotp } from "../../api/teacherapi";
import { loginTeacher } from "../../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const TeacherSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [completed, setCompleted] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isTeacher } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isTeacher) {
      navigate("/teacher");
    }
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const isValidMobileNumber = (mobile) => {
    const mobileRegex = /^[6789]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.replace(/\s+/g, "");
    const trimmedEmail = email.replace(/\s+/g, "");
    const trimmedMobile = mobile.replace(/\s+/g, "");
    const trimmedPassword = password.replace(/\s+/g, "");
    const trimmedCpassword = Cpassword.replace(/\s+/g, "");
    if (trimmedName.length === 0) {
      toast.error("Name is required");
      return;
    }
    if (trimmedEmail.length === 0) {
      toast.error("Email is required");
      return;
    } else if (!isValidEmail(trimmedEmail)) {
      toast.error("Enter a valid email");
      return;
    }
    if (trimmedMobile.length === 0) {
      toast.error("Mobile is required");
      return;
    } else if (!isValidMobileNumber(trimmedMobile)) {
      toast.error("Enter a valid mobile number");
      return;
    }
    if (trimmedPassword.length === 0) {
      toast.error("Password is required");
      return;
    } else if (trimmedPassword.length < 6) {
      toast.error("Weak password");
      return;
    }

    if (trimmedCpassword.length === 0) {
      toast.error("provide confirm password");
      return;
    }
    if (trimmedPassword != trimmedCpassword) {
      toast.error("Password Do not match");
      return;
    }
    const formData = {
      name,
      email,
      password,
      mobile,
    };

    const result = await signup(formData);
    if (result?.status) {
      console.log("true");
      setCompleted(true);
    }
  };

  const handleOtpchange = (otp) => {
    setOtp(otp);
  };
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      otp: otp,
    };
    const result = await verify(data);
    console.log(result, "result");
    if (result?.status == 200) {
      toast.success("signup successful");
      dispatch(loginTeacher(result.data.teacherSave.data._id));
      navigate("/teacher");
    } else {
      navigate("/teacher/signup");
    }
  };

  const getGoogleUser = async (response) => {
    console.log("here");
    const decode = jwtDecode(response.credential);
    const data = {
      is_google: true,
      email: decode.email,
      name: decode.name,
      password: "111",
    };
    const result = await signup(data);
    if (result?.status == 200) {
      toast.success("Signup successful");
      dispatch(loginTeacher(data));
      navigate("/teacher");
    } else {
      console.log("hehe");
      toast.error("Email already exists");
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        ></a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"></h1>
            <h1 className="flex justify-center text-2xl font-bold">
              Join as Teacher
            </h1>
            {completed ? (
              <>
              <form onSubmit={handleFinalSubmit} encType="multipart/form-data">
                <OTPInput onOTPChange={handleOtpchange} />
                <div className="mb-10 mt-5">
                  <button
                    className="border-primary w-full cursor-pointer rounded-md border bg-3447AE py-3 px-5 text-base text-white transition hover:bg-opacity-90"
                    type="submit"
                    style={{ backgroundColor: "#3447AE" }}
                  >
                    Submit
                  </button>
                </div>{" "}
              </form>
              <div className="mb-10 mt-5">
                <button onClick={()=> resendotp()}>
                    Resent OTP ?
                  </button>
                </div>{" "}
              </>

            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Mobile number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="Cpassword"
                    value={Cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{ backgroundColor: "#3447AE" }}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link to="/teacher/signin">
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login here
                    </a>
                  </Link>
                </p>
              </form>
            )}
            {!completed && (
              <>
                <p className="mb-6 text-base text-[#adadad]">Register With</p>
                <div className="mx-auto mb-12 flex justify-center items-center">
                  <GoogleLogin
                    onSuccess={(response) => {
                      getGoogleUser(response);
                    }}
                    onError={() => console.log("Error")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSignup;
