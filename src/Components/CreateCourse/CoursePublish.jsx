import { useDispatch, useSelector } from "react-redux"
import { set_step } from "../../redux/slices/course";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/api";
import { course } from "../../services/url";
import { useNavigate } from "react-router";
function CoursePublish() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {coursedata,editmode}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const [checked,setchecked]=useState(false);
  function changehandler(e){
    setchecked(e.target.checked)
  }
  async function updatecourse(){
    const loadingtoast=toast.loading("Please wait......")
     try{
      let status;
      if(checked){
        status="Published"
      }else{
        status="Draft"
      }
      const result=await apiConnector("PUT",course.updatecoursestatusurl,{_id:coursedata._id,status:status},{
        Authorization:`Bearer ${token}`
      });
      if(result.status===200){
        toast.success("Course updated successfully")
        navigate("/dashboard/teacher/mycourses")
      }
     }catch(err){
      console.log(err);
      toast.error(err.response.data.Message)
   } 
   toast.dismiss(loadingtoast);
  }
   function savehandler(){
     if(checked===(coursedata.status==="Published")){
      toast.error("Status is not changed")
     }else{
      updatecourse();
     }
  }
  useEffect(()=>{
    if(editmode){
      setchecked(coursedata.status==="Published")
    }
  },[])
  return (
    <div className=" flex flex-col gap-7 p-10 bg-richblack-800 rounded-lg border-[1px] border-richblack-600">
      <h1 className="text-2xl font-semibold">Publish Settings</h1>
      <li className=" flex gap-3 text-pure-greys-200 items-center">
      <input checked={checked} onChange={changehandler} type="checkbox" className=" h-[20px] w-[20px]" ></input>
      <p className=" text-lg">Make this course as public</p>
      </li>
      <div className=" flex gap-3 justify-end">
          <button onClick={()=>dispatch(set_step(2))} className=" p-3 px-5 rounded-lg bg-richblack-500">Back</button>
          <button onClick={savehandler}  className=" p-3 px-5 rounded-lg bg-yellow-100 text-black">Save Changes</button>
          <button onClick={()=>navigate("/dashboard/teacher/mycourses")}  className=" p-3 px-5 rounded-lg bg-yellow-100 text-black">Go Next</button>
         </div>
    </div>
  )
}

export default CoursePublish