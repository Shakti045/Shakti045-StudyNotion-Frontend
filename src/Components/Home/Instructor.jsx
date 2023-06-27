import React from 'react'
import instructor from "../../assets/Images/Instructor.png"
import Higlightedext from './Higlightedext';
import HomeButtons from './HomeButtons';
import {FaArrowRight} from "react-icons/fa"
function Instructor() {
  return (
    <div className=' w-[100vw] flex lg:flex-row flex-col  lg:gap-0 gap-7 items-center justify-center  mt-12  '>
      <div className='  instructorimage '>
      <img className=' h-[450px]' src={instructor} alt='instructor'></img>
      </div>
      <div className=' flex flex-col lg:w-[40%] lg:ml-12 gap-10'>
     <p className=' lg:text-start text-center text-4xl'>Become an <br></br><Higlightedext>instructor</Higlightedext></p>
     <p className=' text-center lg:text-justify   text-lg'>
     Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
     </p>
     <HomeButtons linkto={"/signup"}  className=" mx-auto lg:mx-0 flex items-center gap-2 text-black bg-yellow-200 hover:scale-95 transition-transform duration-700">
        Start Teaching Today <FaArrowRight></FaArrowRight>
    </HomeButtons>
      </div>
    </div>
  )
}

export default Instructor;