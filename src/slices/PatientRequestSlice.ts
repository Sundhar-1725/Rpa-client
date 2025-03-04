import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExperityRequestData{
    first_name: string;
    last_name: string;
    dob: string;
    document_type: string;
    emr_url: string;
    request_id: number;
    timestamp: string;
}

interface TableDataState{
    data:ExperityRequestData[]
}

const initialState: TableDataState ={
    data:[]
}
const rquestTableDataSlice = createSlice({
    name:"RequestData",
    initialState,
    reducers:{
         setTableData:(state,action:PayloadAction<ExperityRequestData[]>)=>{
            state.data = action.payload
         },
         clearTableData:(state)=>{
            state.data=[]
         }
    }
})
export const {setTableData,clearTableData} = rquestTableDataSlice.actions
export default rquestTableDataSlice.reducer