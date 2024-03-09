import React, { useState } from 'react'
import logo from "../public/logo.png";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const VerificationPage = () => {

    const { userId } = useParams()
    const [otp, setOtp] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = async(e)=>{

        e.preventDefault()
        console.log({userId,otp})
        const response = await axios.post('http://localhost:8000/api/v1/users/verify',{userId, otp})

        console.log("otp verification",response)

        navigate("/login")

    }

    const handleChange = async(e)=>{

        setOtp(e.target.value)

    }

  return (
    <div className='flex flex-row justify-center m-32 shadow-2xl rounded-3xl w-[1050px] mx-auto'>
    <img className='rounded-2xl m-4' src={logo} alt="Logo" />
    <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
      <input className='mx-4 px-4 my-2 border border-solid w-auto h-12 rounded-full' type="text" name="otp" placeholder='Enter the OTP' value = {otp} onChange={handleChange} />
      {/* {errors.password.length>0?<span className='ml-auto mr-6 text-red-600'>{errors.password}</span>:<span></span>} */}
      <button className='mx-4 px-4 my-2 mb-8 border border-solid w-auto h-12 rounded-full bg-blue-500 font-bold text-2xl' type = "submit"  >Verify</button>
    </form>
  </div>
  )
}

export default VerificationPage
