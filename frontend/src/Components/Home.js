import React from 'react'
import MainContainer from './MainContainer'
import Post from './Post'

const Home = () => {
  return (
    <div className='grid grid-cols-12 grid-flow-col bg-gray-200'>
    <div className='col-span-4'></div>
    <div className='col-span-4'>
      <MainContainer/>
      
    </div>
    <div className='coll-span-4'></div>
     
    </div>
  )
}

export default Home
