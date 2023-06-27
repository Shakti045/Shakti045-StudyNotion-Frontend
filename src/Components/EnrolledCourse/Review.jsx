import {AiOutlineRollback} from "react-icons/ai";
import {RxCross1} from "react-icons/rx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/api";
import { ratingreview } from "../../services/url";
import Loader from "../common/Loader";
import { toast } from "react-toastify";
function Review({courseid}) {
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.user);
    const {token}=useSelector((state)=>state.auth);
    const [rating,setrating]=useState(0);
    const [showrating,setshowrating]=useState(false);
    function changeRating(newRating){
       setrating(newRating);
       console.log(rating);
    }
    const {
        register,
        formState:{errors,isSubmitSuccessful},
        reset,
        handleSubmit
    }=useForm();
    const headers={
        Authorization:`Bearer ${token}`
    }
    async function reviewsubmit(data){
          const loadingtoast=toast.loading("Submitting Review.....")
       try{
         const result=await apiConnector("POST",ratingreview.ratingreviewsubmiturl,{rating:rating,review:data.review,courseid:courseid},headers) ;
         if(result.status===200){
            toast.dark("Review Submitted Successfully")
         } 
       }catch(err){
        toast.error(err.response.data.Message)
       }
       toast.dismiss(loadingtoast);
       setshowrating(false);
    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                review:""
            })
        }
    
    },[isSubmitSuccessful])
  return (
   
        
           <div className=" flex p-4 justify-between ">
        
            <button onClick={()=>navigate(-1)} className=" p-2 rounded-full bg-richblack-300"><AiOutlineRollback size={30} color="black"/></button>
            <button onClick={()=>setshowrating(true)} className=" px-4 py-1 bg-yellow-100 text-richblack-900 font-semibold rounded-md">Add Review</button>
            {
                showrating && (
                  
                    <div className="   text-white flex flex-col justify-center items-center absolute z-40 top-0 right-0 left-0 bottom-0 bg-richblack-900 bg-opacity-5 backdrop-blur-sm ">
                       <div className=" border-2 rounded-xl border-richblack-500">
                        <div className=" lg:w-[60vw] w-[90vw] flex flex-col rounded-xl bg-richblack-700">
                          <div className=" items-center bg-richblack-600 w-full flex justify-between p-3 rounded-t-xl">
                              <h1 className=" text-3xl font-bold">Add Review</h1>
                              <RxCross1 onClick={()=>setshowrating(false)} size={20}/>
                          </div>
                          <div className=" flex gap-3  mx-auto mt-6">
                          <img alt="profileimage"   className=" rounded-full h-[50px] w-[50px]" src={user?.profilephoto}></img>
                              <div className=" flex flex-col">
                                     <h1 className=" text-2xl font-bold">{user.firstname+" "+user.lastname}</h1>
                                     <p>Posting Publicly</p>
                              </div>
                          </div>
                          <div className=" mt-6 mx-auto">
                              <StarRatings starRatedColor="yellow" numberOfStars={5} starDimension="20px"
                              rating={rating}
                              changeRating={changeRating}
                                     name='rating'/>
                              </div>
                          <div className=" p-4 px-9 flex flex-col gap-1">
                                 <label>Add Your Experience<sup className=" text-pink-300">*</sup></label>
                                 <textarea spellCheck={true} rows={8}  className=" outline-none p-2 border-b-2  bg-richblack-800 rounded-xl"
                                  {
                                      ...register("review",{required:true})
                                  }
                                 >
                                 </textarea>
                                 {
                                  errors.review && (
                                      <span className=" text-pink-400">Please Add Your Experience</span>
                                  )
                                 }
                              </div>
                              <div className="  flex gap-3 items-end justify-end px-9 pb-9">
                                 <button onClick={()=>setshowrating(false)} className=" px-3 py-2 bg-richblack-300 rounded-md">Cancel</button>
                                 <button onClick={handleSubmit(reviewsubmit)} className=" px-3 text-richblack-900 py-2 bg-yellow-200 rounded-md">Submit</button>
                              </div>
                      </div>
                        </div>
               </div>
                  
                 )
            }
        </div>
  
  )
}

export default Review