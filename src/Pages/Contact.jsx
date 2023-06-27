import {HiChatBubbleLeftRight} from "react-icons/hi2";
import {BiWorld} from "react-icons/bi";
import {IoCall} from "react-icons/io5";
import Contactform from "../Components/common/Contactform";
import Footer from "../Components/Home/Footer";
function Contact() {
  return (
    <>
    <div className=" w-screen flex lg:flex-row flex-col gap-10 lg:gap-0 items-center lg:items-start   mt-20  justify-around  text-white">
         <div className=" flex flex-col gap-8 bg-richblack-800 h-fit lg:w-[35%] w-[95%] p-6 rounded-xl ">
            <div className=" flex flex-col gap-2">
            <div className="text-2xl  flex gap-2 items-center">
                <HiChatBubbleLeftRight/>
                <p className=" font-semibold">Chat on us</p>
            </div>
            <p className=" opacity-70">                
            Our friendly team is here to help.
            </p>
            <p className=" opacity-70">
            info@studynotion.com
            </p>
            </div>

            <div className="  flex flex-col gap-2">
            <div className="text-2xl flex gap-2 items-center">
               <BiWorld/>
                <p className="  font-semibold">Visit us</p>
            </div>
            <p className=" opacity-70">                
            Come and say hello at our office HQ.
            </p>
            <p className=" opacity-70">
                Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
            </p>
            <p className=" opacity-70">
            Bangalore-560016
            </p>
            </div>

            <div className="  flex flex-col gap-2">
            <div className="text-2xl flex gap-2 items-center">
                <IoCall/>
                <p className="  font-semibold">Call us</p>
            </div>
            <p className=" opacity-70">                
            Mon - Fri From 8am to 5pm
            </p>
            <p className=" opacity-70">
            +917846996310
            </p>
            </div>
         </div>
         <div className=" lg:w-[45%] w-[95%] flex flex-col items-center gap-5 p-7 border-[1px] border-richblack-700 rounded-xl">
            <h1 className=" text-center text-4xl font-bold">Got a Idea? We've got the skills. Let's team up</h1>
            <p className=" opacity-70">Tell us more about yourself and what you're got in mind.</p>
            <Contactform></Contactform>
         </div>
      
    </div>
       <Footer></Footer>
       </>
  )
}

export default Contact