import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({

    name : "user",
    initialState : {
        
    },
    reducers : {
        postUser : (state,action) =>{
            return {...state,...action.payload};
        }
    }
})

export const {postUser} = userSlice.actions;
export default userSlice.reducer;