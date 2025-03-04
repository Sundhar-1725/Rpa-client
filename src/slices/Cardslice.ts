import { createSlice } from "@reduxjs/toolkit";

export const initialState ={
    activeCard:'home'
};

const activeCardSlice = createSlice({
    name:"activeCardData",
    initialState,
    reducers:{
        handleCard(state: any,action: any){
              state.activeCard = action.payload
        }
    }

})
export const {handleCard} = activeCardSlice.actions;
export default activeCardSlice.reducer