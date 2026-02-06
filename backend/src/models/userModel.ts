
import mongoose, { Schema } from "mongoose";

export interface UserDocument extends Document{
    username : string
    email : string
    password : string
}

const userSchema = new Schema<UserDocument>({
    username : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true}
},
{
    timestamps : true
}
)

const userModel = mongoose.model<UserDocument>("users" , userSchema)

export default userModel