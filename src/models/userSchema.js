import mongoose from "mongoose";
import bcrypt, { compare } from "bcrypt";
import AuthRoles from "../utils/AuthRoles.js";


const userSchema =new mongoose.Schema({
    name : {
        type: String,
        required : [true,"name is required"],
        trim: true,
        maxlength :[25,"name should not exceed 25 chars"]

    },
    email :{
         type : String,
         required :[true,"Email is Required"],
         unique : true,
    },

    password:{
        type : String,
        required:true,
        minlength :[8,"Password should contain at least 8 char"],
        select : false,
    },

    phoneNo:{
         type : String,
         required : true,
    },

    address :{
        type :String,
        required :true,
        maxlength : [100,"address should not exceed 100 chars"],
        trim : true,
    },

    role : {
        type :String,
        enum :Object.values.AuthRoles,
        default : AuthRoles.USER
    }

},{
    timestamps:true // timestamps create creating time and updating time in model
})


//mongoose hook :pre()

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password,10) //salt value
})

//schema methods

userSchema.methods={
    comparePassword: async function(enteredPassword){
    return await bcrypt .compare(enteredPassword,this.password)
    }
}
export default mongoose.model("User",userSchema)