import React, { useEffect } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const ErrorMessage = ({showToast,msg,type}) => {

   const notify = () => {
     toast[type](msg);
   }
   
   useEffect(() => {
     if(showToast){
        notify();
     }
   },[showToast]);

  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default ErrorMessage
