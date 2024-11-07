import { IoMdCloudyNight } from "react-icons/io";
import Api from "../services/api";
import Adminroutes from "../services/endpoints/adminEndpoints";
import { toast } from "react-toastify";

export const adminLogin = async(data)=>{
    try {
        const response = await Api.post(Adminroutes.login,data);
        return response;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
};

export const getUsers = async ()=>{
    try {
        const response = await Api.get(Adminroutes.getUsers);
        console.log(response,'response')
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}


export const getTeachers = async ()=>{
    try {
        const response = await Api.get(Adminroutes.getTeachers);
        console.log(response.data,'dadadad')
        return response.data;

    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}

export const blockUser = async (id)=>{{
    try {
        const response = await Api.post(`${Adminroutes.blockUser}/${id}`);
        return response;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}}

export const blockTeacher = async (id)=>{
    try {
        const response = await Api.post(`${Adminroutes.blockTeacher}/${id}`)
        return response;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}

export const getCategory = async ()=>{
    try {
        const response = await Api.get(Adminroutes.getCategory);
        console.log(response)
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}

export const createCategory = async (data)=>{
    try {
        const response = await Api.post(Adminroutes.createCategory,data);
        console.log(response,'adaadadad')
        return response
    } catch (error) {
        console.log('adadadaaeeeee')
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}

export const getCourse = async ()=>{
    try {
        const response = await Api.get(Adminroutes.getCourse);
        console.log(response,'badefeadse');
        return response
    } catch (error) {
        console.log('erororr moneeeee')
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}

export const approveCourse = async (courseId, isApproved)=>{
    try {
        const response = await Api.put(Adminroutes.approveCourse(courseId), { isApproved });
        return response
    } catch (error) {
        console.log('erororr moneeeee')
        if(error.response && error.response.data){
            toast.error(error.response.data);
        } 
    }
}

export const blockCategory = async (id)=>{
    try {
        const response = await Api.post(`${Adminroutes.blockCategory}/${id}`);
        return response;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    
    }
}
