import React from 'react'
import like from "../public/like.png"
import share from "../public/share.png"
import comment from "../public/comment.png"
import liked from "../public/liked.png"
import { useState, useRef } from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Post = ({postData}) => {

  console.log("postDta",postData)
    const [showFullText, setShowFullText] = useState(false);
    const [activeLike , setActiveLike] = useState(false)
    const sliderRef = useRef(null);
  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleLike = ()=>{
    if(!activeLike)
    {
        // const postLike = await axios
    }  
    setActiveLike(!activeLike)
  }
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true
};
  const handleSliderScroll = (e) => {
    if (e.deltaX < 0) {
        sliderRef.current.slickPrev(); // Scroll up, display previous image
    } else if(e.deltaX>0) {
        sliderRef.current.slickNext(); // Scroll down, display next image
    }
};
  return (
    <div className='bg-white  rounded-3xl text-[20px]  '>
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
        <p className={`mb-4 text-[20px] ${!showFullText ? 'overflow-hidden h-[3em] ' : ''}`}>
          {postData.desc}
        </p>
        {!showFullText && (
          <button className="text-blue-500" onClick={handleToggleText}>
            See more
          </button>
        )}
        <div className="slider"  onWheel={handleSliderScroll}>
          <Slider ref={sliderRef} {...settings}>
              {postData.images.map((file, index) => (
                  <div key={index} className="flex flex-col items-center">
                      <span className="mb-2 text-gray-500">{`${index + 1} / ${postData.images.length}`}</span>
                      <img src={file} alt={`slide-${index}`} className="w-full h-[600px]" />
                  </div>
              ))}
          </Slider>
            </div>
        </div>
        <div className='flex flex-row justify-between m-4'>
            <span>{postData.likeCount}</span>
            <span>{postData.commentCount}</span>
        </div>
        <div className='flex flex-row justify-between mx-8 my-4 '>
            <img className='h-10 mb-4' src={activeLike ? liked : like} alt="like" onClick={handleLike}/>
            <img className='h-10' src={comment} alt="comment" />
            <img className='h-10' src={share} alt="share"/>
        </div>
      
    </div>
  )
}

export default Post
