import { toast } from "react-toastify";


export const handleError =(error)=>{
    if(error){
        if(error.response && error.response.data?.message == "Blocked by Admin"){
            localStorage.removeItem("user");
            localStorage.removeItem("teacher");
            localStorage.href = '/user';
        }else{
            const errrorMessage = error.response?.data || "An error occured";
            toast.error(errrorMessage);
        }
    }
}
