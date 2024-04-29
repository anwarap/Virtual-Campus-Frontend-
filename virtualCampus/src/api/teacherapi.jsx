import teacherRoutes from "../services/endpoints/TeacherEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { handleError } from "../middleware/ErrorHandler";


export const signup = async(teacher)=>{
    try {
        const response = await Api.post(teacherRoutes.signup,teacher);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
};

export const verify = async(teacher)=>{
    try {
        const response = await Api.post(teacherRoutes.verify,teacher);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
};

export const resendotp = async()=>{
    try {
        const response = await Api.get(teacherRoutes.resendotp);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        } 
    }
}

export const teacherLogin = async (data)=>{
    try {
        const response = await Api.post(teacherRoutes.login,data);
        return response;    
    } catch (error) {
       if(error && error.isAxiosError){
        handleError(error)
       }else{
        toast.error("Something went wrong")
       }
    }
}

export const teacherLogout = async()=>{
    try {
        const response = await Api.post(teacherRoutes.logout);
        return response;     
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const addCourse = async ()=>{
    try {
        const response = await Api.post(teacherRoutes.addCourse)
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        } 
    }
}