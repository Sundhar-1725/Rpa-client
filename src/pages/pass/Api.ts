import { NODEAPI } from "../../utils/backApi";

interface EmrCredentialsData{
    emrname:string,
    subemrname:string,
    updated_date:string,
    username:string,
    password:string
}

class GetEmrNameApi{
    async getEmrDetails(){
        try {
            const response = NODEAPI.get('/emr/getemr')
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const getEmrNameApi = new GetEmrNameApi()

class GetSubEmrNameApi{
    async getSubEmrDetails(){
        try {
            const response = NODEAPI.get('/emr/getsubemr')
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const getSubEmrNameApi = new GetSubEmrNameApi()

class PostCredentialsApi{
    async postCredentials(data:EmrCredentialsData){
        try {
            const response = NODEAPI.post('/emr/credentials',data)
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const postCredentialsApi = new PostCredentialsApi()


class GetCredentialsDataApi{
    async getCredentialsDetails(params: { emrname: string | null; subemrname: string | null; }){
        try {
            const response = NODEAPI.get('/emr/getcredentials',{params})
            return response
            
        } catch (error) {
            console.log(error)
            
        }
    }
}
export const getCredentialsDataApi = new GetCredentialsDataApi()