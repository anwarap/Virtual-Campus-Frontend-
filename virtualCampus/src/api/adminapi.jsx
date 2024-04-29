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
        return response;
    } catch (error) {
        if(error.response && error.response.data){
            toast.error(error.response.data);
        }
    }
}


export const getTeachers = async ()=>{
    try {
        const response = await Api.get(Adminroutes.getTeachers);
        return response;
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
