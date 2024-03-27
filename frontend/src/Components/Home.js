import React, { useEffect } from 'react'
import MainContainer from './MainContainer'
import axios from 'axios'

import { postUser } from '../utlis/userSlice'

import { useDispatch, useSelector } from 'react-redux'
import { postPosts } from '../utlis/postSlice'


const Home = () => {

const dispatch = useDispatch();

const fetchData = async () => {
  try {
    const userData = await axios.get("http://localhost:8000/api/v1/users/getUserDetails", {
      withCredentials: true, // Set the withCredentials option to true
      // other options if needed
    });

    // console.log("HOME ",response)

    const postsData = await axios.get("http://localhost:8000/api/v1/users/post",{
      withCredentials : true,
    })
    console.log("posts",postsData)
    const tempPost = postsData.data.data
    tempPost.map((data)=> dispatch(postPosts(data)))
    dispatch(postUser(userData?.data?.data))
    // console.log("userdata", userData)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// const user = useSelector((store)=>store.user )
//   console.log("HeaderHome",user)
  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className='grid grid-cols-12 grid-flow-col bg-gray-200 mt-36'>
    <div className='col-span-4'></div>
    <div className='col-span-4'>
      <MainContainer/>
      
    </div>
    <div className='coll-span-4'></div>
     
    </div>
  )
}

export default Home
