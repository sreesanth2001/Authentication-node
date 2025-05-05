import User from "../models/userSchema.js"
import JWT from "jsonwebtoken"
import config  from "../config/config.js"

export const cookieOptions ={
  expires: new Date (Date.now()+30*24*60*60*1000),
  httpOnly: true
}


export const signUp = async (req, res) => {
    try {
      const { name, email, password, phoneNo, address } = req.body
  
      // Validation 
      if (!name || !email || !password || !phoneNo || !address) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all fields"
        })
      }
  
      // Check if user already exists 
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "You have already signed up"
        })
      }
  
      // Create new user 
      const user = await User.create({
        name,
        email,
        password,
        address,
        phoneNo
      })
  
      // Hide password before sending back
      user.password = undefined
  
      res.status(200).json({
        success: true,
        message: "Successfully signed up",
        user
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: `Error in signing up: ${error}`,
        error
      })
    }

  }
/*
    Login function
    route : http : //localhost:4000/api/v1/auth/login
    description : user login controller to Login
*/
export const login = async (req,res)=>{
  try{
      //get info from frontend
      const{email,password}=req.body

      //validation
      if(!email || !password){
          return res.status(400).json({
              success : false,
              message : "Invalid email or password"
          })
      }
      //check if the user existing database
      const user = await User.findOne({email}).select("+password")

      //if the user doesnot exit in db send a message
      if (!user){
          return res.status(404).json({
              success : false,
              message : "User not found please signup"
          })
      }
      //if existing user compare password
      const isPasswordMatched = await user.comparePassword(password)
          
      //if password doesnt match send response
      if(!isPasswordMatched){
          return res.status(400).json({
              success : false,
              message : "password Invalid"
          })
      }

      //if password match generate JWT token

      const token=JWT.sign({id :user._id,role :user.role}, config.JWT_SECRET  ,{ expiresIn :config.JWT_EXPIRY})
      //flushout password
      user.password = undefined
      //setup cookie
      res.cookie("token",token,cookieOptions)
      
      //send success message to the frontend
      res.status(200).json({
          success : true,
          message : "Sucessfully logged in",
          user :{
              id:user._id,
              name:user.name,
              email:user.email,
              phone:user.phone,
              address:user.address,
              role:user.role
          },
          token
      })

  }catch(error){
      console.log(error)
      res.status(500).json({
          success : false,
          message : (`Error in login ${error}`),
          error
      })
  }
}

//test controllers
export const testControllers =(req,res) =>{
  res.send("protect route")
}  