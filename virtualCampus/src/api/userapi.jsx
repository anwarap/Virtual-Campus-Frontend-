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
        const response = await Api.post(userRoutes.forgetPassword1, obj)
        return response
    } catch (error) {
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
        return response
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const forgetPasswordFinal = async (data)=>{
    try {
        const response = await Api.post(userRoutes.forgetPasswordFinal, data)
        return response
    } catch (error) {
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
