import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signuppage = () => {
const [name,setName] =useState("")
const [email,setEmail] =useState("")
const [password,setPassword] =useState("")
const [phoneNo,setPhoneNo] =useState("")
const [address,setAddress ]=useState("")
const navigate= useNavigate()
//handle submit
const handleSubmit=async (e)=>{
  e.preventDefault()
    console.log()
    try{
      const{data}= await axios.post("http://localhost:4000/api/v1/auth/signup",{name,email,password,phoneNo,address});
      if(data && data.success){
        toast.success(data.message)
        navigate("/login")
      }else{
        toast.error(data.error)
      }

    }catch(error){
      console.log(error)
    toast.error("something went wrong")
    }
    
}

  return (
    <div>
        <Helmet><title>Signuppage</title></Helmet>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 items-center">
          <input type="text"  placeholder="Name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} required className="w-1/4 outline rounded-xl p-2"/> 
          <input type="email" placeholder="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required className="w-1/4 outline rounded-xl p-2"/> 
          <input type="password" placeholder="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required className="w-1/4 outline rounded-xl p-2"/>
          <input type="text" placeholder="phonenumber" name="phoneNo" value={phoneNo} onChange={(e)=>{setPhoneNo(e.target.value)}} required className="w-1/4 outline rounded-xl p-2"/>
          <input type="text" placeholder="address" name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required className="w-1/4 outline rounded-xl p-2"/>
          <button className="w-1/4 outline-amber-500 outline-2 rounded-2xl bg-amber-300">Signup</button>
        </form>


        </div>
  )
  }
  export default Signuppage