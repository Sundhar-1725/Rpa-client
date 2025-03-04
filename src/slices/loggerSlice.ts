import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

interface loggerDatas{
    level: number;
    message: string;
    timestamp: string;
}
interface loggerDataState{
    data:loggerDatas[]
}

const initialState : loggerDataState = {
    data:[]
}

const loggerDataSlice = createSlice({
    name:"loggerData",
    initialState,
    reducers:{
        setLoggerData:(state,action:PayloadAction<loggerDatas[]>)=>{
            state.data = action.payload
        }
    }

})
export const {setLoggerData}  = loggerDataSlice.actions
export default loggerDataSlice.reducer