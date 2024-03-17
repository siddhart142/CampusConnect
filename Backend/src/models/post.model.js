import mongoose, {Schema} from "mongoose"

const postSchema = new Schema({

    owner: {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    desc:
    {
        type : String,
    },
    images : [
        {
            type : String
        }
    ]
},{
     timestamps : true,
})

export const Post = mongoose.model("Post",postSchema)