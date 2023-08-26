import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'

function HomePage() {
  return (
    <div className='bg-gradient-to-b from-blue-950 via-blue-9500 to-black'>
    <Navbar/>
    <Home/>
    </div>
  )
}

export default HomePage