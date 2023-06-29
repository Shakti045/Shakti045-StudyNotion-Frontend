import { useLocation, useNavigate } from "react-router"
import axios from "axios";
import { course, ratingreview } from "../services/url";
import Loader from "../Components/common/Loader"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setloading } from "../redux/slices/loadig";
import { useEffect, useState } from "react";
import {BsInfoCircle} from "react-icons/bs"
import {AiOutlineGlobal,AiFillCaretRight} from "react-icons/ai"
import Rating from "../Components/Course/Rating";
import Section from "../Components/Course/Section";
import defaultimage from "../assets/Images/defaultcourse.webp"
import {ImShare} from "react-icons/im"
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { capturepayment } from "../services/paymentservices";
import Footer from "../Components/Home/Footer";
import { addto_cart } from "../redux/slices/cart";
import { removefrom_cart } from "../redux/slices/cart";
import { apiConnector } from "../services/api";
function Course() {
    const location=useLocation();
    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.loading);
    const {token}=useSelector((state)=>state.auth);
    const courseid=location.pathname.split("/").at(-1);
    const [coursedata,setcoursedata]=useState();
    const [sectiondata,setsectiondata]=useState([]);
    const [alert,setalert]=useState(false);
    const [alerttext,setalerttext]=useState();
    const [incart,setincart]=useState(false);
    const {cartitems}=useSelector((state)=>state.cart)
    const {user} =useSelector((state)=>state.user);
    const [rating,setrating]=useState(0);
    const [duration,setduration]=useState();
    const navigate=useNavigate();
     useEffect(()=>{
        const index =cartitems.findIndex((item) => item._id===courseid)

        if(index>=0){
            setincart(true);
        }
        // }
        // console.log(user.coursesenrolled);
        // console.log(courseid);
        // eslint-disable-next-line
     },[])

     async function courserating(){
        try{
        const {data}=await apiConnector("POST",ratingreview.getAverageRatingurl,{courseid:courseid});
        setrating(data.Averagerating);
        }catch(err){
        console.log(err);
        }
     }
    async function getcoursedata(){
        dispatch(setloading(true));
      try{
        const {data}=await axios.post(course.getcoursedetailsurl,{courseid:courseid});
        setcoursedata(data.details)
        setsectiondata(data.details.sections)
        setduration(data?.duration);
      }catch(err){
        console.log(err);
      }
      dispatch(setloading(false));
    }
    function coapylnkhandler(){
        navigator.clipboard.writeText(window.location.href);
        toast.success("Url Coapied To Clipboard")
    }
    
  
    function buynowhandler(){
        if(!token){
            setalerttext("Purchase The Course")
            setalert(true);
            return;
        } 
       capturepayment([courseid],token,{firstName:user.firstname,email:user.email},navigate,dispatch);
    }

    function addtocarthandler(){
        if(!token){
            setalerttext("Add To Cart")
            setalert(true);
            return;
        } 
        
        dispatch(addto_cart({_id:courseid,thumbnail:coursedata?.thumbnail,price:coursedata?.price,rating:coursedata?.ratingsandreview,title:coursedata?.title,category:coursedata?.category?.name}));
        setincart(true);
    }

    function removefromcart(){
        dispatch(removefrom_cart(courseid));
        setincart(false);
    }
    useEffect(()=>{
        getcoursedata();
        courserating();
       
        // eslint-disable-next-line 
    },[location.pathname]);

  return (
       <>
         {
            loading===true?<Loader></Loader>:<div className={`relative text-pure-greys-5   ${alert===true?" opacity-20":" opacity-100"}`}>
             <div className=" bg-richblack-800 h-[60vh] w-screen flex flex-col justify-center lg:pl-10  ">
                <div className=" lg:max-w-[60vw] p-4 lg:p-0 text-lg font-inter flex flex-col gap-4">
                    <p className=" opacity-100 text-4xl font-bold">{coursedata?.title}</p>
                    <p className=" opacity-60">{coursedata?.description}</p>
                        <div className="opacity-60 lg:flex gap-2   items-center ">
                        <Rating rating={rating}></Rating>
                        <p>{`(${coursedata?.ratingsandreview.length} reviews)`}</p>
                        <p>{`${coursedata?.studentsenrolled.length} students enrolled`}</p>
                        </div>
                        <p className=" opacity-60">{`Created By ${coursedata?.instructor?.firstname}  ${coursedata?.instructor?.lastname }`}</p>
                       <div className="opacity-60 flex gap-2 items-center">
                        <BsInfoCircle/><p >{` Created at ${new Date(coursedata?.createdat)}`}</p>  <AiOutlineGlobal/>   <p>{coursedata?.language}</p>
                       </div>
                    </div>
                </div>
             
             <div className=" mt-20 p-4 lg:p-0 lg:w-[60%] w-screen lg:pl-10">
                 <div className="   flex flex-col gap-5 p-8 border-[1px] border-pure-greys-25">
                    <p className=" text-3xl font-bold">What you'll learn</p>
                    <p>{coursedata?.whatwillyoulearn}</p>
                 </div>
                 <div className=" mt-10 flex flex-col gap-2 ">
                 <p className=" text-3xl font-bold">Course Content</p>
                 <Section duration={duration} sectiondata={sectiondata}></Section>
                  <div className=" flex flex-col gap-2 mt-10">
                       <div className=" flex gap-4 items-center">
                       <img className=" h-[60px] w-[60px] rounded-full" src={coursedata?.instructor?.profilephoto} alt="Instructorprofile"></img>
                        <p className=" opacity-60 text-3xl">{` ${coursedata?.instructor?.firstname}  ${coursedata?.instructor?.lastname }`}</p>
                       </div>
                    </div>
                 </div>
             </div>
              <div className=" lg:w-[30vw] mt-10 lg:mt-0  rounded-lg   flex flex-col gap-4 p-4 bg-richblack-700 lg:absolute top-14 right-10">
              <img className=" w-full h-[200px] rounded-xl" src={coursedata?.thumbnail?coursedata?.thumbnail:defaultimage} alt="Coursethumbnail"></img>
              <p className=" font-bold text-3xl ">Rs. {coursedata?.price}</p>
             
              {
                (coursedata?.studentsenrolled.indexOf(user?._id)>-1)===false?<><button onClick={buynowhandler} className=" p-3 rounded-lg bg-yellow-50 text-richblack-900">Buy Now</button>
                {
                    incart===false?<button onClick={addtocarthandler} className=" p-3 rounded-lg bg-richblack-800 text-white">Add To Cart</button>:<button onClick={removefromcart} className=" p-3 rounded-lg bg-richblack-800 text-white">Remove From Cart</button>
                }</>:<button onClick={()=>navigate("/dashboard/enrolled-courses")} className=" p-3 rounded-lg bg-yellow-50 text-richblack-900">Go To Course</button>
             }
            
              <p className=" opacity-70 text-center">30-Day Money-Back Guarantee</p>
              <p className=" text-xl font-bold">This Course Includes :</p>
             <div className=" flex flex-col gap-2">
             {
                coursedata?.tags.map((data,index)=>{
                    return (
                        <div key={index} className=" flex gap-2 items-center text-lg text-caribbeangreen-200 ">
                            <AiFillCaretRight/>
                            <p>{data}</p>
                        </div>
                    )
                })
              }
             </div>
              <button onClick={coapylnkhandler} className=" flex items-center gap-2 text-yellow-50 mx-auto"><ImShare/> Share</button>
              </div>
            </div>
         }
          {
               alert===true? <div className=" absolute top-[40vh] left-[40vw] p-7 bg-richblack-700 w-fit rounded-xl flex flex-col  text-white gap-3">
               <p className=" text-2xl">You are not logged in!</p>
               <p>Please login to {alerttext}.</p>
               <div className=" flex gap-5">
                   <Link to="/login"><button className=" p-2 rounded-md bg-yellow-50 text-black">Login</button></Link>
                   <button onClick={()=>setalert(false)} className=" p-2 rounded-md bg-richblack-400 text-white">Cancel</button>
               </div>
              </div>:""
               }
               <Footer/>
       </>
  )
}

export default Course

