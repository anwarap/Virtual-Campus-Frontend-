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
            console.log('here')

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