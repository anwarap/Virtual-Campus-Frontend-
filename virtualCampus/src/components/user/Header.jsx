import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {logout} from '../../api/userapi';
import {logoutUser} from '../../slice/authSlice';
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import './Header.css'

const Header = () => {

  const {isUser} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    if(isUser){
      await logout();
      dispatch(logoutUser());
      toast.success("Logged out successfully")
      navigate('/user')
      
    }
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900" style={{backgroundColor:"#3447AE"}}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a
     
      className="flex items-center space-x-3 rtl:space-x-reverse"
    >
      
       <img src="\LOOOGO.png" alt="hydfdfddf" className="h-8" style={{maxWidth:'100%',maxHeight:'100%'}} />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        
      </span>
    </a>
    
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <div className='  flex flex-row '>
      {isUser ? (
<>
    <div className=' pl-11 pr-4'>

      <Link to={"/user/profile"}
      className='Nav_hover font-[Poppins] text-[--third-color]'>
       Profile
      </Link>
    </div>
    <div >
      <button 
      onClick={handleLogout}
      className='Nav_hover font-[Poppins] text-[--third-color]'
      >
        Logout
      </button>
    </div>
</>
      ):(
        <>
    <div className=' pl-11 pr-4'>
      <Link to={"/user/signin"}
      className='Nav_hover font-[Poppins] text-[--third-color]'>
        Sign In
      </Link>
      
    </div>
    <div>
    <Link to={"/user/signup"}
      className='Nav_hover font-[Poppins] text-[--third-color]'>
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

    <Link to={"/user"}
      className='Nav_hover font-[Poppins] text-[--third-color]' >
        Home
      </Link>
  </li>
  <li>
  <Link to={"/user/course"}
      className='Nav_hover font-[Poppins] text-[--third-color]'>
        Course
      </Link>
  </li>
  <li>
  <Link to={"/user/about"}
      className='Nav_hover font-[Poppins] text-[--third-color]'>
        About
      </Link>
  </li>
  {/* <li>
    <a className='Nav_hover'
       href="#"
       style={{color:'white'}}
    >
      Pricing
    </a>
  </li>
  <li>
    <a className='Nav_hover'
       href="#"
       style={{color:'white'}}
    >
      Contact
    </a>
  </li> */}
</ul>


    </div>
  </div>
</nav>

  )
}

export default Header
