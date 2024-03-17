import React, { useEffect } from 'react';
import pen from "../public/pen.gif";
import { useDispatch, useSelector } from 'react-redux';
import { postEducation, toggleEducation } from '../utlis/educationSlice';
import axios from 'axios';

const Education = () => {
  const dispatch = useDispatch()
  const userEducation = useSelector((store) => store.education.education)
  console.log("ed ",userEducation)

  const fetchData = async() => {
    const educationData = await axios.get("http://localhost:8000/api/v1/users/getUserEducation",{
        withCredentials: true
      })

      dispatch(postEducation(educationData?.data?.data))
  }

  const handleClick = ()=>{
    dispatch(toggleEducation())
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className=''>
      <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Education</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl' onClick={handleClick}>+</span>
          <img className='h-8 w-8 mx-2 mt-1' src={pen} alt="Pen icon"/>
        </div>
      </div>

      {userEducation.map((data, index) => (
          <div key={index} className={`flex flex-row ${index !== userEducation.length - 1 ? 'border-b-4 m-4' : 'm-4'}`}>
          <img className='rounded-full h-20 m-4' src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-scool-college-logo-victor-vector-png-image_6634445.png" alt="Institute logo" />
          <div className='flex flex-col'>
            <span className='font-bold text-[20px]'>{data[0].institute}</span>
            <span className='text-[20px]'>{data[0].degree}</span>
            <span>{data[0].fieldOfStudy}</span>
            <span>{`${data[0].startMonth} ${data[0].startYear} - ${data[0].endMonth} ${data[0].endYear}`}</span>
            <span className='mb-6'>{`Grade: 8.5 SPI`}</span>
          </div>
        </div> 
      ))}

    </div>
  );
};

export default Education;
