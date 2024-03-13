import React from 'react'

import pen from "../public/pen.gif"

const Experience = ({expData}) => {
//   console.log("Experience Comp",expData)

  if(!expData.data) return null
  const dataArray = expData.data
  return (
    <div className=' '>
       <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Experience</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl'>+</span>
          <img className='h-8 w-8 mx-2 mt-1' src={pen} />  
        </div>
      </div>
      
      {dataArray.map((data, index) => (
        <div key={index} className={`flex flex-row ${index !== dataArray.length - 1 ? 'border-b-4 m-4' : ''}`}>
          <img className='rounded-full h-20 m-4' src="https://e7.pngegg.com/pngimages/174/212/png-clipart-logo-internet-company-service-multinational-corporation-company-service.png" alt="Institute logo" />
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
