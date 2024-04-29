import { toast } from "react-toastify";


export const handleError =(error)=>{
    if(error){
        const errrorMessage = error.response?.data || "An error occured";
        toast.error(errrorMessage.data.message)
    }
}
