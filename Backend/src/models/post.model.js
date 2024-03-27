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
    ],
    likeCount : {
        type : Number,
        default : 0
    },
    commentCount : {
        type : Number,
        default : 0
    }
},{
     timestamps : true,
})

export const Post = mongoose.model("Post",postSchema)