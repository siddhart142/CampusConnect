import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import educationSlice from "./educationSlice";
import experienceSlice from "./experienceSlice";
import projectSlice from "./projectSlice";

const store = configureStore(
    {
        reducer : {
            user : userSlice,
            education : educationSlice,
            experience : experienceSlice,
            project : projectSlice
        }
    }
)

export default store;