import React, { useState } from 'react'


const EditProfile = ({onClose,onEducation,onSkill,onProject,onExperience}) => {

  
  const handleAddEducation = ()=>{

    onEducation()
    onClose()
  }
  const handleAddSkill = ()=>{
    onSkill()
    onClose()
  }
  const handleAddProject = ()=>{
    onProject()
    onClose()
  }
  const handleAddExperience= ()=>{
    onExperience()
    onClose()
  }

  

  return (
    <div className='bg-gray-200 shadow-2xl rounded-xl absolute ml-[1650px] mt-96 h-[500px] w-[600px]  transform -translate-x-1/2 -translate-y-1/2 p-4'>
      <div className='flex flex-row   my-2 justify-around border-b-4 p-3 border-zinc-300'>
        <button className='text-3xl font-mono mr-56 from-neutral-800 font-bold '>Add To Profile</button>
        <button className=' text-3xl font-bold' onClick={onClose}>X</button>
      </div>
      <div className='flex flex-col'>
      <button className='text-2xl font-mono font-semibold m-4 border-b-4 border-zinc-300 p-2 text-slate-600 mt-10 hover:text-3xl hover:text-blue-400' onClick={handleAddSkill}>Add Skills</button>
      <button className='text-2xl font-mono font-semibold m-4  border-b-4 p-2 border-zinc-300 text-slate-600 hover:text-3xl hover:text-blue-400' onClick={handleAddEducation}>Add Education</button>
      <button className='text-2xl font-mono font-semibold m-4  border-b-4 p-2 border-zinc-300 text-slate-600 hover:text-3xl hover:text-blue-400' onClick={handleAddProject}>Add Project</button>
      <button className='text-2xl font-mono font-semibold m-4  border-b-4 p-2 border-zinc-300 text-slate-600 hover:text-3xl hover:text-blue-400' onClick={handleAddExperience}>Add Experience</button>
      </div>
      
    </div>
  )
}

export default EditProfile
