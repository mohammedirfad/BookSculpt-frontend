import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { myBooks } from '../Api/Services/ManageBook';
import loadgifs from '../assets/bookloader.gif'
import { useSelector } from 'react-redux';

function MyBooks() {

    const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm , setSearchTerm] =useState("");
  const [isLoading, setIsLoading] = useState(true);
    const Navigate = useNavigate();
    const token = useSelector(state => state?.userAuth?.token);
   

    useEffect(() => {
      const fetchMyBooks = async () => {
          try {
        console.log(token,"token");      
            const response = await myBooks(token);
console.log(response?.data,";;;;");
              if(response.status === 200) {
                setUsers(response?.data.books);
           
              setIsLoading(false);
              setError(null);
              } 
          } catch (err) {
              setIsLoading(false);
              setError(err?.response?.data?.message);
          }
      };

      fetchMyBooks();
  }, []);


     if (isLoading) {
        return <div className='w-full'>
          <div className='flex justify-center items-center w-full'>
          
            <img className='w-48 h-48 justify-center' src={loadgifs} alt='loading.....'></img>
          </div>
        </div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
  return (
    <div className='mx-5 text-white  my-10 mt-5 p-6'>
    {error}
   
    <div className='mx-5 my-4 flex flex-roew gap-3 w-1/2'>
<input id='search' className='text-black w-full  border border-gray-400 text-start h-8 my-3 mx-2 rounded-md' placeholder="  search Book Name" onChange={(e)=>setSearchTerm(e.target.value)} />
<button className='bg-black rounded-md h-8 my-3'><h1 className='text-white font-semibold mx-2 '>Search</h1></button>
</div>
   
   <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
         {users && users.filter((val)=>{
            if(searchTerm == ""){
                return val;
            }
            else if (val?.Name.includes(searchTerm)){
                return val
            }
         }).
         map(item => (
           <div className='bg-whit' to={'/rooms/' +item._id}>
             <div className="bg-gray-500 mb-2 rounded-2xl flex">
               {/* {item.images?.[0] && ( */}
                 <img className="rounded-xl object-cover aspect-square" src={item.Image} alt=""/>
               {/* )} */}
   
   
             </div>
             <h2 className="font-bold">{item?.Name}</h2>
             <h3 className="text-sm text-gray-500">{item?.Genere}</h3>
             <div className="mt-1">
               <span className="font-bold">₹{item?.Price}</span> 
             </div>
             <div className="mt-3 flex gap-3 justify-between  ">
              
              
               <span className="font-bold border border-white rounded-md" onClick={()=>Navigate('/ViewBook/'+ item?._id)}><h1 className='mx-2 my-1'>View More</h1></span> 
             </div>
           </div>
         ))}
       </div>
   
      </div>
  )
}

export default MyBooks