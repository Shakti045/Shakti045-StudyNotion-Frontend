import {CgProfile} from "react-icons/cg"
import {BsFillPenFill} from "react-icons/bs"
import {BsCart2} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {MdWorkHistory} from "react-icons/md"
import {BsBook} from "react-icons/bs"
import {TbJewishStarFilled} from "react-icons/tb"
import CommonMenu from "./CommonMenu";
import { useDispatch } from "react-redux";
import { set_video } from "../../redux/slices/video";
function Studentmenu() {
    const location=useLocation();
    const [path,setpath]=useState("dashboarrd");
    const dispatch=useDispatch();
    useEffect(()=>{
       setpath(location.pathname.split("/").at(-1));
       dispatch(set_video(null));
    },[location.pathname])

  return (
    <div className='  pt-10  flelx flex-col h-[calc(100vh-3.5rem)] text-pure-greys-100  bg-richblack-800'>
    <div className='flex flex-col gap-2 border-b-[1px] pb-10 '>
    <Link to="/dashboard/profile">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="profile" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <CgProfile size={20} />
       <p>My Profile</p>
      </div>
    </Link>

    <Link to="/dashboard/enrolled-courses">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="enrolled-courses" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
        <BsFillPenFill size={20} /> 
       <p>My Courses</p>
      </div>
    </Link>

    <Link to="/dashboard/cart">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="cart" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <BsCart2 size={20} />
       <p>Cart</p>
      </div>
    </Link>

    <Link to="/dashboard/purchase-history">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="purchase-history" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <MdWorkHistory size={20} />
       <p>Purchase History</p>
      </div>
    </Link>

    <Link to="/dashboard/wishlist">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="wishlist" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <TbJewishStarFilled size={20} />
       <p>Wishlist</p>
      </div>
    </Link>

    <Link to="/dashboard/allcourses">
      <div className={`py-1 px-7 border-l-4 border-richblack-800  w-full flex items-center gap-2 ${path==="allcourses" && ("bg-yellow-700 text-yellow-25 border-yellow-25")}`}>
       <BsBook size={20} />
       <p>Courses</p>
      </div>
    </Link>


    </div>
      <CommonMenu/>
  </div>
  )
}

export default Studentmenu;



