import { resendotp } from "../../api/userapi";


const teacherRoutes = {
    login:"/teacher/login",
    signup:"/teacher/signup",
    verify:"/teacher/verify",
    logout:"/teacher/logout",
    resendotp:"/teacher/resend-otp",
    addCourse:"/teacher/add-course",
}


export default teacherRoutes;