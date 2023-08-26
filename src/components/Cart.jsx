import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { getCart, myBooks } from '../Api/Services/ManageBook';
import loadgifs from '../assets/bookloader.gif'
import { useSelector } from 'react-redux';

function Cart() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
 
    const [isLoading, setIsLoading] = useState(true);
      const Navigate = useNavigate();
      const token = useSelector(state => state?.userAuth?.token);

  
      useEffect(() => {
        const fetchCart = async () => {
            try {
          console.log(token,"token");      
              const response = await getCart(token);
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
  
        fetchCart();
    }, []);
  
  
       if (isLoading) {
          return <div className='w-full'>
            <div className='flex justify-center items-center my-14 w-full'>
            
              <img className='w-36 h-36 justify-center' src={loadgifs} alt='loading.....'></img>
            </div>
          </div>;
        }
      
        if (error) {
          return <div>Error: {error}</div>;
        }


  return (
   <>
<div className='Tect-white font-semibold text-xl'>   {error}</div>

   </>
  )
}

export default Cart