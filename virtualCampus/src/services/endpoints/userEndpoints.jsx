

const userRoutes = {
    login: "/user/signin",
    signup: "/user/signup",
    verifyOTP: "/user/verify",
    logout: "/user/logout",
    resendotp: "/user/resend-otp",
    forgetPassword1: "/user/forget-password1",
    forgetPassword2: "/user/forget-password2",
    forgetPasswordFinal: "/user/forget-password-final",
    createPaymentIntent: "/user/create-payment-intent", // Added leading slash
    handlePaymentSuccess: "/user/success"     // Added leading slash
};


export default userRoutes;