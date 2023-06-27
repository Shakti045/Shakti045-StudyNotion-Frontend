import date from "date-and-time";
import Img from "../common/LazyLoadImage";
import {BiTime} from "react-icons/bi"
import {MdPublishedWithChanges} from "react-icons/md"
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {BsCurrencyRupee} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { set_coursedata, set_editmode, set_step } from "../../redux/slices/course";
import { toast } from "react-hot-toast";
import Deletecoursemodal from "../modals/Deletecoursemodal";
import { useState } from "react";
function TeacherCourses({data,deletehandler,index}) {
    const {_id,createdat,description,title,thumbnail,price,status,duration="2hr 30min"}=data;
    const pattern=date.compile('hh:mm A | MMM DD YYYY');
    const newdate=date.format(new Date(createdat),pattern);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [showmodal,setshowmodal]=useState(false);
    function edithandler(){
     const loadingtoast=toast.loading("Please wait.....")
     dispatch(set_coursedata(data));
     dispatch(set_editmode(true));
     dispatch(set_step(1));
     navigate("/dashboard/createcourse")
     toast.dismiss(loadingtoast);
    }
    async function deletecourse(){
        await deletehandler(_id,index)
        setshowmodal(false)
    }
  return (
   <div className=" w-full lg:flex justify-between border-[1px] border-richblack-700 px-3 py-6 items-start">
       <div className="lg:w-[60%]  lg:flex gap-5">
         
          <Img src={thumbnail} className={" lg:h-[200px] h-[250px] lg:min-w-[50%] w-[90vw]   rounded-md"}></Img>
          
          <div className="  lg:min-w-[50%] lg:max-w-[50%]  flex flex-col py-2 justify-between">
            <h1 className=" text-lg font-semibold">{title}</h1>
            <p className=" truncate">{description}</p>
            <p>Created: {newdate}</p>
            {
              status==="Draft"?(<p className=" hover:text-pink-200 hover:scale-105 transition-transform duration-700 flex gap-2 items-center p-2 rounded-lg bg-richblack-800 text-caribbeangreen-200 w-fit"><BiTime/> Drafted</p>):(<p className=" hover:text-caribbeangreen-200 hover:scale-105 transition-transform duration-700 flex gap-2 items-center p-2 rounded-lg bg-richblack-800 text-yellow-50 w-fit"><MdPublishedWithChanges/>Published</p>)   
            }
          </div>
       </div>
       <div className=" lg:w-[30%] flex items-center justify-between">
         <p>{duration}</p> 
         <p className=" flex items-center "><BsCurrencyRupee/>{price}</p> 
         <div className=" flex gap-3">
            <button onClick={edithandler}  className="hover:text-caribbeangreen-200 hover:scale-110 transition-transform duration-700"><BiEdit size={25}/></button>
            <button onClick={()=>setshowmodal(true)} className="hover:text-pink-500 hover:scale-110 transition-transform duration-700"><AiFillDelete size={25}/></button>
         </div>
       </div>
       {
        showmodal?<Deletecoursemodal setshowmodal={setshowmodal} deletecourse={deletecourse}/>:<></>
       }
   </div>
  )
}

export default TeacherCourses;