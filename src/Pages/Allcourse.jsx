import { useState } from "react";
import { apiConnector } from "../services/api";
import { course } from "../services/url";
// import { toast as toast } from "react-toastify";
import { toast as toast2 } from "react-hot-toast";
import { useEffect } from "react";
import DashboardCoursecard from "../Components/Dashboard/DashboardCoursecard";
function Allcourse() {
  const [courses,setcourses]=useState([]);
  async function getallcourses(){
    const loadingtoast=toast2.loading("Please wait.....");
    try{
     const result=await apiConnector("GET",course.getallcoursesurl);
     setcourses(result.data.Courses);
    }catch(err){
      console.log("Error while fetcging all course","=>",err);

    }
    toast2.dismiss(loadingtoast);
  }
  useEffect(()=>{
    getallcourses();
  },[]);
  return (
    <div className=' max-h-[calc(100vh-3.5rem)] overflow-y-scroll profilesection  w-full flex flex-col mx-auto    lg:p-10 p-2 text-white'>
       <h1 className=" lg:text-3xl font-bold">All Courses Of StudyNotion</h1>
      <div className="  mt-3 w-full flex flex-col gap-2">
      {
        courses.map((data,index)=>{
          return <DashboardCoursecard key={index} {...data}/>
        })
       }
      </div>
    </div>
  )
}

export default Allcourse