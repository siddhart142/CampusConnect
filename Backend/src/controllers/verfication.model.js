import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
const VerificationSchema = new Schema({
    owner: {
        type : Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },
    otp:{
        type : String,
        required : true,
    },
    createdAt :{
        type : Date,
        expires : 10000,
        default : Date.now(),
    }
});

VerificationSchema.pre("save", async function(next) {
    this.otp = await bcrypt.hash(this.otp,10)
    next()
})

VerificationSchema.methods.isOTPCorrect = async function(password){
    return await bcrypt.compare(password,this.otp)
}

export const Verification = mongoose.model("Verification",VerificationSchema)
