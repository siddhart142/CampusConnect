import React from 'react'

import pen from "../public/pen.gif"

const Education = ({edData}) => {
  console.log("Education Comp",edData)

  if(!edData.data) return null
  const dataArray = edData.data
  return (
    <div className=' '>
       <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Education</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl'>+</span>
          <img className='h-8 w-8 mx-2 mt-1' src={pen} />  
        </div>
      </div>
      
      {dataArray.map((data, index) => (
        <div key={index} className='flex flex-row border-b-4 m-4'>
          <img className='h-20 m-4' src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-scool-college-logo-victor-vector-png-image_6634445.png" alt="Institute logo" />
          <div className='flex flex-col'>
            <span className='font-bold text-[20px]'>{data.institute}</span>
            <span className='text-[20px]'>{data.degree}</span>
            <span>{data.fieldOfStudy}</span>
            <span>{`${data.startMonth} ${data.startYear} - ${data.endMonth} ${data.endYear}`}</span>
            <span className='mb-6'>{`Grade: 8.5 SPI`}</span>
          </div>
        </div>
      ))} 

      
    </div>
  )
}

export default Education
