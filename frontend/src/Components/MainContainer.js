import React from 'react'
import media from "../public/media.png"
import announcements from "../public/announcements.png"
import job from "../public/job.png"
import Post from './Post'
const MainContainer = () => {
  return (
    <div className='flex flex-col mt-10'>
        <div className='bg-white border-t-8 border-b-8 rounded-3xl h-[200px]'>
            <div className='flex flex-row mx-10 mt-6'>
                <img className='h-20 mx-4' src="https://cdn-icons-png.freepik.com/512/10302/10302971.png" alt="profile" />
                <span className='mx-4 border-2 border-black w-full rounded-3xl p-7 text-2xl' >Start a post</span>
            </div>
            <div className='flex flex-row mx-8 justify-between my-4'>
                <img className='h-10 mx-10' src={media} alt="media"/>
                <img className='h-10 mx-10' src={announcements} alt="announcements"/>
                <img className='h-10 mx-10' src={job} alt="jobs"/>
            </div>
        </div>
        <div>
            <Post/>
            <Post/>
            <Post/>
            <Post/>

        </div>
      
    </div>
  )
}

export default MainContainer
