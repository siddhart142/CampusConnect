import React from 'react'
import cover from "../public/cover.png"
const EditCover = ({onClose}) => {
  return (
    <div className='bg-white shadow-2xl rounded-xl absolute ml-[1650px] mt-96 h-[700px] w-[600px]  transform -translate-x-1/2 -translate-y-1/2 p-4 '>
        <div className='flex flex-row   my-2 justify-around'>
        <span className='text-2xl font-mono mr-56 from-neutral-800 '>Add Cover Image</span>
        <span className='ml=10 text-3xl cursor-pointer' onClick={onClose}>X</span>
        </div>
        <hr className='border-2'/>
        
        <img className='h-[500px] w-[520px] m-6 rounded-lg' src={cover} alt="cover" />
        <hr className='border-2'/>
        <button className='ml-[360px] bg-blue-500 text-white py-3  px-4 m-4 font-semibold rounded-2xl' >Update Cover Image</button>
    </div>
  )
}

export default EditCover
