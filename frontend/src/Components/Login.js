import React, { useState } from 'react';
import logo from "../public/logo.png";
import google from "../public/google.png";
import axios from 'axios';
// import {useHistory} from "react-router-dom"
import { useNavigate } from 'react-router-dom';




const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email : "",
        password : ""
       
    })
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!validateForm()) {
            console.log("Form validation failed");
            return;
        } 

        console.log("form Submitted", formData)

       try {
        
        const response = await axios.post('http://localhost:8000/api/v1/users/login',formData)
        console.log("response from backend for register",response)
 
         setFormData({
         email : "",
         password : ""})

         document.cookie= `refreshToken= ${response?.data?.data?.refreshToken}`
         document.cookie =`accessToken= ${response?.data?.data?.accessToken}`

         navigate("/home")


         

        // navigate(`/verify/${response?.data?.data?._id}`)

       } catch (error) {
            console.log(error.message)
            throw error
       }

        // history.push('/verify')
        // <Navigate to="/verify" replace={true} />
       
    }

    const handleChange = async(e) => {


        const { name , value } = e.target
        // console.log(e.target.value)
        setFormData({
            ...formData,
            [name] : value,
        })

        validateField(name, value);
    }
    const validateField = (fieldName, value) => {
        let errorMessage = "";

        switch (fieldName) {
            case "email":
                // You can add more complex email validation logic if needed
                const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

                errorMessage = !emailRegex.test(value) ? "Invalid email address" : "";
                break;
            case "password":
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
                errorMessage = !passwordRegex.test(value) ?
                "Password must meet the following requirements:\n- At least 6 characters\n- At least 1 lowercase letter\n- At least 1 uppercase letter\n- At least 1 special character" :
                "";
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [fieldName]: errorMessage
        });
    }

    const validateForm = () => {
        // Check if any field has an error
        const isValid = Object.values(errors).every(error => error === "") &&  Object.values(formData).every(field => field !== "");
        console.log(isValid)
        return isValid
    }

    const handleClick = ()=>{
        navigate('/signup')
    }


  return (
    <div className='flex flex-row justify-center m-32 shadow-2xl rounded-3xl w-[1050px] mx-auto'>

      <div className=''>
        <img className='rounded-2xl m-4' src={logo} alt="Logo" />
        <form className='flex flex-col' onSubmit={handleSubmit}>
         
          <input className='mx-4 px-4 my-2 border border-solid w-auto h-12 rounded-full' type="text" name="email" placeholder='Enter Your Email' value = {formData.email} onChange={handleChange} />
          {errors.email.length>0?<span className='ml-auto mr-6 text-red-600'>{errors.email}</span>:<span></span>}
          <input className='mx-4 px-4 my-2 border border-solid w-auto h-12 rounded-full' type="text" name="password" placeholder='Enter Your Password' value = {formData.password} onChange={handleChange} />
          {errors.password.length>0?<span className='ml-auto mr-6 text-red-600'>{errors.password}</span>:<span></span>}
          <button className='mx-4 px-4 my-2 mb-8 border border-solid w-auto h-12 rounded-full bg-blue-500 font-bold text-2xl' type = "submit"  >Sign In</button>
        </form>
      </div>
      
      <div className='flex flex-col justify-center m-10 mt-44'>
        <button className='mx-4 px-4 my-2 border border-solid w-96 h-12 rounded-full bg-teal-300 text-2xl flex items-center justify-center'>
          <img className='h-8  mr-2' src={google} alt='Google Logo' />
          Sign In with Google
        </button>
        <button className='mx-4 px-4 my-2 border border-solid w-96 h-12 rounded-full bg-teal-300 text-2xl flex items-center justify-center'>
          <img className='h-8 border border-solid mr-2' src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg' alt='LinkedIn Logo' />
          Sign In with LinkedIn
        </button>
        <span className='ml-auto mr-6 cursor-pointer' onClick={handleClick}>Don't Have an Account? SignUp Now</span>
      </div>

    </div>
  );
}


export default Login;
