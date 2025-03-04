import { NODEAPI } from "../../utils/backApi";

interface LoginData{
    email:string,
    password:string
}

class PostLoginApi{
    async postLoginData(data:LoginData){
        try {
            const response = NODEAPI.post('/user/login',data)
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const postLoginApi = new PostLoginApi()