import aboutimage1 from "../assets/Images/aboutus1.webp"
import aboutimage2 from "../assets/Images/aboutus2.webp"
import aboutimage3 from "../assets/Images/aboutus3.webp"
import aboutimage4 from "../assets/Images/FoundingStory.png"
import CountUp from 'react-countup';
import Learninggrid from "../Components/About/Learninggrid";
import Contactform from "../Components/common/Contactform";
import Footer from "../Components/Home/Footer"
function About() {
  return (
    <div className=" font-mono flex flex-col gap-7  w-screen items-center mt-16 text-white">
        <div className=" lg:w-[60%] flex flex-col gap-4">
         <h1 className=" text-4xl font-semibold text-center">Driving Innovation in Online Education for a  <span className=" text-blue-200">Brighter Future</span></h1>
         <p className=" opacity-60 text-center ">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        <div className=" flex lg:flex-row flex-col gap-5">
            <img src={aboutimage1}  className=" rounded-lg" alt="aboutimage"></img>
            <img src={aboutimage2} className=" rounded-lg" alt="aboutimage"></img>
            <img src={aboutimage3} className=" rounded-lg" alt="aboutimage"></img>
         </div>
         <div className=" border-b-[1px] border-richblack-700 pb-20 border- w-[85%]">
        <p className=" text-4xl font-semibold text-center">We are passionate about revolutionizing the way we learn. Our innovative platform <span className=" text-blue-200">combines technology</span>, <span className=" text-brown-50">expertise</span>, and community to create an <span className=" text-brown-200">unparalleled educational experience.</span></p>
        </div>
       <div className=" flex lg:flex-row lg:gap-0  flex-col gap-5 items-center justify-around">
         <div className=" flex flex-col lg:w-[45%] w-[95%] gap-10">
          <h1 className="  text-yellow-5 text-4xl">Our Founding Story</h1>
          <p className=" opacity-70">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
          <p className=" opacity-70">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
         </div>
         <div className=" rounded-lg  aboutimage">
           <img className=" w-[95vw] lg:w-fit rounded-lg " src={aboutimage4} alt="Aboutimage"></img>
         </div>
       </div>

       <div className= " mt-48 flex flex-col lg:flex-row justify-around gap-16">
          <div className=" text-center lg:text-start lg:w-[37%]  flex flex-col gap-10">
            <h1 className="  text-caribbeangreen-50 text-4xl font-semibold">Our Vision</h1>
            <p className=" opacity-70">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
          </div>
          <div className=" text-center lg:text-start lg:w-[37%] flex flex-col gap-10">
           <h1 className="  text-blue-100 text-4xl font-semibold">Our Mission</h1>
           <p className=" opacity-70">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
          </div>
       </div>
       <div  className=" mt-10 w-screen lg:flex lg:justify-around grid grid-cols-2 gap-5  bg-richblack-800 p-10 text-white  ">
          <div className=" flex flex-col gap-1 items-center">
           <div className=" font-bold flex items-center text-3xl">
           <CountUp start={0} end={5000} duration={4}></CountUp><span>+</span>
           </div>
            <p className=" text-center lg:text-start opacity-60">Active Students</p>
          </div>
          <div className=" flex flex-col gap-1 items-center">
            <div className=" font-bold flex items-center text-3xl">
            <CountUp start={0} end={10} duration={4}>+</CountUp><span>+</span>
            </div>
            <p className=" opacity-60">Mentors</p>
          </div>
          <div className=" flex flex-col gap-1 items-center">
          <div className="font-bold flex items-center text-3xl">
          <CountUp start={0} end={200} duration={4}>+</CountUp><span>+</span>
          </div>
            <p className=" opacity-60">Courses</p>
          </div>
          <div className=" flex flex-col gap-1 items-center">
           <div className="font-bold flex items-center text-3xl">
           <CountUp start={0} end={50} duration={4}>+</CountUp><span>+</span>
           </div>
            <p className=" opacity-60">Awards</p>
          </div>
       </div>
        <Learninggrid></Learninggrid>
        <div className="   flex flex-col gap-1 items-center mt-20">
          <h1 className="  text-3xl font-bold">Get in Touch</h1>
          <p className=" text-center lg:text-justify opacity-60">We'd love to here for you, Please fill out this form.</p>
          <Contactform></Contactform>
        </div>

        <Footer></Footer>
    </div>
  )
}

export default About