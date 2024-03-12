import mongoose , {Schema} from "mongoose"

const EdSchema = new Schema({

    owner : {
        type : String,
        required : true
    },
    institute:
    {
        type : String,
        required : true
    },
    degree : 
    {
        type : String,
    },
    fieldOfStudy : {
        type : String,
    },
    startMonth : {
        type : String,
        required : true,
    },
    startYear : {
        type : String,
        required : true,
    },
    endMonth : {
        type : String,
        required : true,
    },
    endYear : {
        type : String,
        required : true,
    },
},{
    timestamps : true,
})

export const Education = mongoose.model("Education",EdSchema)