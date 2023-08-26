import React from 'react'
import Navbar from '../components/Navbar'
import MyBooks from '../components/MyBooks'

function MyBookPage() {
  return (
    <div className='bg-gradient-to-b from-blue-950 via-blue-9500 to-black'>
    <Navbar/>
    <MyBooks/>
    </div>
  )
}

export default MyBookPage