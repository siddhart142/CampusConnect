import React from 'react'
import Post from './Post'
import next from "../public/next.png"
import { useSelector } from 'react-redux'

const YourPost = () => {
  const post = useSelector((store)=>store.post.posts)
  console.log("yourPost",post)
  return (
    <div className='mt-8 shadow-2xl bg-white'>
      <div className='flex flex-row justify-between m-4 border-b-4'>
        <span className='font-bold text-3xl m-4'>Your Posts</span>
        <img className='h-10 m-4' src={next} />
      </div>
      <div className='flex flex-col shadow-3xl bg-white '>
        <Post postData={post[0]}/>
      </div>
      
    </div>
  )
}

export default YourPost
