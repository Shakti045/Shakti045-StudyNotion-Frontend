import { useSelector } from "react-redux"
import ReactPlayer from "react-player";
import hii from "../../assets/Images/robot.gif"
import Loader from "../common/Loader";
import { useState } from "react";
import {AiOutlineRight} from "react-icons/ai"
import { useEffect } from "react";
function CourseVideo({setshowoptions}) {
  const {videourl}=useSelector((state)=>state.video);
  const {user}=useSelector((state)=>state.user);
  const [loading,setloading]=useState(true);
  useEffect(()=>{
    if(videourl!==null){
      setshowoptions(false);
    }
  },[videourl])
  function showvideo(){
    setloading(false);
  }
  return (
    <div className=" relative  w-full  h-full  text-white flex flex-col justify-center items-center">
      {
        videourl===null?<div className=" flex flex-col items-center gap-2">
           <img src={hii} className=" h-[60%]" alt="Welcome"></img>
         <h1 className=" text-3xl text-blue-400">Welcome {user.firstname}</h1>
          <p className=" text-blue-400">Chhose From The Sections To Start Watching Video</p>
        </div>:<>
           {
            loading && (<div className=" w-full lg:h-full flex flex-col justify-center items-center">
              <Loader/>
            </div>)
           }
           <div className=" lg:hidden flex w-full justify-start">
            <button onClick={()=>setshowoptions(true)} className=" p-2"><AiOutlineRight size={25}/></button>
           </div>
           <div className={`${loading===true?" hidden":"visible"} w-full h-full lg:border-2 border-richblack-500`}>
           <ReactPlayer   controls={true}   onReady={showvideo} height={"100%"} width={"100%"} url={videourl}></ReactPlayer>
           </div>
        </>
      }
    </div>
  )
}

export default CourseVideo;