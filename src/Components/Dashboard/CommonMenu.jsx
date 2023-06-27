import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_token } from "../../redux/slices/auth";
import { set_user } from "../../redux/slices/user";
import { toast } from "react-hot-toast";
import {CiSettings} from "react-icons/ci";
import {BiLogOut} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
function CommonMenu() {
    const location=useLocation();
    const [path,setpath]=useState("dashboarrd");
    const [alert,setalert]=useState(false);
    useEffect(()=>{
       setpath(location.pathname.split("/").at(-1));
    },[location.pathname])
    const navigate=useNavigate();
    const dispatch=useDispatch();
    function logouthandler(){
        dispatch(set_token(null));
        dispatch(set_user(null));
        localStorage.clear();
        toast.success("Logged Out")
        navigate("/");
       }
  return (
    <div className='flex flex-col gap-2 mt-10 '>
         
    <Link to="/dashboard/settings">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="settings" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
      <CiSettings size={20}/>
       <p>Settings</p>
      </div>
    </Link>
    <div onClick={()=>setalert(true)} className=' cursor-pointer  py-1 px-7 border-l-4 border-richblack-800  flex items-center gap-2 '>
       <BiLogOut size={20} />
       <p>Logout</p>
      </div>
          {
            alert && ( <div className=" z-50 flex flex-col justify-center items-center bg-richblack-600 bg-opacity-80 w-screen h-screen absolute top-0 right-0 left-0 bottom-0">
            <div className=" flex flex-col gap-4 text-white bg-richblack-900  p-8 rounded-lg">
                <p className=" text-2xl font-inter">Are you sure?</p>
                <p>You will be logged out of your account.</p>
                <div className=" flex gap-4">
                    <button onClick={logouthandler} className=" p-2 rounded-lg bg-yellow-200 text-black font-bold">Log Out</button>
                    <button onClick={()=>setalert(false)} className=" p-2 rounded-lg bg-pure-greys-200">Cancale</button>
                </div>
            </div>
         </div>)
          }
     </div>
  )
}

export default CommonMenu