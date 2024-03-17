import React, { useEffect } from 'react'
import axios from 'axios'
import pen from "../public/pen.gif"
import { useSelector, useDispatch } from 'react-redux'
import { postExperience, toggleExperience } from '../utlis/experienceSlice'

const Experience = () => {
//   console.log("Experience Comp",expData)
const expData = useSelector((store)=> store.experience.experience)
const dispatch = useDispatch()
  // if(!expData.data) return null
  // const dataArray = expData.data

  console.log("exp ",expData)

  const fetchData = async()=>{
    const experienceData = await axios.get("http://localhost:8000/api/v1/users/getUserExperience",{
      withCredentials: true
    })
    dispatch(postExperience(experienceData?.data))
  }

  const handleClick = ()=>{
    dispatch(toggleExperience())
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className=' '>
       <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Experience</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl' onClick={handleClick}>+</span>
          <img className='h-8 w-8 mx-2 mt-1' src={pen} />  
        </div>
      </div>
      
      {expData.map((data, index) => (
        <div key={index} className={`flex flex-row ${index !== expData.length - 1 ? 'border-b-4 m-4' : 'm-4'}`}>
          <img className='rounded-full h-20 m-4' src="https://e7.pngegg.com/pngimages/174/212/png-clipart-logo-internet-company-service-multinational-corporation-company-service.png" alt="Institute logo" />
          <div className='flex flex-col'>
            <span className='font-bold text-[20px]'>{data.data[0].companyName}</span>
            <span className='text-[20px]'>{data.data[0].title}</span>
            <span>{data.data[0].employmentType}</span>
            <span>{`${data.data[0].startMonth} ${data.data[0].startYear} - ${data.data[0].endMonth} ${data.data[0].endYear}`}</span>
            <span className='mb-6'>{`Grade: 8.5 SPI`}</span>
          </div>
        </div> 
      ))} 

      
    </div>
  )
}

export default Experience
