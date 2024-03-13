import mongoose , {Schema} from "mongoose"

const projectSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    desc :
    {
        type : String,
        required : true,
    },
    startMonth : {
        type: String,
    },
    startYear : {
        type: String
    },
    endMonth : {
        type: String,
    },
    endYear : {
        type: String
    }
},{
    timestamps : true
})

export const Project = mongoose.model("Project",projectSchema)