import React from 'react'
import like from "../public/like.png"
import share from "../public/share.png"
import comment from "../public/comment.png"

const Post = () => {
  return (
    <div className='bg-white border-t-8 border-b-8 rounded-3xl text-[20px]  '>
        <div className='flex flex-row justify-between border-b-4 m-4'>
            <div className='flex flex-row m-4'>
                <img className='h-14' src="https://cdn-icons-png.freepik.com/512/10302/10302971.png" alt="profile"/>
                <div className='flex flex-col mx-4'>
                    <span>Your Name</span>
                    <span>Headline</span>
                </div>
            </div>
            <div className='flex flex-row m-2'>
                <span className='text-3xl m-2'>...</span>
                <span className='text-3xl m-4'>X</span>
            </div>
        </div>
        <div className='m-4 border-b-4'>
            <p className='mb-4 text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis numquam quasi harum et laborum quisquam in explicabo dolorem molestias eaque? Facere voluptate magni repudiandae accusantium quaerat eius, quisquam dolorum odit!</p>
            <img className='h-[600px] w-full' src="https://media.licdn.com/dms/image/D5622AQGqrYr6GhCNdQ/feedshare-shrink_1280/0/1710333068844?e=1713398400&v=beta&t=w1WoGHzX7vB52_Adt5s5ba5qqGTAR0nxcBTOcOaMW_8" alt="post" />
        </div>
        <div className='flex flex-row justify-between mx-8 my-4'>
            <img className='h-10' src={like} alt="like"/>
            <img className='h-10' src={comment} alt="comment" />
            <img className='h-10' src={share} alt="share"/>
        </div>
      
    </div>
  )
}

export default Post
