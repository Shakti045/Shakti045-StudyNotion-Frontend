import React from 'react'
import Img from '../common/LazyLoadImage';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link } from 'react-router-dom';
function StudentEnrolledCourseCard({_id,thumbnail,description,category,title,completed=53}) {
  return (
    <Link to={`/enrolled-courses/${_id}`} >
    <div className="  lg:w-[300px] w-[90vw]  rounded-xl bg-richblack-700 border-[1px] border-richblack-600 hover:scale-[1.02]  transition-transform duration-700  shadow-sm cursor-pointer shadow-white">
        <div className=' flex flex-col gap-2'>
        <Img src={thumbnail} className={"lg:w-[300px] w-[90vw]  lg:h-[200px] h-[250px] rounded-xl"}></Img>
        <div className=' p-2 flex flex-col gap-2 '>
            <h1 className=' truncate text-lg font-semibold'>{title}</h1>
            <p className=' truncate text-pure-greys-200'>{description}</p>
            <ProgressBar completed={completed} maxCompleted={100} isLabelVisible={false} height='10px' />
            <p className=' text-caribbeangreen-200'>{completed}% Completed</p>
        </div>
        </div>
    </div>
    </Link>
  )
}

export default StudentEnrolledCourseCard;