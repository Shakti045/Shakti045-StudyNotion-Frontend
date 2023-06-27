import { Outlet, useLocation } from "react-router";
import Dashboardmenu from "../Components/Dashboard/Dashboardmenu";
import {RiMenu2Fill} from "react-icons/ri"
import { useState } from "react";
import { useEffect } from "react";
function Dashboard() {
  const [showmenu,setshowmenu]=useState(false);
  const location=useLocation();
  useEffect(()=>{
    if(showmenu){
      setshowmenu(false);
    }
  },[location.pathname]);
  return (
    <div className=" flex lg:flex-row flex-col gap-2 lg:gap-0 w-screen  ">
         <div className=" hidden lg:block w-[17%]">
         <Dashboardmenu/>  
         </div>
         <div onClick={()=>setshowmenu(!showmenu)} className=" mt-3 ml-3 text-white lg:hidden block">
            <RiMenu2Fill size={25} />
         </div>
         <div className={` transition-all duration-500 lg:hidden ${showmenu?"w-[100vw]":"w-0"}   overflow-hidden absolute top-[6rem] z-40 left-0 bg-richblack-900 bottom-0`}>
         <Dashboardmenu/>  
         </div>
        <div className=" w-[100%]  lg:w-[83%] ">
        <Outlet/>   
        </div>
    </div>
  )
}

export default Dashboard;