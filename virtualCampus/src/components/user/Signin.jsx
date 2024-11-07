import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userapi";
import { loginUser } from "../../slice/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const { isUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUser) {
      navigate("/user");
    }
  }, []);

 

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedEmail.length === 0) {
      toast.error("Email is required");
      return;
    } else if (!isValidEmail(trimmedEmail)) {
      toast.error("Enter a valid email");
      return;
    }
    if (trimmedPassword.length === 0) {
      toast.error("Password is required");
      return;
    }

    const formData = {
      email,
      password,
    };

    let response = await login(formData);

    if (response?.status == 200) {
      toast.success("Login successfull");
      dispatch(loginUser(response.data));
      navigate("/user");
    } 
  };

  const getGoogleUser = async (response)=>{
    const decode = jwtDecode(response.credential)
    const data = {
      is_google:true,
      email:decode.email,
      name:decode.name,
      password:"111"
    };
    const result = await login(data);
    console.log(result,'fsf')
    if(result?.status==200){
      toast.success("Login successful");
      dispatch(loginUser(data));
      navigate("/user")
    }else{
      console.log("User not found")
     
    }
  }

  return (
    <div>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            ></a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
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
                      placeholder="Enter your email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                     
                   
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                    <Link to={"/user/forget-password"}>

                      Forgot password?
                    </Link>

                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
                    style={{ backgroundColor: "#3447AE" }}
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link to="/user/signup">
                      <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </Link>
                  </p>
                </form>
                <>
               
               <p className="mb-6 text-base text-[#adadad]">
                 Register With
               </p>
              <div className="mx-auto mb-12 flex justify-center items-center">
              <GoogleLogin
                onSuccess={(response) => {
                  getGoogleUser(response);
                }}
                onError={() => console.log("Error")}
              />
            </div>
            </>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signin;
