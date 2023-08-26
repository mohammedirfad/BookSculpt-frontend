import React from 'react'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'

function CartView() {
  return (
    <div className='bg-gradient-to-b from-blue-950 via-blue-9500 to-black'>
    <Navbar/>
    <Cart/>
    </div>
  )
}

export default CartView