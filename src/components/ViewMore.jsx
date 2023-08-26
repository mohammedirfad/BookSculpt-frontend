import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Sideimage from  '../../src/assets/sideimage.jpeg'
import { ViewBook } from '../Api/Services/ManageBook';

function ViewMore() {

  const {id} = useParams()
  const Navigate = useNavigate();
  const token = useSelector(state => state?.userAuth?.token);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect( ()=>{

    const fetchUser = async () =>{
       try{
          const response = await ViewBook(id,token);
    console.log(response?.data);
     
          setUsers(response?.data?.books[0]);
       
        
          setError(null);
       
       }
       catch(err){
         
          setError(err?.response?.data?.message);
          console.log(error);
       }
    };    
      fetchUser();
 
 }, [token,id,error]);
  return (
    <>

    <div className="mt-5 p-4 flex flex-col md:flex-row h-screen justify-center items-center mt-64 md:mt-0 bg-transparent">

<div className=" p-4 flex-1 flex  flex-wrap flex-col justify-center items-centermx-4 md:h-3/4 ">
       <img className='h-full mx-4   ' src={users?.Image} alt="sideimage" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-start  md:mx-10">
    
      <div className='flex justify-start mb-10 underline text-white mt-3 mx-auto my-auto'>
        <h1 className='text-3xl font-bold '>Single View</h1>
        </div>

  <div className="flex-wrap flex-col text-white justify-center gap-3">
  <div className="w-full h-full flex  justify-center">
            <form className="w-full sm:mx-10 mx-0 justify-center" >
              <div className="mb-4 mt-3">
                <label className="block text-white text-xl font-bold mb-2   " htmlFor="input1">
                  Book name
                </label>
                <input
                  className="shadow  opacity-75 h-12  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bookName"
                  type="text"
                  placeholder="Book name"
                  value={users.Name}
           
                />
                
              </div>
              <div className="flex mb-4 mt-6">
                <div className="w-1/2 pr-2">
                  <label className="block text-white text-xl font-bold mb-2 " htmlFor="genre">
                    Genre
                  </label>
                  <input
                    className="shadow  opacity-75 h-12  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="genre"
                    type="text"
                    placeholder="Genre"
                    value={users?.Genere}
                  
                  />
                  
                </div>
                <div className="w-1/2 pl-2 ">
                  <label className="block text-white text-xl font-bold mb-2 " htmlFor="price">
                    Price
                  </label>
                  <input
                    className="shadow h-12  opacity-75  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={users?.Price}
               
                  />
                  
                </div>
              </div>
              <div className="mb-4 mt-6">
                <label className="block text-white text-xl font-bold mb-2 ">
                  Summery
            </label> 
                <textarea
                  className="shadow appearance-none opacity-75 border h-18 w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="summary"
                  placeholder="Summary"
                  value={users?.Description}
                 
                  style={{ whiteSpace: 'normal', overflowY: 'auto' }}
                />
               
              </div>
            
              <div className="flex items-center justify-center mt-4">
              
              </div>
            </form>
          </div>
  </div>
</div>
      
    </div>
    </>
  )
}

export default ViewMore