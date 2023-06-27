import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {apiConnector} from "../../services/api"
import { useState } from "react";
import { category, course } from "../../services/url";
import ImageInput from "./ImageInput";
import RequirementsInput from "./RequirementsInput";
import TagsInput from "./TagsInput";
import {GrFormNext} from "react-icons/gr"
import { toast } from "react-hot-toast";
import { set_step } from "../../redux/slices/course";
import { set_coursedata } from "../../redux/slices/course";
import { set_loading } from "../../redux/slices/course";
function CourseInformation() {
    const {editmode}=useSelector((state)=>state.course);
    const {coursedata}=useSelector((state)=>state.course);
    const [categories,setcategories]=useState([]);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const {
        register,
        handleSubmit,
        formState:{errors},
        getValues,
        setValue
    }=useForm();

    async function getcategories(){
        try{
         const {data}= await  apiConnector("GET",category.showAllCategoriesurl)
         setcategories(data.Categories);
        }catch(err){
         console.log("Error while fetching all categories in nav.js","=>",err);
        }
     }

        function activate_editmode(){
        const {title,description,language,price,whatwillyoulearn,category,tags,thumbnail,requirements}=coursedata;
      setValue("title",title);
      setValue("description",description);
      setValue("language",language);
      setValue("price",price);
      setValue("whatwillyoulearn",whatwillyoulearn);
      setValue("category",category);
      setValue("tags",tags);
      setValue("thumbnail",thumbnail);
      setValue("requirements",requirements);
    }
     useEffect(()=>{
        if(editmode){
            activate_editmode();
        }
        getcategories();
     },[])
    

     async function createcourse(data){
        const loadingtoast=toast.loading("Please wait......")
        dispatch(set_loading(true));
         try{
            const {title,description,language,price,whatwillyoulearn,category,tags,thumbnail,requirements}=data;
            const formdata=new FormData();
            formdata.append("title",title);
            formdata.append("description",description);
            formdata.append("language",language);
            formdata.append("price",price);
            formdata.append("whatwillyoulearn",whatwillyoulearn);
            formdata.append("category",category);
            formdata.append("tags",JSON.stringify(tags));
            formdata.append("thumbnail",thumbnail);
            formdata.append("requirements",JSON.stringify(requirements));
            const result=await apiConnector("POST",course.createCourseurl,formdata,{
                Authorization:`Bearer ${token}`
            })
            if(result.status===200){
                toast.success("Course Created Successfully")
                dispatch(set_step(2));
                dispatch(set_coursedata({...result?.data?.course}));
            }
         }catch(err){
            console.log(err);
            toast.error(err.response.data.Message)
         } 
         toast.dismiss(loadingtoast);
         dispatch(set_loading(false));   
 }
 
 async function editcourse(){
    const loadingtoast=toast.loading("Please wait......")
    dispatch(set_loading(true));
    try{
        const {title,description,language,price,whatwillyoulearn,category,tags,thumbnail,requirements}=getValues();
    const {_id,title:oldtitle,description:olddescription,language:oldlanguage,price:oldprice,whatwillyoulearn:oldwhatwillyoulearn,category:oldcategory,tags:oldtags,thumbnail:oldthumbnail,requirements:oldrequirements}=coursedata;
        const formdata=new FormData();
        formdata.append("_id",_id);
        if(oldtitle!==title){
            formdata.append("title",title);
        }
        if(olddescription!==description){
            formdata.append("description",description);
        }
        if(oldlanguage!==language){
            formdata.append("language",language);
        }
        if(oldprice!==price){
            formdata.append("price",price);
        }
        if(oldwhatwillyoulearn!==whatwillyoulearn){
            formdata.append("whatwillyoulearn",whatwillyoulearn);
        }
        if(oldcategory!==category){
            formdata.append("category",category);
        }
        if(JSON.stringify(oldtags)!==JSON.stringify(tags)){
            formdata.append("tags",JSON.stringify(tags));
        }
        if(oldthumbnail!==thumbnail){
            formdata.append("thumbnail",thumbnail);
        }
        if(JSON.stringify(oldrequirements)!==JSON.stringify(requirements)){
            formdata.append("requirements",JSON.stringify(requirements));
        }
        const result=await apiConnector("POST",course.updatecourseurl,formdata,{
            Authorization:`Bearer ${token}`
        })
        if(result.status===200){
            toast.success("Course Updated Successfully")
             dispatch(set_coursedata({...result?.data?.updatedcourse}));
            //  console.log({...result?.data?.updatedcourse});
            dispatch(set_step(2));
        }
    }catch(err){
      console.log(err);
      toast.error(err.response.data.Message)
    }
    toast.dismiss(loadingtoast);
    dispatch(set_loading(false));   
 }
 function editdatahandler(){
    const {title,description,language,price,whatwillyoulearn,category,tags,thumbnail,requirements}=getValues();
    const {title:oldtitle,description:olddescription,language:oldlanguage,price:oldprice,whatwillyoulearn:oldwhatwillyoulearn,category:oldcategory,tags:oldtags,thumbnail:oldthumbnail,requirements:oldrequirements}=coursedata;
    if(
        oldcategory!==category ||
        oldtitle!==title ||
        oldlanguage!==language ||
        olddescription!==description ||
        oldprice!==price ||
        oldwhatwillyoulearn!==whatwillyoulearn ||
        JSON.stringify(oldrequirements)!==JSON.stringify(requirements) ||
        oldthumbnail!==thumbnail ||
        JSON.stringify(oldtags)!==JSON.stringify(tags)
    ) {
        editcourse();
      
    }else{
        toast.error("No data changed to update")
    }

 }
  return (
    <div className=' flex flex-col gap-10 lg:p-10 p-2 rounded-lg bg-richblack-800 border-[2px] border-richblack-700'>
       
      <div className=" flex flex-col gap-1">
        <label htmlFor="title">Course Name<sup className=" text-pink-400">*</sup></label>
        <input type="text" id="title" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" placeholder="Enter Your Course Name" {
            ...register("title",{required:true})
        }></input>
        {
            errors.title && (
                <span className=" text-pink-300">Course name is required</span>
            )
        }
      </div>

      <div className=" flex flex-col gap-1">
        <label htmlFor="description">Course Short Description<sup className=" text-pink-400">*</sup></label>
        <textarea rows={5} type="text" id="description" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" placeholder="Enter Your Course Description" {
            ...register("description",{required:true})
        }></textarea>
        {
            errors.description && (
                <span className=" text-pink-300">Course description is required</span>
            )
        }
      </div>
      
     
      <div className=" flex flex-col gap-1">
        <label htmlFor="title">Course Price<sup className=" text-pink-400">*</sup></label>
          <div className=" flex items-center gap-3    p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg">
            <HiOutlineCurrencyRupee size={30} className=" text-pure-greys-300" />
            <input type="number" placeholder="Enter Your Course Price" className=" bg-transparent border-none outline-none w-full" {
                ...register("price",{required:{value:true,message:"Course price is required"},min:{value:99,message:"Course price should be more than 99"},max:{value:4999,message:"Maximum course price can be 5999"}})
            }></input>
          </div>
          {
                errors.price && (
                    <span className=" text-pink-300">{errors.price.message}</span>
                )
            }
      </div>

      <div className=" flex flex-col gap-1">
        <label htmlFor="language">Course language<sup className=" text-pink-300">*</sup></label>
        <select  className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" id="language" {
            ...register("language",{required:true})
        }>
            <option  disabled={true} selected >Choose Your language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Odia">Odia</option>
        </select>
        {
            errors.language && (
                <span className=" text-pink-300">Choose A language</span>
            )
        }
      </div>


      <div className=" flex flex-col gap-1">
        <label htmlFor="category">Course Category<sup className=" text-pink-300">*</sup></label>
        <select  className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" id="category" {
            ...register("category",{required:true})
        }>
            <option disabled={true} selected >Choose Your Category</option>
            {
                categories.map((data,index)=>{
                    return <option value={data?.name} key={index}>{data?.name}</option>
                })
            }
        </select>
        {
            errors.category && (
                <span className=" text-pink-300">Choose A Category</span>
            )
        }
      </div>
     <TagsInput setValue={setValue} register={register} errors={errors} coursedata={coursedata} editmode={editmode}/>
     <ImageInput register={register} errors={errors} coursedata={coursedata} editmode={editmode} setValue={setValue} />

      <div className=" flex flex-col gap-1">
        <label htmlFor="whatwillyoulearn">Benefits of the course <sup className=" text-pink-400">*</sup></label>
        <textarea rows={5} type="text" id="whatwillyoulearn" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" placeholder="Enter Benifits Of The Course" {
            ...register("whatwillyoulearn",{required:{value:true,message:"Course benifit is required"}})
        }></textarea>
        {
            errors.whatwillyoulearn && (
                <span className=" text-pink-300">{errors.whatwillyoulearn.message}</span>
            )
        }
      </div>

       <RequirementsInput register={register} errors={errors} coursedata={coursedata} editmode={editmode} setValue={setValue}/>
        
       <div className=" flex justify-end">
         {
            !editmode && (
                <button onClick={handleSubmit(createcourse)} className=" flex gap-1 items-center p-3 bg-yellow-100 rounded-md text-richblack-900 text-lg ">Next<GrFormNext/></button>
            )
         }
         {
            editmode && (
               <div className=" flex gap-4 items-center">
                <button onClick={()=>dispatch(set_step(2))} className=" bg-richblack-400 p-3 rounded-lg">Continue Without Saving</button>
                <button onClick={editdatahandler} className=" bg-yellow-100 text-richblack-900 p-3 rounded-xl">Save Changes</button>
               </div>
            )
         }
       </div>
    </div>
  
  )
}

export default CourseInformation