import {createSlice} from "@reduxjs/toolkit"

const educationSlice = createSlice({

    name : "education",
    initialState : {
        education : [],
        addEducation : false,
    },
    reducers : {
        postEducation : (state,action) =>{
            state.education.push(action.payload);
        },
        toggleEducation : (state) =>{
            state.addEducation = !state.addEducation
        }
    }
})

export const {postEducation,toggleEducation} = educationSlice.actions;
export default educationSlice.reducer;