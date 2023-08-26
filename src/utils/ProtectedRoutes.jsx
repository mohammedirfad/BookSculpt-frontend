import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from '../components/Login';

function ProtectedRoutes() {
    const clientToken = useSelector(state => state.userAuth.token);

  return (
    <>
   { clientToken ? <Outlet/> :   <Login open={true} />}

    </>
  )
}

export default ProtectedRoutes