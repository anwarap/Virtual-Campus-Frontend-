import { getCategory } from "../../api/adminapi";
import { resendotp } from "../../api/userapi";


const teacherRoutes = {
    login:"/teacher/login",
    signup:"/teacher/signup",
    verify:"/teacher/verify",
    logout:"/teacher/logout",
    resendotp:"/teacher/resend-otp",
    forgetPassword1:"/teacher/forget-password1",
    forgetPassword2:"/teacher/forget-password2",
    forgetPasswordFinal:"/teacher/forget-password-final",
    getCategory:"/teacher/category",
    addCourse:"/teacher/add-course",
}


export default teacherRoutes;