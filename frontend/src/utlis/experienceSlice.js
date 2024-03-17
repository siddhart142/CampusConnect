import { createSlice } from "@reduxjs/toolkit";

const experienceSlice = createSlice({
    name : "experience",
    initialState : {
        experience : [],
        addExperience : false,
    },
    reducers : {
        postExperience : (state,action) => {
            state.experience.push(action.payload)
        },
        toggleExperience : (state)=>{
            state.addExperience = !state.addExperience
        }
    }
})

export const {postExperience, toggleExperience} = experienceSlice.actions;
export default experienceSlice.reducer

