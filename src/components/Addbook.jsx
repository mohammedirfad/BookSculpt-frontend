import React, { useEffect, useState } from 'react';
import Modal from './Login';
import { useSelector } from 'react-redux';
import { AddBooks } from '../Api/Services/ManageBook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'



function Addbook() {
  const [formData, setFormData] = useState({
    bookName: '',
    genre: '',
    price: '',
    summary: '',
    image: null
  });
   
  const Navigate = useNavigate()

  const [open,setOpen] = useState(false);
  const token = useSelector(state => state?.userAuth?.token);
  const id = useSelector(state => state?.userAuth?.id);

  

  useEffect(()=>{

  },[formData])

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { id, value, type, files } = event.target;

    if (type === 'file' && files.length > 0) {
      // Handle file input (image)
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [id]: e.target.result // Store the base64 representation of the image
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Handle other inputs
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    // Basic validation rules
    if (formData.bookName.trim() === '') {
      newErrors.bookName = 'Book name is required';
    }

    if (formData.genre.trim() === '') {
      newErrors.genre = 'Genre is required';
    }

    if (formData.price.trim() === '') {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (formData.summary.trim() === '') {
      newErrors.summary = 'Summary is required';
    }

    if (Object.keys(newErrors).length === 0) {

     try{
      const resposne = await AddBooks(id,formData,token)
      if(resposne.status ==201){
        toast.success(resposne?.data?.message)
        Navigate('/')
      }
      
     }
     catch(err){
      toast.error(err?.response?.data?.message);
     }
    } else {
      // Set errors to show to the user
      setErrors(newErrors);
    }

  };

  return (
    <div className="App" >
      <div className="w-screen h-screen flex justify-center bg-gradient-to-b from-blue-950 via-blue-9500 to-black ">
        <div className="lg:w-[1000px] h-screen sm:w-[700px] w-full py-25  p-10">
          <div className="w-full flex  justify-center">
            <h1 className='text-white text-4xl font-semibold' onClick={()=>{setOpen(true)}}>Add Your Book</h1>
          </div>
          <div className="w-full h-full flex  justify-center">
            <form className="w-full sm:mx-10 mx-0" onSubmit={handleSubmit}>
              <div className="mb-4 mt-3">
                <label className="block text-white text-xl font-bold mb-2   " htmlFor="input1">
                  Book name
                </label>
                <input
                  className="shadow  opacity-75 h-12  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bookName"
                  type="text"
                  placeholder="Book name"
                  value={formData.bookName}
                  onChange={handleInputChange}
                />
                {errors.bookName && <p className="text-red-500 text-xs italic">{errors.bookName}</p>}
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
                    value={formData.genre}
                    onChange={handleInputChange}
                  />
                  {errors.genre && <p className="text-red-500 text-xs italic">{errors.genre}</p>}
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
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
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
                  value={formData.summary}
                  onChange={handleInputChange}
                  style={{ whiteSpace: 'normal', overflowY: 'auto' }}
                />
                {errors.summary && <p className="text-red-500 text-xs italic">{errors.summary}</p>}
              </div>
              <div className="mb-4 mt-6">
                <label className="block text-white text-xl font-bold mb-2   " htmlFor="image">
                  Image
                </label>
                <input
                  className="shadow appearance-none opacity-75 h-12 opacity-10 border rounded w-full py-2 px-3 font-bold  text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="image"
                  type="file"
                  placeholder="Image"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  className="bg-white hover:bg-blue-700 text-black mt-8 text-lg  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
  );
}

export default Addbook;