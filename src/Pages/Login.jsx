import { Link } from "react-router-dom"
import loginimage from "../assets/Images/aboutus2.webp"
import frame from "../assets/Images/frame.png"
import { useState } from "react"
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import axios from "axios"
import { auth } from "../services/url"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { set_token } from "../redux/slices/auth"
import { set_user } from "../redux/slices/user"
import SocialLogin from "../Components/SocialLogin/SocialLogin"
function Login() {
    const dispatch=useDispatch();
    const [data,setdata]=useState({email:"",password:""})
    const [showpassword,setshowpassword]=useState(false);
    const navigate=useNavigate();
    function changehandler(event){
        setdata(()=>{
            return {...data,[event.target.name]:event.target.value}
        })
    }
    async function userlogin(){
      const loadingtoast=toast.loading("Please wait....")
      try{
         const result=await axios.post(auth.loginurl,data);
         if(result.status===200){
          toast.dismiss(loadingtoast);
          toast.success("Login successfull")
          // console.log(result.data.token);
          // console.log(result.data.User);
          dispatch(set_token(result.data.token));
          dispatch(set_user(result.data.User));
          localStorage.setItem("studynotiontoken",JSON.stringify(result.data.token));
          // localStorage.setItem("studynotionuser",JSON.stringify(result.data.User));
          // navigate(`/${result.data.User.role}/dashboard`)
          navigate("/dashboard/profile");
         }
          
      }catch(err){
        
        toast.dismiss(loadingtoast);
        toast.error(err.response.data.Message)
      }
    }
    function submithandler(event){
        event.preventDefault();
        if(!data.email || !data.password){
          toast.error("Both fields required");
          return;
        }
        userlogin();
    }
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 text-white text-lg font-mono flex lg:flex-row flex-col gap-5 lg:gap-0 lg:justify-around">
     <div className="  lg:w-[40%]  p-4 lg:p-0 pr-3 mt-10">
     <div className=" flex flex-col gap-10">
        <p className=" text-3xl font-semibold">Welcome Back</p>
        <p>Build skills for today, tomorrow, and beyond.</p>
        <p className=" text-blue-400 text-lg font-edu-sa">Education to future-proof your career.</p>
     </div>
     <form onSubmit={submithandler} className=" flex flex-col gap-5 mt-6">
           <div className=" flex flex-col">
            <label htmlFor="Email">Email<sup className="text-pink-200">*</sup></label>
            <input  placeholder="Enter your Mail" className=" w-full p-2 bg-richblack-800 text-white rounded-lg border-b-[0.5px] outline-none" type="email" required onChange={changehandler} name="email" value={data.email} id="Email"></input>
           </div>
             <div className=" flex lg:flex-row flex-col gap-4 lg:gap-2">
               <div className=" flex  w-full flex-col">
                <label htmlFor="Password">Password<sup className="text-pink-200">*</sup></label>
                <div className=" flex items-center pr-3   bg-richblack-800 rounded-lg border-b-[0.5px]">
                <input required onChange={changehandler}  type={`${showpassword===true?"text":"password"}`}placeholder="Password" className=" p-2    text-white rounded-lg bg-transparent w-full  outline-none" value={data.password} name="password"></input>
                {
                     showpassword===true?<AiOutlineEye onClick={()=>setshowpassword(!showpassword)}></AiOutlineEye>:<AiOutlineEyeInvisible onClick={()=>setshowpassword(!showpassword)}></AiOutlineEyeInvisible>
                }
                </div>
                <Link className=" text-end" to="/resetpassword"><p className=" text-lg text-blue-500">Forgot Password</p></Link>
              </div>
        
        </div>
       
        <button  className=" p-2 bg-yellow-100 text-black rounded-lg font-semibold">Sign In</button> 
     </form>
    <SocialLogin/>
     </div>
     <div className=" relative">
        <div className="  absolute  top-10 lg:right-0 left-0 z-40">
        <img className=" lg:h-[450px] h-[350px] w-[95%] lg:w-fit" src={loginimage} alt="signupimage"></img>
        </div>
        <div className="  lg:translate-y-[55px] translate-y-[38px] translate-x-[20px]">
        <img className=" lg:h-[450px] h-[380px]" src={frame} alt="frame"></img>
        </div>
     </div>
    </div>
  )
}

export default Login;