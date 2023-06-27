import signupimage from "../assets/Images/signup.webp"
import frame from "../assets/Images/frame.png"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import axios from "axios";
import { auth } from "../services/url";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import Otp from "./Otp";
function Signup() {
    const [role,setrole]=useState("Student")
    const [data,setdata]=useState({firstname:"",lastname:"",email:"",password:"",confirmpassword:""})
    const [showpassword,setshowpassword]=useState(false);
    const [showcnfpassword,setshowcnfpassword]=useState(false);
    const [showotppage,setshowotppage] =useState(false);
    function changehandler(event){
        setdata(()=>{
            return {...data,[event.target.name]:event.target.value}
        })
    }
    async function sendotp(data){
        // console.log("called with",data);
        const loadingtoast=toast.loading("Please wait....")
        try{
           const output=await axios.post(auth.sendotp,data);
          if(output.status===200){
            toast.dismiss(loadingtoast)
            toast.success("Otp sent successfully")
            setshowotppage(true);
          }
          
        }catch(err){
            
            toast.error(err.response.data.Message)
            toast.dismiss(loadingtoast)
        }
    }
    function submithandler(event){
        event.preventDefault();
        if(data.password!==data.confirmpassword){
            toast.error("Both password should be same")
            return;
        }
        sendotp({...data,role:role});
    }
    useEffect(()=>{
        setshowotppage(false)
    },[]);
  return (
    <>
      {
        showotppage===false?(<div className=" w-screen min-h-screen bg-richblack-900 text-white font-mono flex lg:flex-row flex-col gap-10 lg:gap-0 lg:justify-around">
        <div className=" lg:max-w-[35%]  p-4 lg:p-0 pr-3 mt-10">
        <div className=" flex flex-col gap-1">
           <p className=" text-3xl font-semibold">Join the millions learning to code with StudyNotion for free</p>
           <p>Build skills for today, tomorrow, and beyond.</p>
           <p className=" text-blue-400 text-lg font-edu-sa">Education to future-proof your career.</p>
        </div>
        <form onSubmit={submithandler} className=" flex flex-col gap-5">
           <div className="  mt-4 cursor-pointer max-w-fit px-6 py-[0.5px] bg-richblack-800 border-b-2 rounded-full flex gap-4">
               <div onClick={()=>setrole("Student")} className={`p-3 rounded-full ${role==="Student"?" bg-richblack-900":""}`}>Student</div>
               <div onClick={()=>setrole("Instructor")} className={`p-3 rounded-full ${role==="Instructor"?" bg-richblack-900":""}`} >Instructor</div>
           </div>
           <div className=" flex lg:flex-row flex-col gap-4 lg:gap-2">
               <div className=" flex flex-col">
               <label htmlFor="Firstname">First Name<sup className="text-pink-200">*</sup></label>
               <input required onChange={changehandler} placeholder="Enter First Name" className=" p-2 bg-richblack-800 text-white rounded-lg border-b-[0.5px] outline-none" id="Firstname" type="text" name="firstname" value={data.firstname}></input>
               </div>
               <div  className=" flex flex-col">
               <label htmlFor="Lastname">Last Name<sup className="text-pink-200">*</sup></label>
               <input required onChange={changehandler} placeholder="Enter Last Name" className=" p-2 bg-richblack-800 text-white rounded-lg border-b-[0.5px] outline-none" type="text" name="lastname" value={data.lastname} id="Lastname"></input>
               </div>
           </div>
           <div className=" flex flex-col">
               <label htmlFor="Email">Email<sup className="text-pink-200">*</sup></label>
               <input  placeholder="Enter your Mail" className=" p-2 bg-richblack-800 text-white rounded-lg border-b-[0.5px] outline-none" type="email" required onChange={changehandler} name="email" value={data.email} id="Email"></input>
           </div>
           <div className=" flex lg:flex-row flex-col gap-4 lg:gap-2">
                  <div className=" flex flex-col">
                   <label htmlFor="Password">Password<sup className="text-pink-200">*</sup></label>
                   <div className=" flex items-center p-2 bg-richblack-800 rounded-lg border-b-[0.5px]">
                   <input required onChange={changehandler}  type={`${showpassword===true?"text":"password"}`}placeholder="Password" className="  text-white rounded-lg bg-transparent w-full  outline-none" value={data.password} name="password"></input>
                   {
                        showpassword===true?<AiOutlineEye onClick={()=>setshowpassword(!showpassword)}></AiOutlineEye>:<AiOutlineEyeInvisible onClick={()=>setshowpassword(!showpassword)}></AiOutlineEyeInvisible>
                   }
                   </div>
                 </div>
   
                 <div className=" flex flex-col">
                   <label htmlFor="Password">Confirm Password<sup className="text-pink-200">*</sup></label>
                   <div className=" flex items-center p-2 bg-richblack-800 rounded-lg border-b-[0.5px]">
                   <input required type={`${showcnfpassword===true?"text":"password"}`} placeholder="Confirm Password" className=" w-full text-white rounded-lg bg-transparent  outline-none" value={data.confirmpassword} name="confirmpassword" onChange={changehandler}></input>
                   {
                       showcnfpassword===true?<AiOutlineEye onClick={()=>setshowcnfpassword(!showcnfpassword)}></AiOutlineEye>:<AiOutlineEyeInvisible onClick={()=>setshowcnfpassword(!showcnfpassword)}></AiOutlineEyeInvisible>
                   }
                   </div>
                 </div>
           </div>
           <button  className=" p-2 bg-yellow-100 text-black rounded-lg font-semibold">Create Account</button>
        </form>
        </div>
        <div className=" relative">
           <div className="  absolute  top-10 lg:right-0 left-0 z-40">
           <img className=" lg:h-[450px] h-[350px] w-[95%] lg:w-fit" src={signupimage} alt="signupimage"></img>
           </div>
           <div className="  lg:translate-y-[55px] translate-y-[38px] translate-x-[20px]">
           <img className=" lg:h-[450px] h-[380px]" src={frame} alt="frame"></img>
           </div>
        </div>
       </div>):<Otp data={{...data,role:role}} sendotp={sendotp} setshowotppage={setshowotppage}></Otp>
      }
      </>
  )
}

export default Signup