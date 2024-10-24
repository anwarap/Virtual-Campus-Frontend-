import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { teacherLogout } from '../../api/teacherapi';
import { logoutTeacher } from '../../slice/authSlice';
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify';


const TeacherHeader = () => {

  const {isTeacher} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    if(isTeacher){
      await teacherLogout();
      dispatch(logoutTeacher());
      toast.success("Logged out successfully")
      navigate('/teacher')
      
    }
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900" style={{backgroundColor:"#3447AE"}}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a
      href="#"
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      {/* <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      /> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Virtual Campus
      </span>
    </a>
    
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <div className='  flex flex-row '>
      {isTeacher ? (
<>
    <div className=' pl-11 pr-4'style={{color:'white'}}>
      <h1 className='Nav_hover'>Profile</h1>
    </div>
    <div style={{color:'white'}}>
      <button 
      onClick={handleLogout}
      className='Nav_hover'
      >
        Logout
      </button>
    </div>
</>
      ):(
        <>
    <div className=' pl-11 pr-4'style={{color:'white'}}>
      <Link to={"/teacher/signin"}
      className='Nav_hover'>
        Sign In
      </Link>
      
    </div>
    <div style={{color:'white'}}>
    <Link to={"/teacher/signup"}
      className='Nav_hover'>
        Sign Up
      </Link>
    </div>
</>
      )}
      </div>
    
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
     <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" style={{backgroundColor:"#3447AE"}}>
  <li>
  <Link to={"/teacher"}
      className='Nav_hover' style={{color:'white'}}>
        Dashboard
      </Link>
  </li>
  <li>
  <Link to={"/teacher/allCourses"}
      className='Nav_hover' style={{color:'white'}}>
       All Courses
      </Link>
  </li>
  <li>
  <Link to={"/teacher/courseDetails"}
      className='Nav_hover' style={{color:'white'}}>
        Pending Course
      </Link>
  </li>
</ul>


    </div>
  </div>
</nav>

  )
}

export default TeacherHeader
