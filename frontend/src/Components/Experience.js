import React, { useEffect } from 'react'
import axios from 'axios'
import pen from "../public/pen.png"
import mnc from "../public/mnc.png"

import { useSelector, useDispatch } from 'react-redux'
import { postExperience, toggleExperience } from '../utlis/experienceSlice'

const Experience = () => {

const expData = useSelector((store)=> store.experience.experience)
const dispatch = useDispatch()
// console.log("expData",expData)

  const fetchData = async()=>{
    // console.log(expData.length)
    if(expData.length) return ;
    const experienceData = await axios.get("http://localhost:8000/api/v1/users/getUserExperience",{
      withCredentials: true
    })
    // console.log("ep",experienceData)
    // if(experienceData.length)
      dispatch(postExperience(experienceData?.data.data[0]))

  }

  const handleClick = ()=>{
    dispatch(toggleExperience())
  }

  useEffect(()=>{
    fetchData();
  },[])
  // if(!exp)
  return (
    <div className=' '>
       <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Experience</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl' onClick={handleClick}>+</span>
          <img className='h-8 w-8 mx-2 mt-1 ' src={pen} />  
        </div>
      </div>
      
      {expData.map((data, index) => (
        <div key={index} className={`flex flex-row ${index !== expData.length - 1 ? 'border-b-4 m-4' : 'm-4'}`}>
          <img className='rounded-full h-20 m-4' src={mnc} alt="Institute logo" />
          <div className='flex flex-col'>
            <span className='font-bold text-[20px]'>{data.companyName}</span>
            <span className='text-[20px]'>{data.title}</span>
            <span>{data.employmentType}</span>
            <span>{`${data.startMonth} ${data.startYear} - ${data.endMonth} ${data.endYear}`}</span>
            <span className='mb-6'>{`Grade: 8.5 SPI`}</span>
          </div>
        </div> 
      ))} 

      
    </div>
  )
}

export default Experience
