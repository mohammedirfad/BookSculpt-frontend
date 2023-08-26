import React from 'react'
import Navbar from '../components/Navbar'
import Books from '../components/Books'

function BookPage() {
  return (
    <div className='bg-gradient-to-b from-blue-950 via-blue-9500 to-black'>
    <Navbar/>
    <Books/>
    </div>
  )
}

export default BookPage