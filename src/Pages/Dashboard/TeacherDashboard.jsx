import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/api";
import { profile } from "../../services/url";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import CountUp from "react-countup";
import {FaRupeeSign} from "react-icons/fa"
import { useNavigate } from "react-router";
import Img from "../../Components/common/LazyLoadImage";
import Visualize from "../../Components/Dashboard/Visualize";
function TeacherDashboard() {
  const {token}=useSelector((state)=>state.auth);
  const [data,setdata]=useState([]);
  const {user}=useSelector((state)=>state.user);
  const [totalstudent,settotalstudent]=useState(0);
  const [totalincome,settotalincome]=useState(0);
  const navigate=useNavigate();
  async function getdashboarddata(){
    const loadingtoast=toast.loading("Please wait......")
    try{
      const {data}=await apiConnector("GET",profile.getinstructordashboarddataurl,null,{
        Authorization:`Bearer ${token}`
      })
       setdata(data?.data);
       calculatetotalstudent(data?.data);
       calculatetotalincome(data?.data);
      
    }catch(err){
      console.log("Error while fetching teacher dashboard","=>",err);
      toast.error("Something went wrong")
    }
    toast.dismiss(loadingtoast);
  }
  function calculatetotalstudent(data){
    let k=0;
    data.forEach((e)=>{
      k=k+e.totalstudent;
    })
    settotalstudent(k);
  }
  function calculatetotalincome(data){
    let k=0;
    data.forEach((e)=>{
      k=k+ e.profit*e.totalstudent
    })
    settotalincome(k);
  }
  useEffect( ()=>{
    getdashboarddata();
  },[])
  return (
    <div className="font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-3 lg:p-10 p-4 w-full text-white">
       
       <div className=" w-full ">
          <h1 className=" text-2xl font-semibold">Hi {user.firstname} 👋</h1>
          <p className=" text-pure-greys-200">Let's start something new</p>
       </div>


       <div className=" w-full flex lg:flex-row flex-col gap-3">
        <div className=" flex flex-col gap-4 text-lg lg:w-[75%] p-6 rounded-md h-[80vh]    bg-richblack-800">
          <h1 className=" text-2xl font-bold">Visualize</h1>
           {
            totalstudent===0?(<>
             <p>Not Enough Data To Visualize</p>
            </>):(
              <Visualize data={data}/>
            )
           }
        </div>
        <div className=" text-xl flex flex-col gap-6 p-6 rounded-md  bg-richblack-800  lg:w-[25%] lg:h-[80vh]">
          <h1 className=" font-bold">Statistics</h1>
          <div>
            <p className=" text-pure-greys-100">Total Courses</p>
            <p className=" text-4xl "><CountUp start={0} end={data.length} duration={5}/></p>
          </div>
          <div>
            <p className=" text-pure-greys-100">Total Course Sold</p>
            <p className=" text-4xl "><CountUp start={0} end={totalstudent} duration={5}/></p>
          </div>
          <div>
            <p className=" text-pure-greys-100">Total Income</p>
            <p className=" flex items-center text-4xl "><FaRupeeSign/><CountUp start={0} end={totalincome} duration={5}/></p>
          </div>
        </div>
       </div>

       <div className=" flex flex-col gap-3 w-full p-6 bg-richblack-800 rounded-md">
         <div className=" flex items-center justify-between">
         <h1 className=" text-2xl font-semibold">Your Courses</h1>
         <button onClick={()=>navigate("/dashboard/teacher/mycourses")} className=" text-yellow-100">View All</button>
         </div>
         <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4">
          {
           data.slice(0,3).map((e,index)=>(
            <div className=" flex flex-col gap-2 " key={index}>
              <Img src={e?.thumbnail} className={" h-[200px] w-[500px]  rounded-md"}/>
              <p className=" truncate text-pure-greys-100">{e?.title}</p>
              <p className=" text-pure-greys-100">{e.totalstudent} Students | Rs.{e.price}</p>
            </div>
           ))
          }
         </div>
       </div>


    </div>
  )
}

export default TeacherDashboard;