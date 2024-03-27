import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState : {
        posts : []
    },
    reducers : {
        postPosts : (state,action) => {
            state.posts.push(action.payload)
        }
    }
})

export const {postPosts} = postSlice.actions;
export default postSlice.reducer