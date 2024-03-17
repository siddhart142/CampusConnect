import React from 'react';
import media from "../public/media.png";
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from "axios"

const AddMedia = ({onClose}) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState([]);
    const [textArea,setTextarea] = useState("")
    const user = useSelector((store) => store.user);
    const sliderRef = useRef(null);

    const handleAddFile = () => {
        fileInputRef.current.setAttribute('multiple', 'multiple');
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setSelectedFile([...selectedFile, ...e.target.files]);
    };

    const settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: true
    };

    const handleTextarea = (e) =>{

        setTextarea(e.target.value)

    }
    const handleSliderScroll = (e) => {
        if (e.deltaX < 0) {
            sliderRef.current.slickPrev(); // Scroll up, display previous image
        } else if(e.deltaX>0) {
            sliderRef.current.slickNext(); // Scroll down, display next image
        }
    };

    const handleSubmit = async() => {
        const formData = new FormData();
        formData.append("desc", textArea);
        selectedFile.forEach((file) => {
            formData.append("images", file);
        });
        const response = await axios.post("http://localhost:8000/api/v1/users/post",formData,{
            withCredentials: true
          }) 

          console.log(response)
    }


    return (
        <div className="container mx-auto p-4 ">
            <div className='flex flex-row justify-between'>
                <div>
                <img className='h-20 w-20 rounded-full mx-4 mt-4' src={user.avatar} alt="dp"/>
                <span className='my-4 font-bold text-2xl'>{user.fullName}</span>
                </div>
                <div onClick={onClose} className='text-2xl font-bold cursor-pointer'>X</div>
            </div>
            <div className='container mx-auto p-4'>
            <textArea
                    className='text-2xl my-4 p-4 w-full h-[300px] rounded-lg border border-gray-300'
                    placeholder='What do you want to talk about?'
                    value={textArea}
                    onChange={handleTextarea}
                    // style={{ overflow: 'hidden', height: 'auto' }}
                
                    
                />
            <div className="slider"  onWheel={handleSliderScroll}>
                <Slider ref={sliderRef} {...settings}>
                    {selectedFile.map((file, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="mb-2 text-gray-500">{`${index + 1} / ${selectedFile.length}`}</span>
                            <img src={URL.createObjectURL(file)} alt={`slide-${index}`} className="w-full h-80" />
                        </div>
                    ))}
                </Slider>
            </div>
            </div>
            <div className='flex flex-row justify-between mt-4'>
                <img className='h-10 cursor-pointer' src={media} alt="add photos" onClick={handleAddFile}/>
                <button className='rounded-lg px-6 py-2 bg-blue-500 text-white font-bold hover:bg-blue-600' onClick={handleSubmit}>Post</button>
            </div>
            <input style={{display : 'none'}} type="file" ref={fileInputRef} onChange={handleFileChange} />
        </div>
    );
};

export default AddMedia;
