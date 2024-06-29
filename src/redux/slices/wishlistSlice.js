import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    wishlists:[]
}

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addAllWishlists:(state,action)=>{
            state.wishlists = action.payload.data;
        },
        updateWishlist:(state,action)=>{
            state.wishlists.push(action.payload.data);
        },
        deleteWishlist:(state,action)=>{
            const id = action.payload.data
            state.wishlists = state?.wishlists?.filter((item)=> item.post._id !== id);
        },
    }
});

export const {addAllWishlists,updateWishlist,deleteWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;