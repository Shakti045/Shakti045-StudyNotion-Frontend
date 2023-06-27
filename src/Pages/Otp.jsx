import { useState } from 'react';
import OtpInput from 'react-otp-input';
import {BiReset} from "react-icons/bi"
import {IoArrowBackOutline} from "react-icons/io5"
import { toast } from 'react-hot-toast';
import { toast as toast2 } from 'react-toastify';
import { auth } from '../services/url';
import axios from 'axios';
import { useTimer } from "react-timer-hook";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
function Otp({setshowotppage,data,sendotp}) {
    const [otp, setOtp] = useState('');
    const navigate=useNavigate();
    const [disabled,setdisabled]=useState(true);
    async function signup(){
        const loadertoast=toast.loading("Please wait....")
        try{
          const result=await axios.post(auth.signupurl,{...data,otp:otp})
          if(result.status===200){
            toast.dismiss(loadertoast);
            toast.success("Account created successfully");
            navigate("/login")
          }
        }catch(err){
            toast.dismiss(loadertoast);
            toast.error(err.response.data.Message)
        }
    }

    function handler(){
        if(otp.length!==6){
            toast.error("Otp of 6 length required")
            return;
        }
        signup();
    }
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);

    async function resendhanler(){
      if(disabled){
        toast2.warn("Please wait for timer to finish")
      }else{
        await sendotp(data);
        setdisabled(true);
        restart(time)
      }
    }
    const {
      seconds,
      minutes,
      restart,
    } = useTimer({onExpire: () => setdisabled(false)});
   useEffect(()=>{
    restart(time)
   },[])
  return (
    <div className='  bg-richblack-900 w-screen h-[calc(100vh-3.5rem)] font-inter flex flex-col items-center justify-center'>
    <div className=' flex flex-col gap-5'>
      <p className=' text-richblack-5 text-4xl font-semibold'>Verify Email</p>
       <p className=' text-richblack-25 text-lg opacity-80'>A verification code has been sent to you. Enter the <br></br> code below</p>
       <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      containerStyle="flex gap-2 text-4xl    text-white"
      inputStyle="bg-richblack-600 otpinput px-2 py-1 outline-yellow-50 rounded-lg"
      inputType='number'
    />
    <button onClick={handler} className=' p-3 rounded-lg bg-yellow-100 text-richblack-900'>Verify Email</button>
    <div className='  flex justify-between text-white'>
        <button className=' flex items-center gap-2' onClick={()=>setshowotppage(false)}><IoArrowBackOutline/>Back to signup</button>
        <button onClick={resendhanler} className=' flex gap-2   items-center text-blue-300'><BiReset/> Resend it</button>
    </div>
     {
      disabled && (
        <div className=' bg-richblack-700 p-2 rounded-sm ' >
        <p className=" text-lg   text-white ">
         <span>You Can Resend Otp After </span> 
        <span>{minutes}</span>:<span>{seconds}</span>
        </p>
        </div>
      )
     }
    </div>
    </div>
  )
}

export default Otp