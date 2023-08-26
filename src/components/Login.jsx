import React, { useState } from 'react';

import icon from '../../src/assets/icons8-book.gif'
import { UserLogin } from '../Api/Services/userAuth';
import { setLogin } from '../Store/Features/authSlice';
import { useDispatch } from "react-redux";
// import Signup from '../../src/assets/signupbg.jpeg'



function Login({ open, setOpen ,start,stop}) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  if (!open) return null;

  const openSignup = ()=>{
      setOpen(false)
      stop(true)

  }

  console.log(open,"loooooooooooooooooooooooooo");
  const handleInputChange =  (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {

     try{
      const response = await UserLogin(formData) 
      console.log(response?.data);
      if(response?.status === 200){
        setOpen(false)
        let Auth = response?.data
        if(Auth){
          dispatch(
            setLogin({
               user: "user",
               name: Auth?.User.Name,
               token: Auth?.Token,
               id   : Auth?.User._id,
               WishList:Auth?.User?.WishList,
               Cart:Auth?.User?.Cart
            })
         )
        }
      }
     
     }
     catch(err){
        console.log(err?.response?.data?.message);
     }
      console.log('Form is valid. Submitting data:', formData);
    } else {
      // Form has errors, update the state to display them
      setErrors(newErrors);
    }
  };



  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpen(false)} />
      {console.log(start,"staaaaaaaaaaaa")}
      <div className="fixed 2xl:left-1/3 2xl:right-1/3 xl:right-1/4 xl:left-1/4 lg:right-60 lg:left-60 sm:right-24 sm:left-24 left-10 right-10 bottom-12 top-12 bg-white rounded-lg border-stone-600 shadow-3xl flex justify-center">
        <div className="w-full h-full flex justify-center bg-book bg-cover bg-full  rounded-lg">
          <div className="lg:w-[1000px] h-screen sm:w-[700px] w-full py-28 p-11">
          <div className="flex gap-3 flex-shrink-0 items-center justify-center">
         
                  <img
                    className="h-8 w-10"
                    src={icon}
                    alt="Your Company"
                  />
                  <h1 className=' text-3xl font-bold '>BookSculpt
</h1>
                </div>
            <div className="w-full mt-3 flex justify-center">
              <h1 className="text-black text-4xl font-semibold">Login</h1>
            </div>
           
            <div className="w-full h-full flex justify-center">
              <form className="w-full sm:mx-10 mx-0" onSubmit={handleSubmit}>
                <div className="mb-4 mt-6">
                  <label className="block text-white text-xl font-bold mb-2" htmlFor="Email">
                    Email
                  </label>
                  <input
                    className="shadow opacity-75 h-14 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4 mt-6">
                  <label className="block text-white text-xl font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow opacity-75 h-14 appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">{errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                  <button
                    className="bg-white hover:bg-blue-700 text-black mt-8 text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
<div className='flex'>
    <h1 className='text-red-500/80 font-bold '>Dont have an Account? </h1><span className='mx-1 hover:underline cursor-pointer font-bold' onClick={openSignup}>Signup</span>
</div>
                
                </div>
              </form>
              
            
            </div>
          </div>
        </div>
       
      </div>
      
    </>
  );
}

export default Login;