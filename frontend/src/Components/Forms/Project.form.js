import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProjectForm = ({ onCloseForm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [currentlyWorking,setCurrentlyWorking] = useState(false)


  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/projects", data, {
        withCredentials: true,
        // other options if needed
      });
  
      console.log("project response on post", response);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

 

  const years = Array.from({ length: 100 }, (_, index) => (new Date().getFullYear() - index).toString());

  return (
    <div className={`bg-white shadow-2xl rounded-xl absolute ml-[1650px] mt-96  w-[900px] transform -translate-x-1/2 -translate-y-1/2 p-4`}>
      <div className='flex flex-row my-2 justify-between border-b-4 p-3 border-zinc-300'>
        <button className='text-3xl font-mono mr-56 from-neutral-800 font-bold '>Add Experience</button>
        <button className='text-3xl font-bold' onClick={onCloseForm}>X</button>
      </div>
      <div className='flex flex-col '>
        <span className='m-4 text-gray-500'>* Indicates required </span>

        <form className='flex flex-col m-2 text-gray-500' onSubmit={handleSubmit(onSubmit)}>

          <label className='m-1 text-2xl'>Title*</label>
          <input placeholder='Ex: Retails Sales Manager' className='h-10 rounded-md mb-6 border-2 border-black p-3' {...register('title', { required: true })} />
          {errors.title && <p className='text-red-500 -mt-6 mb-6'>Please Enter Your Title</p>}

          <label className='m-1 text-2xl'>Description*</label>
         <textarea placeholder='Description' className='h-40 rounded-md mb-6 border-2 border-black p-3 resize-none' {...register('desc',{required : true})} />
         {errors.desc && <p className='text-red-500 -mt-6 mb-6'>Please provide the description</p>}
          


          <div className=''>

            <label className='block m-1 text-2xl'>Start Date*</label>
            <select className='w-[265px] mr-6 h-10 rounded-md mb-4 border-2 border-black pl-3' {...register('startMonth', { required: true })}>
              <option  value=''>Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select className='w-[270px] ml-4 h-10 rounded-md mb-6 border-2 border-black pl-3 ' {...register('startYear', { required: true })}>
              <option value=''>Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {errors.startMonth && <p className='text-red-500 -mt-6 mb-6'>Enter the Start Month</p>}
            {errors.startYear && <p className='text-red-500 ml-80 -mt-12 mb-6'>Enter the Start Year</p>}
          </div>

          <div className=''>

            <label className='block m-1 text-2xl'>End Date (or Expected)*</label>
            <select className='w-[265px] mr-4 h-10 rounded-md mb-6 border-2 border-black pl-3' {...register('endMonth')} >
              <option  value=''>Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select className='w-[270px] ml-4 h-10 rounded-md mb-6 border-2 border-black pl-3' {...register('endYear')} >
              <option value=''>Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {errors.endMonth && <p className='text-red-500 -mt-6 mb-6'>Enter the end Month</p>}
            {errors.endYear && <p className='text-red-500 ml-80 -mt-12 mb-6'>Enter the end Year</p>}
          </div>
                  
         

          <input className='border-2 border-blue-500  ml-[700px] mr-10 p-3 rounded-xl text-2xl  text-blue-500 hover:text-white hover:bg-blue-500' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
