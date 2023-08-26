import React from 'react'
import Sideimage from  '../../src/assets/sideimage.jpeg'
import { useNavigate } from 'react-router-dom'

function Home() {

    const Navigate = useNavigate()

  return (
    <>
     <div className="flex flex-col md:flex-row h-screen justify-center items-center mt-64 md:mt-0 bg-transparent">
      <div className=" p-4 flex-1 flex flex-col justify-start items-start  md:mx-10 ">
        <h2 className='justify-center font-bold text-white text-5xl md:text-7xl md:mx-4 text-start'>BOOK STORE </h2>
        <h2 className=' font-bold text-4xl md:text-6xl md:mx-4 mt-1'>FOR YOU </h2>

        <h2 className=' font-bold text-2xl md:mx-4 mt-6'>View Amazing Books Here. </h2>
        <button className='text-start md:mx-4 rounded-md bg-white my-5' onClick={()=>Navigate('/books')}><h1 className='font-semibold text- text-black mx-2 my-2'>View Books</h1></button>
      </div>
      <div className=" p-4 flex-1 flex flex-col justify-center items-centermx-4 md:h-3/4 ">
       <img className='h-full mx-4   ' src={Sideimage} alt="sideimage" />
      </div>
    </div>
    </>
  )
}

export default Home