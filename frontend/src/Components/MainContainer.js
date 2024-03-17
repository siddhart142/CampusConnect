import React, { useState } from 'react'
import media from "../public/media.png"
import announcements from "../public/announcements.png"
import job from "../public/job.png"
import Post from './Post'
import { UseSelector } from 'react-redux'
import AddMedia from './AddMedia'


const MainContainer = () => {

    const [mediaPost,setMedia] = useState(false)
    const [announcementPost,setAnnouncement] = useState(false)
    const [jobPost,setJob] = useState(false)


    const handleMedia = () => {
        setMedia(!mediaPost)
    }

    const handleAnnouncement = () => {
        setAnnouncement(!announcementPost)
    }

    const handleJobs = () => {
        setJob(!jobPost)
    }
    
  return (
    <div className='flex flex-col mt-10'>
        <div className='bg-white border-t-8 border-b-8 rounded-3xl h-[200px]'>
            <div className='flex flex-row mx-10 mt-6'>
                <img className='h-20 mx-4' src="https://cdn-icons-png.freepik.com/512/10302/10302971.png" alt="profile" />
                <span className='mx-4 border-2 border-black w-full rounded-3xl p-7 text-2xl' >Start a post</span>
            </div>
            <div className='flex flex-row mx-8 justify-between my-4'>
                <img className='h-10 mx-10' src={media} alt="media" onClick={handleMedia}/>
                <img className='h-10 mx-10' src={announcements} alt="announcements" onClick={handleAnnouncement}/>
                <img className='h-10 mx-10' src={job} alt="jobs" onClick={handleJobs}/>
            </div>
        </div>
        <div>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>

        {mediaPost && <div className='absolute ml-[150px] mt-20 rounded-2xl w-[800px] bg-white m-4 shadow-2xl'>
            <AddMedia onClose={handleMedia} />
        </div>
        
        }
        {announcementPost && <div className='absolute ml-[150px] mt-20 rounded-2xl w-[800px] bg-white m-4 shadow-2xl'>
            <AddMedia onClose={handleAnnouncement} />
        </div>
        
        }
        {jobPost && <div className='absolute ml-[150px] mt-20 rounded-2xl w-[800px] bg-white m-4 shadow-2xl'>
            <AddMedia onClose={handleJobs} />
        </div>
        
        }
      
    </div>
  )
}

export default MainContainer
