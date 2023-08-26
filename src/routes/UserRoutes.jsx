import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import BookPage from '../Pages/BookPage';
import AddbookPage from '../Pages/AddbookPage';
import Bookview from '../Pages/Bookview';
import MyBookPage from '../Pages/MyBookPage';
import CartView from '../Pages/CartView';
import ProtectedRoutes from '../utils/ProtectedRoutes';

function UserRoutes() {
  return (
  <div className='bg-gradient-to-b from-blue-950 via-blue-9500 to-black h-screen w-screen'>
      <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path='/books' element={<BookPage/>} />

         {/* //protected routes */}
         <Route element={<ProtectedRoutes/>}> 

         <Route path='/addbook' element={<AddbookPage/>} />
         <Route path='/ViewBook/:id' element={<Bookview/>} />
         <Route path='/myBooks' element={<MyBookPage/>} />
         <Route path='/cartView' element={<CartView/>} />

         </Route>
    </Routes>
  </div>
  )
}

export default UserRoutes