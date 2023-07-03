import { useDispatch, useSelector } from "react-redux"
import { apiConnector } from "../../services/api"
import { course } from "../../services/url"
import { useEffect, useState } from "react";
import TeacherCourses from "../../Components/Dashboard/TeacherCourses";
import Loader from "../../Components/common/Loader";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { set_editmode } from "../../redux/slices/course";
function Teachercourses() {
    const {token}=useSelector((state)=>state.auth);
    const [courses,setcourses]=useState([]);
    const [loading,setloading]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    async function getcourses(){
         const loadingtoast=toast.loading("Please wait.....");
         setloading(true);
        try{
            const result=await apiConnector("GET",course.getcoursesofuserurl,null,{
                Authorization:`Bearer ${token}`
            })
            if(result.status===200){
                setcourses(result.data.courses);
                // toast.success("Data Fetched Successfully");
            }
            
        }catch(err){
        toast.error(err.response.data.Message);
        }
        setloading(false);
        toast.dismiss(loadingtoast);
    }
    useEffect(()=>{
        getcourses();
    },[])

    function addhandler(){
        dispatch(set_editmode(false));
        navigate("/dashboard/createcourse")
    }
    async function deletehandler(id,index){
        const loadingtoast=toast.loading("Please wait.....");
       try{
           const result=await apiConnector("DELETE",course.deletecourseurl,{courseid:id},{
               Authorization:`Bearer ${token}`
           })
           if(result.status===200){
               const updatedcourse=[...courses];
               updatedcourse.splice(index,1);
               setcourses(updatedcourse);
               toast.success("Course Deleted Successfully");
           } 
       }catch(err){
        console.log(err);
       toast.error(err.response.data.Message);
       }
       toast.dismiss(loadingtoast);
    }
  return (
    <div className="font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10 lg:p-10 p-4 w-full text-white">
    <div className=" flex justify-between items-center">
    <h1 className=" text-3xl font-semibold">My Courses</h1>
    <button onClick={addhandler} className=" p-3 rounded-md bg-yellow-50 text-richblack-900 font-bold">Add Course +</button>
    </div>
    {
        loading?(<Loader/>):(<div className=" flex flex-col border-[1px] w-full border-richblack-700">
       <div className="  border-b-2 lg:flex hidden justify-between p-3 ">
          <p className=" w-[60%]">COURSES</p>
          <div className=" w-[30%] flex justify-between items-center">
          <p>DURATION</p>
          <p>PRICE</p>
          <p>ACTIONS</p>
          </div>
        </div>
            <>
              {
                courses.length===0?(<div className=" p-4 text-center text-white">
                    <h1 className=" font-semibold text-3xl">No courses found</h1>
                    <p className=" font-semibold text-3xl">It Seems that no courses created by you yet!</p>
                </div>):(<>{
                courses.map((data,index)=>(
                    <TeacherCourses key={index} index={index} deletehandler={deletehandler} data={data}/>
                ))
            }</>)
              }
            </>
        </div>)
    }
    </div>
  )
}

export default Teachercourses