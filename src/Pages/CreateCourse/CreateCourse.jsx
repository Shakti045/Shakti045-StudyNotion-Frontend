import { useDispatch, useSelector } from "react-redux";
import Rendersteps from "../../Components/CreateCourse/Rendersteps";
import CourseBuilder from "../../Components/CreateCourse/CourseBuilder";
import CourseInformation from "../../Components/CreateCourse/CourseInformation";
import CoursePublish from "../../Components/CreateCourse/CoursePublish";
import Loader from "../../Components/common/Loader"
import { useEffect } from "react";
import { set_coursedata, set_step } from "../../redux/slices/course";
function CreateCourse() {
  const {step}=useSelector((state)=>state.course);
  const {editmode}=useSelector((state)=>state.course);
  const {loading}=useSelector((state)=>state.course)
  const dispatch =useDispatch();
  useEffect(()=>{
    if(!editmode){
      dispatch(set_step(1));
      dispatch(set_coursedata(null));
    }
  },[])
  return (
    <div className="font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10 lg:p-10 p-2 w-full text-white">
          <h1 className=" text-3xl font-semibold">{editmode===false?"Add A New Course":"Make Changes To Your Course"}</h1>
           {
            loading===true?(<div className=" w-full flex flex-col items-center justify-center">
              <Loader/>
            </div>):(<><Rendersteps/>
            {step===1 && (<CourseInformation/>)}
            {step===2 && (<CourseBuilder/>)}
            {step===3 && (<CoursePublish/>)}</>)
           }
    </div>
  )
}

export default CreateCourse;