import axios from 'axios';
import React, { useEffect, useState } from 'react';
import camera from "../public/camera.gif"
import pen from "../public/pen.gif"

import EditProfile from './EditProfile';
import Educationform from './Forms/Education.form'
import Skill from './Forms/Skill.form'
import Project from './Forms/Project.form'
import Experience from './Forms/Experience.form'
import EditCover from './EditCover';
import Education from './Education';
const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userEducation,setUserEducation] = useState({})
  const [editCover,setEditCover] = useState(false)
  const [editProfile,setEditProfile] = useState(false)

  const [addEducation, setAddEducation] = useState(false)
  const [addSkill, setAddSkill] = useState(false)
  const [addProject, setAddProject] = useState(false)
  const [addExperience, setAddExperience] = useState(false)
  

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/getUserDetails", {
        withCredentials: true, // Set the withCredentials option to true
        // other options if needed
      });
      const educationData = await axios.get("http://localhost:8000/api/v1/users/getUserEducation",{
        withCredentials: true
      })

      // console.log(educationData)
      // console.log(response);
      setUserData(response?.data?.data);
      setUserEducation(educationData?.data)
      // console.log(userData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddEducation = ()=>{

    setAddEducation(true)
    // onClose()
  }
  const handleAddSkill = ()=>{
    setAddSkill(true)
    // onClose()
  }
  const handleAddProject = ()=>{
    setAddProject(true)
    // onClose()
  }
  const handleAddExperience= ()=>{
    setAddExperience(true)
    // onClose()
  }
  const handleAddEducationClose = ()=>{

    setAddEducation(false)
  }
  const handleAddSkillClose = ()=>{
    setAddSkill(false)
  }
  const handleAddProjectClose = ()=>{
    setAddProject(false)
  }
  const handleAddExperienceClose = ()=>{
    setAddExperience(false)
  }

  
  const handleCoverClick = () =>{
    setEditCover(true)

  }

  const handleEditCoverClose = () => {
    setEditCover(false)

  }

  const handleAddProfileSection = () => {
    setEditProfile(true)

  }

  const handleAddProfileSectionClose = () =>{
    setEditProfile(false)

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`grid grid-cols-12 grid-flow-col bg-gray-200 }  `}>
    <div className='col-span-3   '></div>
      <div className={`col-span-6 flex flex-col   ${editCover || editProfile || addEducation || addSkill || addProject || addExperience ? 'filter blur-sm': ""}  `}>
          <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8 '>
            <img className='h-[600px] w-[1280px] rounded-xl' src = {userData.coverImage?userData.coverImage: "https://i.pinimg.com/236x/53/aa/af/53aaaff2bd89ab21f55db9b5bb8bd024.jpg"} alt="cover Image"/>
            <img className='h-16 w-16 ml-[1150px] -mt-[570px]  rounded-full' src={camera} alt="edit Cover" onClick={handleCoverClick}/>
            
            <img className='h-48 w-48 mt-96 ml-10 border-4 border-white rounded-full' src={userData?.avatar ? userData.avatar : "https://cdn-icons-png.freepik.com/512/10302/10302971.png"} alt="dp" />
            <span className='font-mono font-bold text-3xl ml-5'>{userData?.fullName ?? "No name available"}</span>
            <img className='h-10 w-10 ml-[1150px] -mt-10  ' src={pen} />  
            <span className='text-2xl font-mono my-4 from-neutral-800 ml-5'>{userData.decsription?? "Headlines"}</span>
            <button className='w-44 p-2 m-4 bg-white border border-blue-500 text-blue-500 font-bold rounded-2xl hover:bg-blue-500 hover:border-white hover:text-white' onClick={handleAddProfileSection}>Add Profile Section</button>
          </div>

          { userEducation && <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8'>
            <Education edData={userEducation} />
          </div> }
      </div>
      {editCover && <EditCover onClose={handleEditCoverClose}/>  }
          {editProfile && <EditProfile onClose={handleAddProfileSectionClose} onEducation={handleAddEducation} onSkill={handleAddSkill}  onProject={handleAddProject}  onExperience={handleAddExperience}  />}
          {addEducation && <Educationform onCloseForm={handleAddEducationClose}/>}
          {addSkill && <Skill onCloseForm={handleAddSkillClose}/>}
          {addProject && <Project onCloseForm={handleAddProjectClose}/>}
          {addExperience && <Experience onCloseForm={handleAddExperienceClose}/>}
      <div className='col-span-3 '></div>
    </div>
    
  );
};

export default Profile;
