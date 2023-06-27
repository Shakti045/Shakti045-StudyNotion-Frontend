import { useState } from "react"
import {BsFillInfoCircleFill} from "react-icons/bs"
import { useDispatch } from "react-redux";
import { set_video } from "../../redux/slices/video";
function Subsections({subsectionname,description,videourl,duration}) {
  const [showdesc,setshowdesc]=useState(false);
  const dispatch=useDispatch();
  return (
    <div className="  p-2 bg-yellow-300 text-richblack-900 border-b-[1px]">
       <li  className=" flex justify-between  items-center  list-none">
          <div className=" items-center flex gap-1">
          <input type="checkbox" className=" cursor-pointer"  ></input>
          <div className=" cursor-pointer" onClick={()=>dispatch(set_video(videourl))}>
          <p >{subsectionname}</p>
          </div>
          </div>
  
         <BsFillInfoCircleFill className=" cursor-pointer" onClick={()=>setshowdesc(!showdesc)}/>
     
       </li>
       {
        showdesc && (<div className=" text-white flex justify-between">
        <p >{description}</p>
        <p>{duration} hour.00s</p>
     </div>)
       }
    </div>
  )
}

export default Subsections