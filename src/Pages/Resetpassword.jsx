import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {IoArrowBackOutline} from "react-icons/io5"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { auth } from '../services/url';
function Resetpassword() {
    const [data,setdata]=useState();
    const [mailsent,setmailsent]=useState(false);
    function changehandler(e){
        setdata(e.target.value); 
       }
    async function resetpassword(){
        const loadingtoast=toast.loading("Please wait....")
        try{
           const result=await axios.post(auth.resetpasswordtokenurl,{email:data})
           console.log(result);
           if(result.status===200){
            setmailsent(true);
            toast.success("A link was sent to your mail")
           }else{
            throw new Error("Error hogeya jee")
           }
        }catch(err){
          toast.error(err.response.data.Message);
        }
       toast.dismiss(loadingtoast);
    }
    function submithandler(e){
        e.preventDefault();
        if(!data){
            toast.error("Email id is required")
            return;
        }
        resetpassword();
    }
  return (
    <div className=' flex flex-col  text-lg text-white min-h-[calc(100vh-3.5rem)] items-center justify-center'>
      <div className={`lg:w-[40vw] w-[95vw] flex flex-col ${mailsent===true?" gap-6":" gap-3"}`}>
      <div>
            <h1 className=' text-4xl '>{`${mailsent===true?"Check email":"Reset your password"}`}</h1>
         </div>
         <div>
            <p >{mailsent===true?`We have sent the resetlink email to ${data}`:"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}</p>
         </div>
         <form onSubmit={submithandler} className=' flex flex-col gap-3'>
             {
                mailsent===true?"":<><label className=' text-base' htmlFor='Emailid'>Email Adress</label>
                <input className=' text-white p-3 rounded-lg bg-richblack-700 outline-1 outline-dotted outline-yellow-25' placeholder='Enter email edress' type='email' onChange={changehandler} id='Emailid' required ></input></>
             }
            <button className=' bg-yellow-50 text-richblack-900 p-3 rounded-lg'>{mailsent===true?"Resend mail":"Submit"}</button>
         </form>
         <div className=' items-start justify-start'>
            <Link className=' flex gap-2 items-center  font-semibold' to="/login"><IoArrowBackOutline/>Back To Login</Link>
         </div>
      </div>
    </div>
  )
}

export default Resetpassword