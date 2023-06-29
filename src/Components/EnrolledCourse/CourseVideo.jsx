import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { apiConnector } from "../../services/api";
import { section } from "../../services/url";
import { set_completedvideos } from "../../redux/slices/enrolledcourse";
function CourseVideo() {
const {courseid,sectionid,subsectionid}=useParams();
const {currentcouredata,completedvideos}=useSelector((state)=>state.enrolledcourse);
const location=useLocation();
const [videourl,setvideourl]=useState();
const [ended,setended]=useState(false);
const [islast,setislast]=useState(false);
const [isfirst,setisfirst]=useState(false);
const navigate=useNavigate();
const reference=useRef();
const {token}=useSelector((state)=>state.auth);
const dispatch=useDispatch();
function getvideourl(){
     const sectionindex=currentcouredata?.sections.findIndex((e)=>e._id===sectionid);
     const subsectionindex=currentcouredata?.sections[sectionindex]?.subsections.findIndex((e)=>e._id===subsectionid);
    if(sectionindex===0 && subsectionindex===0){
        setisfirst(true);
    }else{
        setisfirst(false);
    }
    const videourl=currentcouredata?.sections[sectionindex]?.subsections[subsectionindex]?.videourl;
    setvideourl(videourl);
}
function endhandler(){
    setended(true);
}

function lastcheck(){
     const sectionindex=currentcouredata?.sections.findIndex((e)=>e._id===sectionid);
     const subsectionindex=currentcouredata?.sections[sectionindex]?.subsections.findIndex((e)=>e._id===subsectionid);
    if(sectionindex===currentcouredata?.sections.length-1 && subsectionindex===currentcouredata?.sections[sectionindex]?.subsections.length-1){
        setislast(true);
    }else{
        setislast(false);
    }
}

function previoushandler(){
    const sectionindex=currentcouredata?.sections.findIndex((e)=>e._id===sectionid);
    const subsectionindex=currentcouredata?.sections[sectionindex]?.subsections.findIndex((e)=>e._id===subsectionid);
  if(subsectionindex===0){
   navigate(`/course/${courseid}/section/${currentcouredata?.sections[sectionindex-1]._id}/subsection/${currentcouredata?.sections[sectionindex-1].subsections[0]._id}`);
  }else{
    navigate(`/course/${courseid}/section/${sectionid}/subsection/${currentcouredata?.sections[sectionindex].subsections[subsectionindex-1]._id}`);
  }
  setended(false);
}
function nexthandler(){
    const sectionindex=currentcouredata?.sections.findIndex((e)=>e._id===sectionid);
    const subsectionindex=currentcouredata?.sections[sectionindex]?.subsections.findIndex((e)=>e._id===subsectionid);
  if(subsectionindex===currentcouredata?.sections[sectionindex]?.subsections.length-1){
   navigate(`/course/${courseid}/section/${currentcouredata?.sections[sectionindex+1]._id}/subsection/${currentcouredata?.sections[sectionindex+1].subsections[0]._id}`);
  }else{
 
    navigate(`/course/${courseid}/section/${sectionid}/subsection/${currentcouredata?.sections[sectionindex].subsections[subsectionindex+1]._id}`);
  }
  setended(false);
}

function rewatchhandler(){
    if(reference.current){
        reference.current.seekTo(0);
    }
    setended(false);
}
async function completemarkhandler(){
    if(completedvideos.indexOf(subsectionid)>=0){
        toast.error("Already marked as completed");
        return;
    }
    const loadingtoast=toast.loading("Marking as completed.......")
    try{
      const result=await apiConnector("POST",section.markascompleteurl,{courseid:courseid,videoid:subsectionid},{
        Authorization:`Bearer ${token}`
      })
     
      if(result.status===200){
        dispatch(set_completedvideos(result.data.courseprogress.completedvideos));
        toast.success("Marked as completed")
      }
    }catch(err){
        console.log("Error while marking video completed","=>",err);
        toast.error(err.response.data.Message)
    }
    toast.dismiss(loadingtoast);
}
function starthandler(){
  const lastwatcharray=localStorage.getItem("studynotoinvideoprogress")?JSON.parse(localStorage.getItem("studynotoinvideoprogress")):[];
  if(lastwatcharray.length>=0){
    const index=lastwatcharray.findIndex((e)=>e.course===courseid);
    if(index>=0){
      const updatedlastwatcharray=[...lastwatcharray];
      updatedlastwatcharray[index]={course:courseid,video:location.pathname};
      localStorage.setItem("studynotoinvideoprogress",JSON.stringify(updatedlastwatcharray));
    }else{
      const updatedlastwatcharray=[...lastwatcharray,{course:courseid,video:location.pathname}];
      localStorage.setItem("studynotoinvideoprogress",JSON.stringify(updatedlastwatcharray));
    }
  }else{
    localStorage.setItem("studynotoinvideoprogress",JSON.stringify([{course:courseid,video:location.pathname}]));
  }

}
useEffect(()=>{
    if(currentcouredata){
        getvideourl();
        setended(false);
        lastcheck();
    }
},[currentcouredata,courseid,sectionid,subsectionid,location.pathname])
  return (
    <div className=" relative w-full h-full">
       {
        videourl?<ReactPlayer onStart={starthandler}  ref={reference} onEnded={endhandler}  width={"100%"} height={"100%"} controls  url={videourl}/>:<p className=" text-3xl font-bold text-center relative top-[40vh]">No Video Uploaded By Instructor</p>
       }
       
        {
         ended?(<div className=" absolute bg-opacity-70  bg-richblack-900 flex flex-col gap-3 items-center  justify-center top-0  bottom-0 right-0 left-0">
         <div className=" flex  gap-4">
           <button onClick={completemarkhandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Mark As Complete</button>
            <button onClick={rewatchhandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Re Watch</button>
            </div>
               {
                (isfirst && islast)?(<></>):(<>
                 {
                  isfirst && (
                      <button onClick={nexthandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Next</button>
                  )
               }
               {
                  !isfirst && !islast && (
                     <div className=" flex gap-4 ">
                      <button onClick={previoushandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Previous</button>
                      <button onClick={nexthandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Next</button>
                     </div>
                  )
               }
               {
                  islast && (
                 <button onClick={previoushandler} className=" w-[170px] bg-yellow-200 p-3 rounded-md text-black font-semibold">Previous</button>
                  )
               }
                </>)
               }
         </div>):(<></>)
        }

    </div>
  )
}

export default CourseVideo;