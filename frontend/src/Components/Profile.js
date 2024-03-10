import axios from 'axios';
import React, { useEffect, useState } from 'react';
import camera from "../public/camera.gif"
import pen from "../public/pen.gif"
import cover from "../public/cover.png"
import EditProfile from './EditProfile';
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editCover,setEditCover] = useState(false)
  const [editProfile,setEditProfile] = useState(false)
  const [isblur,setIsBlur] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/getUserDetails", {
        withCredentials: true, // Set the withCredentials option to true
        // other options if needed
      });
      console.log(response);
      setUserData(response?.data?.data);
      console.log(userData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCoverClick = () =>{
    setEditCover(true)
    setIsBlur(true)
  }

  const handleEditCoverClose = () => {
    setEditCover(false)
    setIsBlur(false)
  }

  const handleAddProfileSection = () => {
    setEditProfile(true)
    setIsBlur(true)
  }

  const handleAddProfileSectionClose = () =>{
    setEditProfile(false)
    setIsBlur(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`grid grid-cols-12 grid-flow-col } `}>
    <div className='col-span-3   '></div>
      <div className={`col-span-6 flex flex-col ${isblur? 'filter blur-sm': ""}  `}>
      <div className='col-span-6 flex flex-col shadow-2xl rounded-lg  '>
        <img className='h-[600px] w-[1280px] rounded-lg' src = {userData.coverImage?userData.coverImage: "https://i.pinimg.com/236x/53/aa/af/53aaaff2bd89ab21f55db9b5bb8bd024.jpg"} alt="cover Image"/>
        <img className='h-16 w-16 ml-[1150px] -mt-[570px]  rounded-full' src={camera} alt="edit Cover" onClick={handleCoverClick}/>
        
        <img className='h-48 w-48 mt-96 ml-10 border-4 border-white rounded-full' src={userData?.avatar ? userData.avatar : "https://cdn-icons-png.freepik.com/512/10302/10302971.png"} alt="dp" />
        <span className='font-mono font-bold text-3xl ml-5'>{userData?.fullName ?? "No name available"}</span>
        <img className='h-10 w-10 ml-[1150px] -mt-10  ' src={pen} />  
        <span className='text-2xl font-mono my-4 from-neutral-800 ml-5'>{userData.decsription?? "Headlines"}</span>
        <button className='w-44 p-2 m-4 bg-white border border-blue-500 text-blue-500 font-bold rounded-2xl hover:bg-blue-500 hover:border-white hover:text-white' onClick={handleAddProfileSection}>Add Profile Section</button>
        
        </div> 
      </div>
      {editCover && (
            <div className='bg-white shadow-2xl rounded-xl absolute ml-[1650px] mt-96 h-[700px] w-[600px]  transform -translate-x-1/2 -translate-y-1/2 p-4 '>
              <div className='flex flex-row   my-2 justify-around'>
              <span className='text-2xl font-mono mr-56 from-neutral-800 '>Add Cover Image</span>
              <span className='ml=10 text-3xl cursor-pointer' onClick={handleEditCoverClose}>X</span>
              </div>
              <hr className='border-2'/>
              
              <img className='h-[500px] w-[520px] m-6 rounded-lg' src={cover} alt="cover" />
              <hr className='border-2'/>
              <button className='ml-[360px] bg-blue-500 text-white py-3  px-4 m-4 font-semibold rounded-2xl' >Update Cover Image</button>
            </div>
          )}
          {editProfile && <EditProfile onClose={handleAddProfileSectionClose}/>}
      <div className='col-span-3 '></div>
    </div>
    
  );
};

export default Profile;
