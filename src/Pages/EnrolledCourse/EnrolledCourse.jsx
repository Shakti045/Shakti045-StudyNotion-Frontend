import { useState } from "react"
import CourseBar from "../../Components/EnrolledCourse/CourseBar"
import CourseVideo from "../../Components/EnrolledCourse/CourseVideo"
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../../services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { section } from "../../services/url";
import { toast } from "react-toastify";
function EnrolledCourse() {
  const {user}=useSelector((state)=>state.user);
  const {token}=useSelector((state)=>state.auth);
  const [showotpions,setshowoptions]=useState(true);
  const {courseid}=useParams();
  const navigate=useNavigate();
  const [sectiondata,setsectiondata]=useState([]);
  const [coursetitle,setcoursetitle]=useState();
  async function checkenrollment(){
    const loadingtoast=toast.loading("Please wait.....")
    try{
     const {data}=await apiConnector("POST",section.getsectionsofacourseurl,{courseid:courseid},{
        Authorization:`Bearer ${token}`
    });
      if(data.data.studentsenrolled.indexOf(user._id)===-1){
        navigate("/error");
        toast.dismiss(loadingtoast);
        return;
      }
      setcoursetitle(data?.data?.title);
      setsectiondata(data?.data?.sections);
    }catch(err){
      console.log("Error while checking enrollment","=>",err);
      navigate("/error");
    }
    toast.dismiss(loadingtoast);
  } 
  useEffect(()=>{
    checkenrollment();
  },[courseid]);
  return (
      <div className="font-inter h-[calc(100vh-3.5rem)] overflow-hidden  flex   w-full  text-white">
           <div className="w-[25%] hidden lg:flex">
              <CourseBar sectiondata={sectiondata} coursetitle={coursetitle} courseid={courseid} setshowoptions={setshowoptions}/>
            </div>  
            {/* <div className={` ${showotpions?"visible":"hidden"} lg:hidden absolute right-10 z-30 bottom-0 top-[3.8rem] left-0 lg:w-[25%]`}>
              <CourseBar setshowoptions={setshowoptions}/>
            </div>  */}
           <div className="  lg:w-[75%] ">
              <CourseVideo setshowoptions={setshowoptions}/>
            </div>  
      </div>
  )
}

export default EnrolledCourse