import { Outlet, useNavigate, useParams } from "react-router";
import { apiConnector } from "../../services/api";
import { course } from "../../services/url";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { set_completedvideos, set_currentcoursedata, set_totalvideos } from "../../redux/slices/enrolledcourse";
import Loader from "../../Components/common/Loader";
import CourseBar from "../../Components/EnrolledCourse/CourseBar";
import { toast } from "react-toastify";
import {FiMenu} from "react-icons/fi";
function EnrolledCourse() {
  const [loading,setloading]=useState(false);
  const {courseid}=useParams();
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  async function getfullcoursedata(){
    setloading(true);
    const loadingtoast=toast.loading("Please wait.....")
    try{
      const {data}=await apiConnector("POST",course.getfulldetailsofcourseurl,{courseid:courseid},{
        Authorization:`Bearer ${token}`
      })
      // console.log(data);
      if(data.coursedetails.studentsenrolled.indexOf(user._id)===-1){
        navigate("/error");
        toast.warn("You arenot enrolled to this course")
        toast.dismiss(loadingtoast)
        return;
      }
      dispatch(set_completedvideos(data.completedvideos));
      dispatch(set_currentcoursedata(data.coursedetails));
      dispatch(set_totalvideos(data.totalvideo));
    }catch(err){
      navigate("/error");
      console.log("Error while getting enrolled course data","=>",err);
    }
    setloading(false);
    toast.dismiss(loadingtoast)
  }
  useEffect(()=>{
     getfullcoursedata();
  },[])
  return (
      <div className=" font-inter h-[calc(100vh-3.5rem)] overflow-hidden  flex lg:flex-row flex-col-reverse   w-full  text-white">
          {
            loading?(<Loader/>):(<>
            <div className=" h-[70%] lg:h-[100%] overflow-hidden lg:w-[25%]">
            <CourseBar/>
         </div>
         <div className=" h-[30%] lg:h-[100%] w-[100%] lg:w-[75%]">
           <Outlet/>
         </div></>)
          }
      </div>
  )
}

export default EnrolledCourse;