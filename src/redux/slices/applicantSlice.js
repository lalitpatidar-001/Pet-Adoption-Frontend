import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    applicants:[]
}

const applicantSlice = createSlice({
    name:"applicant",
    initialState,
    reducers:{
        addAllApplicants:(state,action)=>{
            state.applicants = action.payload.data;
        },
        updateApplicant:(state,action)=>{
            state.applicants.push(action.payload.data);
        },
        deleteApplicant:(state,action)=>{
            const id = action.payload.data
            state.applicants = state.applicants.filter((item)=> item._id !== id);
        },
        updateApplicantStatus:(state,action)=>{
            const id = action.payload.data
            state?.applicants?.map(item=>{
                if(item._id===id){
                    item.status="adopted"
                }
            })
        }
    }
});

export const {addAllApplicants,updateApplicant,deleteApplicant,updateApplicantStatus} = applicantSlice.actions;

export default applicantSlice.reducer;