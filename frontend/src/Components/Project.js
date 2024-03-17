import React, { useEffect } from 'react'
import pen from "../public/pen.gif"
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { postProject, toggleProject } from '../utlis/projectSlice'
const Project = () => {

    // console.log("project Comp",projectData)
    // const dataArray = projectData.data
    const dispatch = useDispatch()
    const userProject = useSelector((store)=>store.project.project)
    // const dataArray = userProject.data
    console.log("project",userProject)

    const fetchData = async()=>{
      const projectData = await axios.get("http://localhost:8000/api/v1/users/getUserProjects",{
        withCredentials: true
      })
      
     
      dispatch(postProject(projectData?.data?.data))
    }
    const handleClick = ()=>{
      dispatch(toggleProject())
    }
    useEffect(()=>{
      fetchData();
    },[])
  return (
    <div className=' '>
       <div className='flex justify-between m-6 '>
        <span className='font-bold text-2xl mb-3'>Projects</span>
        <div className='flex flex-row '>
          <span className='mx-2 font-mono font-semibold text-3xl' onClick={handleClick}>+</span>
          <img className='h-8 w-8 mx-2 mt-1' src={pen} />  
        </div>
      </div>
      {userProject.map((data, index) => (
  <div key={index} className={`flex flex-row ${index !== userProject.length - 1 ? 'border-b-4 m-4' : ''}`}>
    {/* <img className='rounded-full h-20 m-4' src="https://e7.pngegg.com/pngimages/174/212/png-clipart-logo-internet-company-service-multinational-corporation-company-service.png" alt="Institute logo" /> */}
    <div className='flex flex-col'>
      <span className='font-bold text-[20px] mx-8'>{data[0].title}</span>
      <span className='text-[20px] mx-8 mt-4'>{data[0].desc}</span>
      {/* <span>{data.employmentType}</span> */}
      <span className='mx-8 mt-4 mb-8'>{`${data[0].startMonth} ${data[0].startYear} - ${data[0].endMonth} ${data[0].endYear}`}</span>
      {/* <span className='mb-6'>{`Grade: 8.5 SPI`}</span> */}
    </div>
  </div>
))} 

      
    </div>
  )
}

export default Project


