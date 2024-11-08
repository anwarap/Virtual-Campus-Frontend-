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

export const TforgetPassword1 = async (obj)=>{
    try {
        const response = await Api.post(teacherRoutes.forgetPassword1, obj);
        return response
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const TforgetPassword2 = async(otp)=>{
    try {
        const response = await Api.post(teacherRoutes.forgetPassword2,otp);
        return response
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        }
    }
}

export const TforgetPasswordFinal = async (data) =>{
    try {
        const response = await Api.post(teacherRoutes.forgetPasswordFinal,data);
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



export const addCourse = async (data)=>{
    try {
        console.log(data,'dadadta')
        const response = await Api.post(teacherRoutes.addCourse,data);
        return response;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        } 
    }
}
export const getCategory = async ()=>{
    try {
        const response = await Api.get(teacherRoutes.getCategory);
        return response.data;
    } catch (error) {
        if(error && error.isAxiosError){
            handleError(error)
        }else{
            toast.error("Something went wrong")
        } 
    }
}

// export const getTeacherCourses = async (teacherId)=>{
//     try {
//         console.log(teacherId,'sfds')
//         const response = await Api.get(`/teacher/teacher-course/${teacherId}`);
//         console.log(response,'reses');
//         return response
//     } catch (error) {
//         console.log('ooo')
//         if(error && error.isAxiosError){
//             handleError(error)
//         }else{
//             toast.error("Something went wrong")
//         } 
//     }
// }