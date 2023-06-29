import React from 'react'
import Img from '../common/LazyLoadImage';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
function StudentEnrolledCourseCard({_id,thumbnail,description,title,progress,sections}) {
  const [navigateurl,setnavigateurl]=useState();
  useEffect(()=>{
    const progressarray=JSON.parse(localStorage.getItem("studynotoinvideoprogress"));
    if(progressarray){
      const index=progressarray.findIndex((e)=>e.course===_id);
      if(index>=0){
        setnavigateurl(progressarray[index].video);
      }else{
        setnavigateurl(`/course/${_id}/section/${sections[0]._id}/subsection/${sections[0].subsections[0]}`)
      }
    }else{
      setnavigateurl(`/course/${_id}/section/${sections[0]._id}/subsection/${sections[0].subsections[0]}`)
    }
  },[]);
  return (
    <Link to={navigateurl} >
    <div className="  lg:w-[300px] w-[90vw]  rounded-xl bg-richblack-700 border-[1px] border-richblack-600 hover:scale-[1.02]  transition-transform duration-700  shadow-sm cursor-pointer shadow-white">
        <div className=' flex flex-col gap-2'>
        <Img src={thumbnail} className={"lg:w-[300px] w-[90vw]  lg:h-[200px] h-[250px] rounded-xl"}></Img>
        <div className=' p-2 flex flex-col gap-2 '>
            <h1 className=' truncate text-lg font-semibold'>{title}</h1>
            <p className=' truncate text-pure-greys-200'>{description}</p>
            <ProgressBar completed={progress} maxCompleted={100} isLabelVisible={false} height='10px' />
            <p className=' text-caribbeangreen-200'>{progress}% Completed</p>
        </div>
        </div>
    </div>
    </Link>
  )
}

export default StudentEnrolledCourseCard;