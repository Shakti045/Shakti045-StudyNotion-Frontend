import { useLocation } from "react-router"
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { useState } from "react";
import axios from "axios";
import { auth } from "../services/url";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../Components/common/Loader"
import { toast } from "react-hot-toast";
import { setloading } from "../redux/slices/loadig";
import { useNavigate } from "react-router";
function Newpassword() {
  const location=useLocation();
  const token=location.pathname.split("/").at(-1);
  const [data,setdata]=useState({password:"",confirmpassword:""})
  const [showpassword,setshowpassword]=useState(false);
  const [showcnfpassword,setshowcnfpassword]=useState(false);
  const {loading}=useSelector((state)=>state.loading);
  const dispatch=useDispatch(); 
  const navigate=useNavigate();
  function changehandler(e){
      setdata(()=>{
        return {...data,[e.target.name]:e.target.value}
      })
  }
  async function changepassworrd(){
    const loadingtoast=toast.loading("Please wait....")
    dispatch(setloading(true))
    try{
      const result=await axios.post(auth.resetpasswordurl,{token:token,newassword:data.password});
      if(result.status===200){
        toast.success("Password updated successfully")
        navigate("/login");
      }else{
        toast.error("Please try again")
      }
    }catch(err){
      console.log(err);
      toast.error(err.response.data.Message);
    }
    dispatch(setloading(false));
    toast.dismiss(loadingtoast);
  }
  function submithandler(e){
   e.preventDefault();
   if(data.password===data.confirmpassword){
    changepassworrd();
   }else{
    toast.error("Both passwords should be same")
   }
  }
  return (
     <>
      {
        loading===true?<Loader></Loader>: <div className=" text-white flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] text-lg font-inter  ">

        <div className=" lg:w-[33vw] flex flex-col gap-3 w-[95vw]">
          <h1 className="  text-3xl font-bold">Choose new password</h1>
          <p className=" opacity-70">Almost done. Enter your new password and youre all set.</p>
          <form onSubmit={submithandler}>
          <div className=" flex  flex-col gap-4 ">
                    <div className=" flex flex-col">
                     <label className=" opacity-70" htmlFor="Password">Password</label>
                     <div className=" flex items-center p-3 text-lg bg-richblack-800 rounded-lg border-b-[0.5px]">
                     <input required onChange={changehandler}  type={`${showpassword===true?"text":"password"}`}placeholder="Password" className="  text-white rounded-lg bg-transparent w-full  outline-none" value={data.password} name="password"></input>
                     {
                          showpassword===true?<AiOutlineEye onClick={()=>setshowpassword(!showpassword)}></AiOutlineEye>:<AiOutlineEyeInvisible onClick={()=>setshowpassword(!showpassword)}></AiOutlineEyeInvisible>
                     }
                     </div>
                   </div>
     
                   <div className=" flex flex-col">
                     <label className=" opacity-70" htmlFor="Password">Confirm Password</label>
                     <div className=" flex items-center p-3 text-lg bg-richblack-800 rounded-lg border-b-[0.5px]">
                     <input required type={`${showcnfpassword===true?"text":"password"}`} placeholder="Confirm Password" className=" w-full text-white rounded-lg bg-transparent  outline-none" value={data.confirmpassword} name="confirmpassword" onChange={changehandler}></input>
                     {
                         showcnfpassword===true?<AiOutlineEye onClick={()=>setshowcnfpassword(!showcnfpassword)}></AiOutlineEye>:<AiOutlineEyeInvisible onClick={()=>setshowcnfpassword(!showcnfpassword)}></AiOutlineEyeInvisible>
                     }
                     </div>
                   </div>
                   <button className=" bg-yellow-100 text-richblack-900 p-2 rounded-lg border-b-4 border-b-white">Reset Password</button>
                   </div>

                
          </form>
        </div>
  
      </div>
      }
     </>
  )
}

export default Newpassword