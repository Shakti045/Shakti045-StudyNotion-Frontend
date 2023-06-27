import {FaArrowRight} from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Higlightedext from "../Components/Home/Higlightedext";
import HomeButtons from "../Components/Home/HomeButtons";
import bannervideo from "../assets/Images/banner.mp4"
import Coding from "../Components/Home/Coding";
import Footer from "../Components/Home/Footer";
import Instructor from "../Components/Home/Instructor";
import Coursetabs from "../Components/Home/Coursetabs";
import Advertising from "../Components/Home/Advertising";
import Swissknife from "../Components/Home/Swissknife";
import Reviews from "../Components/Home/Reviews";
function Home(){
    return (
        <div className="  w-screen min-h-screen bg-richblack-900 flex flex-col items-center text-white font-inter">

          <div className=" flex flex-col items-center font-mono">
           <NavLink to="/signup">    
            <div className=" group transition-all hover:bg-richblack-700 hover:text-richblue-5 hover:scale-95 duration-700  mt-14 bg-richblack-800 border-b-2 border-blue-300 lg:px-16 px-10 py-3 text-xl font-bold rounded-full">
             <div className=" flex items-center gap-2">
                 <p>Become an instructor</p>
                 <FaArrowRight></FaArrowRight>
             </div>
              </div>
              </NavLink>
             
            <div className=" mt-10 font-mono flex flex-col items-center gap-4  ">
                <p className=" text-center lg:text-start text-4xl ">Empower Your Feature With <Higlightedext>Coding Skills</Higlightedext> </p>
                <p className=" text-center lg:max-w-[95%] text-xl">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of          resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </p>
                <div className=" flex gap-10 mt-9">
                    <HomeButtons className=" border-b-2 border-r-2 border-blue-300 bg-yellow-400 text-richblack-900" linkto="/signup">
                        Learn More
                    </HomeButtons>
                    <HomeButtons className=" bg-richblack-700 border-b-2 border-r-2 border-blue-300 text-white"  linkto="/login">
                        Book a demo
                    </HomeButtons>
                </div>
            </div>
          </div>
     

        <div className=" shadow-2xl  shadow-blue-400   rounded-3xl mt-10 ">
           <video autoPlay loop controls className="bannervideo w-[85vw] rounded-2xl" >
            <source  src={bannervideo}  />
           </video>
        </div>
           
        <div className=" flex lg:flex-row flex-col gap-10 items-center mt-32">
           <div className=" flex flex-col items-center lg:items-start gap-8 lg:w-[40vw]">
             <p className=" text-center lg:text-justify text-4xl">
             Unlock your <Higlightedext>coding potential</Higlightedext> with our online courses.
             </p>
             <p className="text-center lg:text-justify text-lg">
             Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
             </p>
             <div className=" flex gap-5  ">
               <HomeButtons className=" flex gap-2 items-center border-b-2 border-r-2 border-blue-300 bg-yellow-400 text-richblack-900" linkto="/signup">
                        Try It Yourself <FaArrowRight></FaArrowRight>
                    </HomeButtons>
                    <HomeButtons className=" bg-richblack-700 border-b-2 border-r-2 border-blue-300 text-white"  linkto="/login">
                        Learn More
                    </HomeButtons>
             </div>
           </div>

           <Coding code={`<!DOCTYPE html>
<html lang="en">
<head>
<title>This is myPage</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav> <a href="/one">One</a> <a href="/two">Two</a>\n <a href="/three">Three</a>
</nav> </body>`}></Coding>
        </div>


        <div className=" flex lg:flex-row flex-col gap-10 items-center mt-32">
            
           <Coding code={`import React from "react";
import CTAButton from "./Button";
import TypeAnimation from "react-type";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom"
const Home = () => {
return (
<div>Home</div>
)
}
export default Home;`}></Coding>
           <div className="  flex flex-col gap-8 lg:w-[40vw]">
             <p className=" text-center lg:text-justify text-4xl">
             Start  <Higlightedext>coding in <br></br> seconds</Higlightedext>
             </p>
             <p className=" text-center lg:text-justify text-lg">
             Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
             </p>
             <div className="mx-auto lg:mx-0  flex gap-5 ">
               <HomeButtons className=" flex gap-2 items-center border-b-2 border-r-2 border-blue-300 bg-yellow-400 text-richblack-900" linkto="/signup">
                        Continue Lesson<FaArrowRight></FaArrowRight>
                    </HomeButtons>
                    <HomeButtons className=" bg-richblack-700 border-b-2 border-r-2 border-blue-300 text-white"  linkto="/login">
                        Learn More
                    </HomeButtons>
             </div>
           </div>

        </div>
          <Coursetabs></Coursetabs>
          <div className=" bg-pure-greys-5 text-richblack-700 flex flex-col items-center">
          <div className=" bg-pure-greys-5 catalog w-screen h-[400Px] flex items-center justify-center translate-y-[-150px]">
            <div className=" mt-20 flex lg:gap-10 gap-2">
              <HomeButtons linkto={"/signup"} className=" flex items-center gap-2 font-bold bg-yellow-100  text-black">Explore Full Catalog <FaArrowRight></FaArrowRight></HomeButtons>
              <HomeButtons linkto={"/signup"} className=" bg-richblack-800 text-white">Learn More</HomeButtons>
            </div>
          </div>

           <div className="  lg:w-11/12  flex lg:flex-row flex-col gap-6 lg:gap-0 ">
             <div className=" lg:w-[60%] w-screen    ">
            <p className=" text-center lg:text-start text-4xl">Get the skills you need for a <br></br> <span className=" text-blue-400 font-semibold">job that is in demand</span></p>
             </div>
             <div className="  lg:w-[40%] w-screen  flex flex-col items-center lg:items-start  gap-14">
            <p className=" text-lg   ">The modern StudyNotion is the dictates its own terms.  Today, to be a competitive specialist requires more than  professional skills.</p>
            <HomeButtons linkto={"/signup"} className="   bg-yellow-100 font-bold  text-black">Learn More</HomeButtons>
             </div>
           </div>

         <Advertising></Advertising>
         <Swissknife></Swissknife>
          </div>
          <Instructor></Instructor>
          <Reviews></Reviews>
          <Footer></Footer>
        </div>
    )
}

export default Home;