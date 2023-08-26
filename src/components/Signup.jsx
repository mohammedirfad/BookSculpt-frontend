import React, { useState,useEffect } from 'react';
import icon from '../../src/assets/icons8-book.gif'
import { SignUp } from '../Api/Services/userAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup({ open, setOpen ,start }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    name:'',
    password: '',
  });

  console.log(open,"kkkkkk");

  if (!open) return null;

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (formData.name.trim() === '') { // Name validation
      newErrors.name = 'Name is required';
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, you can perform further actions (e.g., login)
      try{
        const resposne = await SignUp(formData)
        if(resposne?.status ===201){
          setOpen(false)
          start(true)
          formData=""
          toast.success("Login Sucess")
          

        }
        else{
        toast.error(resposne?.data?.message)
        }

      }
      catch(err){
       
        toast.error(err?.response?.data?.message);
      }


    } else {
      // Form has errors, update the state to display them
      setErrors(newErrors);
    }
  };



  return (
    <>
      <div className="fixed inset-0 bg-black opacity-40" onClick={() => setOpen(false)} />
      <div className="fixed 2xl:left-1/3 2xl:right-1/3 xl:right-1/4 xl:left-1/4 lg:right-60 lg:left-60 sm:right-24 sm:left-24 left-10 right-10 bottom-12 top-12 bg-white rounded-lg border-stone-600 shadow-3xl flex justify-center">
        <div className="w-full h-full flex justify-center bg-book bg-cover bg-full  rounded-lg">
          <div className="lg:w-[1000px] h-screen sm:w-[700px] w-full py-26 p-10">
          <div className="flex gap-3 flex-shrink-0 items-center justify-center">
         
         <img
           className="h-8 w-10"
           src={icon}
           alt="Your Company"
         />
         <h1 className=' text-3xl font-bold '>BookSculpt
</h1>
       </div>
            <div className="w-full flex justify-center mt-3">
              <h1 className="text-black text-4xl font-semibold">Signup</h1>
            </div>
            <div className="w-full h-full flex justify-center">
              <form className="w-full sm:mx-10 mx-0" onSubmit={handleSubmit}>
              <div className="mb-4 mt-6">
                  
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="Email">
                    Name
                  </label>
                  <input
                    className="shadow opacity-75 h-12 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4 mt-4">

                  <label className="block text-black text-xl font-bold mb-2" htmlFor="Email">
                    Email
                  </label>
                  <input
                    className="shadow opacity-75 h-12 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors?.email && <p className="text-red-500 text-xs italic">{errors?.email}</p>}
                </div>
                <div className="mb-4 mt-4">
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow opacity-75 h-12 appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-xs italic">{errors?.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-center mt-4">
                  <button
                    className="bg-white hover:bg-blue-700 text-black mt-8 text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;