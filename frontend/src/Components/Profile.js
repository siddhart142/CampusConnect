import axios from 'axios';
import React, { useEffect, useState } from 'react';
import camera from "../public/camera.gif"
import pen from "../public/pen.gif"

import EditProfile from './EditProfile';
import Educationform from './Forms/Education.form'
import Skill from './Forms/Skill.form'
import ProjectForm from './Forms/Project.form'
import  ExperienceForm from './Forms/Experience.form'
import EditCover from './EditCover';
import Education from './Education';
import Experience from './Experience';
import Project from './Project';
import EditAvatar from './EditAvatar';
const Profile = () => {
  const [userData, setUserData] = useState({});

  const [userEducation,setUserEducation] = useState()
  const [userExperience,setUserExperience] = useState()
  const [userProject,setUserProject] = useState()
  const [fullName,setfullName] = useState("")
  const [headline,setHeadline] = useState("")

  const [editCover,setEditCover] = useState(false)
  const [editProfile,setEditProfile] = useState(false)
  const [editAvatar,setEditAvatar] = useState(false)
  const [editIntro,setEditIntro] = useState(false)

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

      const experienceData = await axios.get("http://localhost:8000/api/v1/users/getUserExperience",{
        withCredentials: true
      })

      const projectData = await axios.get("http://localhost:8000/api/v1/users/getUserProjects",{
        withCredentials: true
      })
      // console.log(educationData)
      // console.log(response);
      setUserData(response?.data?.data);
      setUserEducation(educationData?.data)
      setUserExperience(experienceData?.data)
      setUserProject(projectData?.data)

      console.log("userdata", userData)
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

  const handleEditAvatar = ()=>{
    setEditAvatar(true)
  }

  const handleEditAvatarClose = ()=>{
    setEditAvatar(false)
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

    console.log(fullName,headline)

    const postData = {
      "fullName" : fullName,
      "headline" : headline
    }

    console.log(postData)
    const response = await axios.post("http://localhost:8000/api/v1/users/updatedata", postData,  {
        withCredentials: true, // Set the withCredentials option to true
        // other options if needed
        headers: {
          "Content-Type": "application/json",
        },

        
      });
      console.log("profile",response)

      setEditIntro(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`grid grid-cols-12 grid-flow-col bg-gray-200 }   `}>
    <div className='col-span-3   '></div>
      <div className={`col-span-6 flex flex-col   ${editCover || editProfile || addEducation || addSkill || addProject || addExperience ? 'filter blur-sm': ""}  `}>
          <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8 '>
            <img className='h-[600px] w-[1280px] rounded-xl' src = {userData.coverImage?userData.coverImage: "https://i.pinimg.com/236x/53/aa/af/53aaaff2bd89ab21f55db9b5bb8bd024.jpg"} alt="cover Image"/>
            <img className='h-16 w-16 ml-[1150px] -mt-[570px]  rounded-full' src={camera} alt="edit Cover" onClick={handleCoverClick}/>
            
            <img className='h-48 w-48 mt-96 ml-10 border-4 border-white rounded-full cursor-pointer' src={userData?.avatar ? userData.avatar : "https://cdn-icons-png.freepik.com/512/10302/10302971.png"} alt="dp" onClick={handleEditAvatar} />
            <span className='font-mono font-bold text-3xl ml-5'>{editIntro ? (<input type="text" value={fullName} onChange={handleNameChange} />) : (userData.fullName || "No name available")}
          </span>
            <img className='h-10 w-10 ml-[1150px] -mt-10 cursor-pointer' src={pen} onClick={handleIntro} />  
            <span className='text-2xl font-mono my-4 from-neutral-800 ml-5'>{editIntro ? (<input type="text" value={headline} onChange={handleHeadlineChange} />) : (userData.headline?? "Headlines")}</span>
            {editIntro && <button onClick={handleIntroSave}>save</button>}
            <button className='w-44 p-2 m-4 bg-white border border-blue-500 text-blue-500 font-bold rounded-2xl hover:bg-blue-500 hover:border-white hover:text-white' onClick={handleAddProfileSection}>Add Profile Section</button>
          </div>

          { userEducation && <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8'>
            <Education edData={userEducation} />
          </div> }
          { userExperience && <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8'>
            <Experience expData={userExperience} />
          </div> }
          { userProject && <div className=' flex flex-col rounded-2xl bg-white border-b-8 border-t-8'>
            <Project projectData={userProject} />
          </div> }
      </div>
      {editAvatar && <EditAvatar onClose={handleEditAvatarClose}/>  }
      {editCover && <EditCover onClose={handleEditCoverClose}/>  }
          {editProfile && <EditProfile onClose={handleAddProfileSectionClose} onEducation={handleAddEducation} onSkill={handleAddSkill}  onProject={handleAddProject}  onExperience={handleAddExperience}  />}
          {addEducation && <Educationform onCloseForm={handleAddEducationClose}/>}
          {addSkill && <Skill onCloseForm={handleAddSkillClose}/>}
          {addProject && <ProjectForm onCloseForm={handleAddProjectClose}/>}
          {addExperience && <ExperienceForm onCloseForm={handleAddExperienceClose}/>}
      <div className='col-span-3 '></div>
    </div>
    
  );
};

export default Profile;
