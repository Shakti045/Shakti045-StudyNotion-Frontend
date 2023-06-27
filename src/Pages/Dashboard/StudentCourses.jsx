import { apiConnector } from "../../services/api"
import { profile } from "../../services/url";
import {toast} from "react-hot-toast"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Components/common/Loader";
import StudentEnrolledCourseCard from "../../Components/Dashboard/StudentEnrolledCourseCard";
function StudentCourses() {
    const {token}=useSelector((state)=>state.auth);
    const [loading,setloading]=useState(false);
    const headers={
        Authorization:`Bearer ${token}`
    }
    const [courses,setcourses]=useState([]);
    async function getenrolledcourses(){
       setloading(true);
        const loadingtoast=toast.loading("Fetching enrolledcourses......")
       try{
          const result=await apiConnector("GET",profile.getenrolledcourseurl,null,headers);
        setcourses(result.data.courses);
        // console.log(result.data.courses);
          if(result.status===200){
            toast.success("Details Fetched Successfully")
          }
       }catch(err){
        console.log("Erroe while getting enrolled courses","=>",err);
        toast.error(err.response.data.Message);
       }
       setloading(false);
       toast.dismiss(loadingtoast)
    }

    useEffect(()=>{
        getenrolledcourses();
        // eslint-disable-next-line
    },[]);
  return (
    <div className=" font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col  gap-10 lg:p-10 p-2 w-full    text-white">
      {
        loading===true?(<Loader/>):(<>
           <h1 className=" text-3xl font-bold">Enrolled Courses</h1>
      {
        courses.length===0?(<div className=" h-full flex flex-col gap-4 items-center justify-center">
       <h1 className=" text-3xl font-bold">You Have Not Enrolled To Any Course Yet</h1>
       <p>Kindly Go To Course Page And Choose A Course To GeT Started</p>
        <Link to="/dashboard/allcourses"><button className=" bg-yellow-100 text-richblack-900 p-3 rounded-md">Click Here To Visit Course Page</button></Link>
        </div>):(<div className=" grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-auto gap-10">
             {
                courses.map((data)=>{
                    return <StudentEnrolledCourseCard key={data?._id} {...data}></StudentEnrolledCourseCard>
                })
             }
        </div>)
      }
        </>)
      }
  </div>
  )
}

export default StudentCourses