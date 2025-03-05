import { NODEAPI } from "../../utils/backApi";

interface SecretKey{
  secret_key:string
}
interface ForgotSecretKeyData{
    email:string,
    secret_key:string
}

class PostSecretKeyApi{
    async postSecretKey(data:SecretKey){
        try {
            const response = NODEAPI.post('/user/secretkey',data)
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const postSecretKeyApi = new PostSecretKeyApi()

class ForgotSecretKeyApi{
    async updatePassword(data:ForgotSecretKeyData){
        try {
            const response = NODEAPI.put('/user/forgotsecretkey',data)
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const forgotSecretKeyApi = new ForgotSecretKeyApi()