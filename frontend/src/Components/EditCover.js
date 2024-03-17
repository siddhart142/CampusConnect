import React, { useRef, useState } from 'react'
import cover from "../public/cover.png"
import axios from 'axios';
import { postUser } from '../utlis/userSlice';
import { useDispatch } from 'react-redux';
const EditCover = ({onClose}) => {

  
  const dispatch = useDispatch()

  const fileInputRef = useRef(null);
  const [selectedFile,setSelectedFile] = useState(null)

  const handleButtonClick = ()=> {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    console.log("selecttedFile",selectedFile)
  }

  const handleUpload = async() => {
    if(!selectedFile){
      console.error("Np file selected");
      return;
    }
    const formData = new FormData();
    formData.append("coverImage", selectedFile);

    // console.log(URL.createObjectURL(selectedFile))
    const response = await axios.post("http://localhost:8000/api/v1/users/cover", formData,  {
        withCredentials: true, // Set the withCredentials option to true
        // other options if needed
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(postUser(response.data?.data))
  }

  return (
    <div className='bg-white shadow-2xl rounded-xl absolute ml-[1650px] mt-96 h-[700px] w-[600px]  transform -translate-x-1/2 -translate-y-1/2 p-4 '>
        <div className='flex flex-row   my-2 justify-around'>
        <span className='text-2xl font-mono mr-56 from-neutral-800 '>Add Cover Image</span>
        <span className='ml=10 text-3xl cursor-pointer' onClick={onClose}>X</span>
        </div>
        <hr className='border-2'/>
        
        <img className='h-[500px] w-[520px] m-6 rounded-lg' src={selectedFile ? URL.createObjectURL(selectedFile) : cover} alt="cover" />
        <hr className='border-2'/>
        <div className='flex flex-row-reverse w-full '>
        <button className=' bg-blue-500 text-white py-3  px-4 m-4 font-semibold rounded-2xl' onClick={handleButtonClick} >{selectedFile ? "Change Photo" : "Edit Cover Image"}</button>

        {selectedFile &&
          <button className=' bg-blue-500 text-white py-3  px-4 m-4 font-semibold rounded-2xl' onClick={handleUpload} >Apply</button>
        }
        </div>
        <input style={{display : 'none'}} type="file" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  )
}

export default EditCover
