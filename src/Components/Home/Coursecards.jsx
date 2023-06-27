import { useEffect, useState } from 'react'
import {AiOutlineApartment} from "react-icons/ai"
import {FaUserFriends} from "react-icons/fa"
function Coursecards({currentcourses}) {
  const [clicked,setclicked]=useState(0);
  useEffect(()=>{
    setclicked(0);
  },[currentcourses])
  return (
    <div className=' lg:w-11/12 w-screen mt-10 flex lg:flex-row flex-col gap-7  '>
        {
            currentcourses.map((data,index)=>{
                return (<div onClick={()=>setclicked(index)} className={`lg:cursor-pointer z-40 transition-all duration-700  rounded-xl lg:w-[400px]   flex flex-col gap-6 p-6 ${clicked===index?" cousreclicked bg-richblack-5 text-black ":"bg-richblack-800 text-white coursernotclicked "}`} key={index}>
                   <div className=' text-xl font-semibold'>{data.heading}</div>
                   <div className=' opacity-60 min-h-[100px]'>{data.description}</div>
                   <div className=' opacity-60 mt-10 border-t-2 border-dotted  pt-8 flex justify-between'>
                     <div className=' flex gap-2 items-center'><FaUserFriends/>{data.level}</div>
                     <div className=' flex gap-2 items-center'> <AiOutlineApartment/> {data.lessionNumber} Lession</div>
                   </div>
                </div>)
            })
        }
    </div>
  )
}

export default Coursecards