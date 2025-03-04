import { NODEAPI } from "../../utils/backApi";

interface ForgotPasswordData{
    email:string,
    password:string,
    confirm_password:string
}

class ForgotPasswordApi{
    async updatePassword(data:ForgotPasswordData){
        try {
            const response = NODEAPI.put('/user/forgotpassword',data)
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const forgotPasswordApi = new ForgotPasswordApi()