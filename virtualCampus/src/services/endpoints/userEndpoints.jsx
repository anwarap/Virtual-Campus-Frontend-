import { forgetPassword1 } from "../../api/userapi";

const userRoutes = {
    login:"/user/signin",
    signup:"/user/signup",
    verifyOTP:"/user/verify",
    logout:"/user/logout",
    resendotp:"/user/resend-otp",
    forgetPassword1:"/user/forget-password1",
    forgetPassword2:"/user/forget-password2",
    forgetPasswordFinal:"/user/forget-password-final",

} 


export default userRoutes;