import axios from 'axios';
import React, { useEffect, useState } from 'react';
import camera from "../public/camera.gif"
import pen from "../public/pen.png"

import {useDispatch,useSelector } from 'react-redux';

import EditProfile from './EditProfile';
import Educationform from './Forms/Education.form'
import Skill from './Forms/Skill.form'
import ProjectForm from './Forms/Project.form'
import ExperienceForm from './Forms/Experience.form'
import EditCover from './EditCover';
import Education from './Education';
import Experience from './Experience';
import Project from './Project';
import EditAvatar from './EditAvatar';
import { postUser } from '../utlis/userSlice';
import YourPost from './YourPost';

const Profile = () => {

  const dispatch =  useDispatch()
  const user = useSelector((store)=>store.user)
  const addEducation = useSelector((store)=>store.education.addEducation)
  const addExperience = useSelector((store)=>store.experience.addExperience)
  const addProject = useSelector((store)=>store.project.addProject)

  const [fullName,setfullName] = useState("")
  const [headline,setHeadline] = useState("")
  const [userData,setUserData] = useState()

  const [editCover,setEditCover] = useState(false)
  const [editProfile,setEditProfile] = useState(false)
  const [editAvatar,setEditAvatar] = useState(false)
  const [editIntro,setEditIntro] = useState(false)

  const [addSkill, setAddSkill] = useState(false)

  const fetchData = async () => {
   
    try{
      if(!user.length){
        const resp =  await axios.get("http://localhost:8000/api/v1/users/getUserDetails",{
        withCredentials: true
      })
      dispatch(postUser(resp.data?.data))
      setUserData(resp.data?.data)
    }else{
      setUserData(user)
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // console.log("ree",resp)
  };


  const handleAddSkill = ()=>{
    setAddSkill(true)
    // onClose()
  }

  const handleAddSkillClose = ()=>{
    setAddSkill(false)
  }
 

  
  const handleCoverClick = () =>{
    setEditCover(true)

  }
  const handleEditCoverClose = () => {
    setEditCover(false)

  }

  const handleEditAvatar = ()=>{
    setEditAvatar(true)
  }

  const handleEditAvatarClose = ()=>{
    setEditAvatar(false)
  }

  

  const handleAddProfileSection = () => {
    setEditProfile(true)

  }

  const handleAddProfileSectionClose = () =>{
    setEditProfile(false)

  }

  const handleIntro = ()=>{
    setEditIntro(true)
    setfullName(userData.fullName)
    setHeadline(userData.headline?? "")
  }

  const handleHeadlineChange = (e) => {

    console.log(e.target.value)
    setHeadline(e.target.value)
  }

  const handleNameChange = (e) => {
    setfullName(e.target.value)
  }

  const handleIntroSave = async() =>{
    const postData = {
      "fullName" : fullName,
      "headline" : headline
    }
    const response = await axios.post("http://localhost:8000/api/v1/users/updatedata", postData,  {
        withCredentials: true, // Set the withCredentials option to true
        // other options if needed
        headers: {
          "Content-Type": "application/json",
        },

        
      });
      dispatch(postUser(response?.data?.data))
      setEditIntro(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  if(!userData) return null


  return (
    <div className={`grid grid-cols-12 grid-flow-col bg-slate-500 }   `}>
    <div className='col-span-1 mx-4 '>
      
      </div>
    <div className='col-span-4 mx-4 mt-36  '>
    <div className=' flex flex-col rounded-2xl shadow-xl bg-gradient-to-r from-green-100 to-blue-300  mt-8 '>
          <Education  />
        </div>
        <div className=' flex flex-col rounded-2xl shadow-xl bg-gradient-to-r from-green-100 to-blue-300  mt-8'>
          <Experience  />
        </div>
      <div className=' flex flex-col rounded-2xl shadow-xl bg-gradient-to-r from-green-100 to-blue-300 mt-8 '>
        <Project  />
      </div>
    </div>


      <div className={`col-span-6 flex flex-col  mt-44 mx-8    ${editCover || editProfile || addEducation || addSkill || addProject || addExperience ? 'filter blur-sm': ""}  `}>
          <div className=' flex flex-col rounded-2xl shadow-xl bg-white '>
            <img className='h-[600px] w-full rounded-xl' src = {userData.coverImage?userData.coverImage: "https://i.pinimg.com/236x/53/aa/af/53aaaff2bd89ab21f55db9b5bb8bd024.jpg"} alt="cover Image"/>
            <div className='h-16 w-16 -mt-[570px]  rounded-full'>
              <img className='rounded-full ml-[1300px] ' src={camera} alt="edit Cover" onClick={handleCoverClick}/>
            </div>
            
            
            <img className='h-48 w-48 mt-96 ml-10 border-4 border-white rounded-full cursor-pointer' src={userData?.avatar ? userData.avatar : "https://cdn-icons-png.freepik.com/512/10302/10302971.png"} alt="dp" onClick={handleEditAvatar} />
            <span className='font-mono font-bold text-3xl ml-5'>{editIntro ? (<input type="text" value={fullName} onChange={handleNameChange} />) : (userData.fullName || "No name available")}
          </span>
            <img className='h-10 w-10 ml-[1300px] -mt-10 cursor-pointer' src={pen} onClick={handleIntro} />  
            <span className='text-2xl font-mono my-4 from-neutral-800 ml-5'>{editIntro ? (<input type="text" value={headline} onChange={handleHeadlineChange} />) : (userData.headline?? "Headlines")}</span>
            {editIntro && <button onClick={handleIntroSave}>save</button>}
            <button className='w-44 p-2 m-4 bg-white border border-blue-500 text-blue-500 font-bold rounded-2xl hover:bg-blue-500 hover:border-white hover:text-white' onClick={handleAddProfileSection}>Add Profile Section</button>
          </div>
          {/* <div className='w-auto'> */}
          <YourPost/>
          {/* </div> */}
          
      </div>


      
      {editAvatar && <EditAvatar onClose={handleEditAvatarClose}/>  }
      {editCover && <EditCover onClose={handleEditCoverClose}/>  }
          {editProfile && <EditProfile onClose={handleAddProfileSectionClose} onSkill={handleAddSkill}   />}
          {addEducation && <Educationform />}
          {addSkill && <Skill onCloseForm={handleAddSkillClose}/>}
          {addProject && <ProjectForm />}
          {addExperience && <ExperienceForm />}

      <div className='col-span-1 mx-4 '>
      
      </div>

    </div>
    
  );
};

export default Profile;
