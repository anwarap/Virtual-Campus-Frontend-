import { toast } from "react-toastify";


export const handleError =(error)=>{
    if(error){
        const errrorMessage = error.response?.data || "An error occured";
        console.log(errrorMessage)
        if(errrorMessage.message){
            console.log('fff')
            toast.error(errrorMessage.message)
        }else{
            console.log(error)

            toast.error(error)
        }

    }
}
