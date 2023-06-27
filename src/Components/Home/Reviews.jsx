import { useEffect } from "react";
import { apiConnector } from "../../services/api";
import { ratingreview } from "../../services/url";
import { useState } from "react";
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
// import "swiper/css/pagination"
import { Autoplay,Navigation,Pagination}  from 'swiper'
import Ratingcard from "./Ratingcard";
function Reviews() {
  const [loading,setloading]=useState(false);
  const [ratings,setratings]=useState([]);
  async function getallreviews(){
    setloading(true);
    try{
       const {data}=await apiConnector("GET",ratingreview.getallratingsurl);
       if(data){
        // console.log(data?.Ratings);
        setratings(data?.Ratings);
       }
    }catch(err){
      console.log("Error while getting rating and reviews","=>",err);
    }
    setloading(false);
  }
  useEffect(()=>{
    getallreviews();
  },[]);
  return (
    <div className=" mt-12">
        <p className=" text-4xl text-center font-semibold">Reviews from other learners</p>
         <div className=" flex flex-col items-center mt-10 w-full ">
             {
              loading ?(<h1>Loading.......</h1>):(<div className=" w-[100vw]">
              <Swiper
                  loop={true}
                  pagination={true}
                  modules={[Autoplay,Navigation,Pagination]}
                  autoplay={{
                  delay: 2000,
                  disableOnInteraction:false,
                  pauseOnMouseEnter:true
                  }}
                  navigation={true}  slidesPerView={1} spaceBetween={15}
                  breakpoints={{
                    1024:{slidesPerView:3,}
                }}>
                   {
                    ratings.map((data,index)=>{
                      return <SwiperSlide key={index}><Ratingcard  {...data}/></SwiperSlide>
                     })
                   }
                   </Swiper>
              </div>)
             }
         </div>
    </div>
  )
}

export default Reviews