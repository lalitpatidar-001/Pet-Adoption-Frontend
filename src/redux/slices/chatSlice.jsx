import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    chats:[],
    currentChat:null
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        addAllChats:(state,action)=>{
            state.chats = action.payload.data;
        },
        updateChats:(state,action)=>{
            state.chats.unshift(action.payload.data);
        },
        deleteChat:(state,action)=>{
            const id = action.payload.data
            state.chats = state.chats.filter((item)=> item._id !== id);
        },

        setCurrentChat:(state,action)=>{
            console.log("called set current chat",action.payload.data)
            state.currentChat = action.payload.data;
        }
    }
});

export const {
    addAllChats,
    updateChats,
    deleteChat,
    setCurrentChat
} = chatSlice.actions;

export default chatSlice.reducer;