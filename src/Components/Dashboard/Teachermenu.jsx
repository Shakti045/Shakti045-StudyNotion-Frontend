import {CgProfile} from "react-icons/cg"
import {AiOutlinePlus} from "react-icons/ai"
import {VscDashboard} from "react-icons/vsc"
import {RiComputerLine} from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CommonMenu from "./CommonMenu";
import { useDispatch } from "react-redux";
import { set_editmode } from "../../redux/slices/course";
function Teachermenu() {
    const location=useLocation();
    const [path,setpath]=useState("dashboarrd");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
       setpath(location.pathname.split("/").at(-1));
    },[location.pathname])
 function addcoursehandler(){
     if(location.pathname.split("/").at(-1)!=="createcourse"){
      dispatch(set_editmode(false));
      navigate("/dashboard/createcourse")
     }
 }
  return (
    <div className='  pt-10  flelx flex-col h-[calc(100vh-3.5rem)] text-pure-greys-100  bg-richblack-800'>
    <div className='flex flex-col gap-2 border-b-[1px] pb-10 '>
    <Link to="/dashboard/profile">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="profile" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <CgProfile size={20} />
       <p>My Profile</p>
      </div>
    </Link>

    <Link to="/dashboard/teacher-dashboard">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="teacher-dashboard" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
      <VscDashboard size={20} />
       <p>Dashboard</p>
      </div>
    </Link>

    <Link to="/dashboard/teacher/mycourses">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="mycourses" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <RiComputerLine size={20} />
       <p>My Courses</p>
      </div>
    </Link>

    <button onClick={addcoursehandler}>
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="createcourse" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
        <AiOutlinePlus size={20}/>
       <p>Add Course</p>
      </div>
    </button>
     
    </div>
      <CommonMenu/>
  </div>
  )
}

export default Teachermenu;



