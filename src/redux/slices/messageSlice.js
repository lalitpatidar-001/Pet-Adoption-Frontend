import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    messages: [],
    toUser: null,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addAllMessages: (state, action) => {
            state.messages = action.payload.data;
        },
        updateMessages: (state, action) => {
            state.messages.push(action.payload.data);
        },
        deleteMessage: (state, action) => {
            const id = action.payload.data
            state.messages = state.messages.filter((item) => item._id !== id);
        },

        setToUser: (state, action) => {
            console.log("action.payload.data",action.payload.data)
            state.toUser = action.payload.data;
        }
    }
});

export const { 
    addAllMessages, 
    updateMessages, 
    deleteMessage,
    setToUser,
 } = messageSlice.actions;

export default messageSlice.reducer;