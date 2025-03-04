import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

interface Registerdatas{
    username:string,
    email:string,
    password:string
}

interface RegisterData{
    data:Registerdatas[]
}
const initialState: RegisterData={
    data:[]
}

const registerReducer = createSlice({
    name:"register",
    initialState,
    reducers:{
        setRegisterData:(state,action:PayloadAction<Registerdatas[]>)=>{
            state.data = action.payload
        },
        clearRegisterData:(state)=>{
            state.data = []
        }
    }
})

export const {setRegisterData,clearRegisterData} = registerReducer.actions
export default registerReducer.reducer