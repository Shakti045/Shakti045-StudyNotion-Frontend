import { useLocation } from "react-router"
import axios from "axios"
import { category } from "../services/url"
import { useEffect, useState } from "react"
import Loader from "../Components/common/Loader"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setloading } from "../redux/slices/loadig"
import Coursecard from "../Components/Course/Coursecard"
function Category() {
  const location=useLocation();
  const categoryid=location.pathname.split('/').at(-1);
  const [relatedcourse,setrelatedcourse]=useState([]);
  const [topratedcourse,settopratedcourse]=useState([]);
  const [othercourse,setothercourse]=useState([]);
  const dispatch=useDispatch();
  const {loading}=useSelector((state)=>state.loading);
  async function getcategorydata(){
     dispatch(setloading(true))
    try{
     const {data}=await axios.post(category.getcategorydetail,{categoryid:categoryid})
     setrelatedcourse(data?.data?.coursesrelatedtocategory);
    //  console.log(data?.data?.coursesrelatedtocategory);
     settopratedcourse(data?.data?.topratedcourses);
    //  console.log(data?.data?.topratedcourses);
     setothercourse(data?.data?.othercourses);
    }catch(err){
    console.log(err);
    }
    dispatch(setloading(false))
  }
  useEffect(()=>{
    getcategorydata();
    // eslint-disable-next-line
  },[location.pathname])
  return (
    <>
      {
        loading===true?<Loader></Loader>:<div className=" flex flex-col  font-inter w-screen   text-white">
        <div className=" bg-richblack-800 lg:h-[40vh] h-[25vh] w-screen flex flex-col justify-center  ">
        <div className=" ml-14  flex flex-col gap-3  text-white ">
        {
          relatedcourse.length>=1?<><p className="  opacity-60"><Link to="/">Home </Link><span>/ </span><span>Catalog  / </span><span className="text-yellow-100">{relatedcourse[0]?.name}</span></p>
          <p className="opacity-90 text-4xl ">{relatedcourse[0]?.name}</p>
          <p className=" text-lg opacity-60">{relatedcourse[0]?.description}</p></>:""
        }
        </div>
        </div>
        <div className="flex flex-col mx-auto text-pure-greys-5 font-inter gap-10 mt-10">
          <div className="flex flex-col gap-5">
          <p className="  text-4xl">Courses Related To Your Search</p>
           <div className="  border-b-[1px] border-richblack-700 flex gap-3 mt-1 pb-2">
           <button className=" text-yellow-50">Most Popular</button>
           <button>New</button>
           </div>
           <div className="  mx-auto grid lg:grid-cols-3 grid-cols-1  gap-10" >
             {
              relatedcourse[0]?.relatedcourses.map((data,index)=>{
                return <Coursecard key={index} {...data}></Coursecard>
              })
             }
           </div>
          </div>


          <div className="flex flex-col mx-auto   text-pure-greys-5 font-inter gap-10 mt-10">
          <div className="flex flex-col gap-5">
          <p className="  text-4xl">Most Popular courses</p>
           <div className="  border-b-[1px] border-richblack-700 flex gap-3 mt-1 pb-2">
           <button className=" text-yellow-50">Most Popular</button>
           <button>New</button>
           </div>
           <div className="  mx-auto grid lg:grid-cols-3 grid-cols-1  gap-10" >
             {
             topratedcourse.map((data,index)=>{
                return <Coursecard key={index} {...data}></Coursecard>
              })
             }
           </div>
          </div>
          </div>




          
          <div className="flex flex-col mx-auto   text-pure-greys-5 font-inter gap-10 mt-10">
          <div className="flex flex-col gap-5">
          <p className="  text-4xl">Other Courses</p>
           <div className="  border-b-[1px] border-richblack-700 flex gap-3 mt-1 pb-2">
           <button className=" text-yellow-50">Most Popular</button>
           <button>New</button>
           </div>
           <div className=" mx-auto grid lg:grid-cols-3 grid-cols-1  gap-10" >
             {
               othercourse.map((data,index)=>(
                <Coursecard key={index} {...data}></Coursecard>
               ))
             }
           </div>
          </div>
          </div>


          
        </div>
     </div>
      }
    </>
  )
}

export default Category