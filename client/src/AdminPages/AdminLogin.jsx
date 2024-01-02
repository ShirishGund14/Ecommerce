import React, { useState } from 'react'
import ErrorMessage from '../Components/ErrorMessage';

const AdminLogin = () => {

const [showToast,setShowToast]=useState(false);
const [msg,setMsg]=useState('');
const [type,setType]=useState('');

const handleLogin = async(e) => {
  e.preventDefault()

  setShowToast(true);

  setMsg("msg dynamic")
  setType('error');

  setTimeout(() => {
    setShowToast(false);
  }, 3000);
}


  return (
    <>
      <ErrorMessage showToast={showToast} msg={msg} type={type}/>
      <button onClick={handleLogin}>TEST</button>
    </>
  )
}

export default AdminLogin
