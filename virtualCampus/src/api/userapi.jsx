import userRoutes from "../services/endpoints/userEndpoints";
import Api from "../services/api";
import { handleError } from "../middleware/ErrorHandler";
import { toast } from "react-toastify";


export const signup = async(user)=>{
    try{
        const response = await Api.post(userRoutes.signup, user);
        return response;
    }catch(error){
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const verify = async(user)=>{
    try {
        const response = await Api.post(userRoutes.verifyOTP, user);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const resendotp = async()=>{
    try {
        const response = await Api.get(userRoutes.resendotp);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}


export const login = async(loginData)=>{
    try {
        const response = await Api.post(userRoutes.login,loginData);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const forgetPassword1 = async (obj)=>{
    try {
        console.log(obj,'sf')
        const response = await Api.post(userRoutes.forgetPassword1, obj)
        console.log(response,'ss')
        return response
    } catch (error) {
        console.log(error)
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const forgetPassword2 = async (otp)=>{
    
    try {     
        const response = await Api.post(userRoutes.forgetPassword2, otp)
        console.log(response)
        return response
    } catch (error) {
        if(error && error.isAxiosError){
            console.log(error)
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const forgetPasswordFinal = async (data)=>{
    console.log(data)
    try {
        const response = await Api.post(userRoutes.forgetPasswordFinal, data);
        console.log(response,'dsfew')
        return response
    } catch (error) {
        console.log(error)
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const logout = async()=>{
    try {
        const response = await Api.post(userRoutes.logout);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const createPaymentIntent = async (courseId) => {
    try {
        const response = await Api.post(userRoutes.createPaymentIntent, { courseId });
        console.log(response,'resosos')
        return response.data;
    } catch (error) {
        console.log('ieieieie')
        if (error && error.isAxiosError) {
            handleError(error);
        } else {
            toast.error("Something went wrong while creating payment intent.");
        }
        throw error; // Re-throw the error to be handled by the component
    }
};

export const handlePaymentSuccess = async (Buydata) => {
    console.log(Buydata,'eeeee')
    try {
        const response = await Api.post(userRoutes.handlePaymentSuccess, Buydata);
        console.log(response,'eeee')
        return response;
    } catch (error) {
        console.log('dfsdfsf')
        console.log(error)
        if (error && error.isAxiosError) {
            handleError(error);
        } else {
            toast.error("Something went wrong while processing the payment.");
        }
        throw error;
    }
};