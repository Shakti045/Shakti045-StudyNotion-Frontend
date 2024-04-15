import { Link } from "react-router-dom"
import defaultimage from "../../assets/Images/defaultcourse.webp"
import Img from "../common/LazyLoadImage"
import { useState } from "react";
import { useEffect } from "react";
import Rating from "./Rating";
function Coursecard({title,language,price,thumbnail,_id,ratingsandreview}) {
  const [totalrating,settotalrating]=useState(0);
  function getavgrating(){
    const totalReviewCount = ratingsandreview?.reduce((acc, curr) => {
      acc += curr.rating
      return acc
    }, 0)
    let avgrating=(totalReviewCount/ratingsandreview.length);
    settotalrating(avgrating)
  }

  useEffect(()=>{
    if(ratingsandreview.length>0){
      getavgrating();
    }
  },[_id]);
  return (
     <Link to={`/course/${_id}`}>
        <div className=" lg:w-[350px] min-h-[330px] w-[95vw] bg-richblack-800 rounded-lg border-[1px] border-richblack-500  hover:scale-[1.02] transition-transform duration-700 font-inter text-xl  flex flex-col gap-2 font-semibold">
       <div className=" w-full ">
        {/* <img src={thumbnail?thumbnail:defaultimage} alt="Coursethumbnail" className="rounded-lg lg:w-[350px] w-[95vw]   lg:h-[200px] h-[250px]"></img> */}
        <Img src={thumbnail?thumbnail:defaultimage}  className="rounded-lg lg:w-[350px] w-[95vw] lg:h-[200px] h-[250px]"></Img>
       </div>
       <div className=" p-2 opacity-70   flex flex-col gap-2 ">
       <div className="flex  justify-between">
         <p className=" truncate">{title}</p>
         <p className=" text-caribbeangreen-100">{language}</p>
       </div>
        <div className=" flex gap-2 items-center  ">
             <Rating rating={totalrating}/>
        <p className=" opacity-40">{ratingsandreview.length} Ratings</p>
        </div>
       <p className=" text-yellow-50">Rs.{price}</p>
       </div>
    </div>
     </Link>
  )
}

export default Coursecard