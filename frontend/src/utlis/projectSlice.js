import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : "project",
    initialState : {
        project : [],
        addProject : false,
    },
    reducers : {
        postProject : (state,action) => {
            state.project.push(action.payload)
        },
        toggleProject : (state)=>{
            state.addProject = !state.addProject
        }
    }
})
export const {postProject,toggleProject} = projectSlice.actions;
export default projectSlice.reducer