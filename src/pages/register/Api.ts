import { NODEAPI } from "../../utils/backApi";

interface RegisterData{
    username:string,
    email:string,
    password:string
}

class PostRegisterApi{
    async postUserData(data:RegisterData){
        try {
            const response = NODEAPI.post('/user/register',data)
            return response
            
        } catch (error) {
            console.log(error)
            // return error
            
        }
    }
}
export const postRegisterApi = new PostRegisterApi()