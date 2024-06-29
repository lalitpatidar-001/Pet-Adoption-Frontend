import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    requests:[]
}

const requestSlice = createSlice({
    name:"request",
    initialState,
    reducers:{
        addAllRequest:(state,action)=>{
            state.requests = action.payload.data;
        },
        updateRequest:(state,action)=>{
            state.requests.push(action.payload.data);
        },
        deleteRequest:(state,action)=>{
            const id = action.payload.data
            state.requests = state?.requests?.filter((item)=> item._id !== id);
        },
    }
});

export const {addAllRequest,updateRequest,deleteRequest} = requestSlice.actions;

export default requestSlice.reducer;