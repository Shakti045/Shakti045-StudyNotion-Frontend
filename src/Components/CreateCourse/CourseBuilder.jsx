import { useDispatch, useSelector } from "react-redux"
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/api";
import { section } from "../../services/url";
import { set_coursedata, set_editmode, set_sectiononeditmode, set_step } from "../../redux/slices/course";
// import { useState } from "react";
import Section from "./Section";
// import SubsectionForm from "./SubsectionForm";
function CourseBuilder() {
  const {coursedata}=useSelector((state)=>state.course);
  const courseid=coursedata._id;
  const {token}=useSelector((state)=>state.auth);
  const {sectiondata}=useSelector((state)=>state.course);
  const {sectioneditmode}=useSelector((state)=>state.course);
  // const {editmode}=useSelector((state)=>state.course);
  // const [sections,setsections]=useState([]);
  const dispatch=useDispatch();
  const {
     handleSubmit,
     register,
     formState:{errors,isSubmitSuccessful},
     reset,
     setValue,
     getValues
  }=useForm();
  useEffect(()=>{
    if(sectioneditmode){
       setValue("sectionname",sectiondata.sectionname);
    }
  },[sectioneditmode,sectiondata]);
  // useEffect(()=>{
  //   if(editmode){
  //     // console.log(coursedata?.sections);
  //     setsections(coursedata?.sections)
  //   }
  // },[]);
  async function sectionhandler(data){
      const loadingtoast=toast.loading("Please Wait......")
     try{
       const result=await apiConnector("POST",section.addsectionurl,{courseid:courseid,...data},{
        Authorization:`Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
       });
       if(result.status===200){
        //  setsections([...sections,result.data?.section])
         dispatch(set_coursedata({...coursedata,sections:[...coursedata?.sections,result.data?.section]}));
         toast.success("Section Created Successfully")
       }
     }catch(err){
      console.log("Error while creating section","=>",err);
      toast.error(err.response.data.Message)
     }
     toast.dismiss(loadingtoast);
  }
  function editcancel(){
    dispatch(set_sectiononeditmode(false))
    setValue("sectionname","");
  }
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        sectionname:""
      })
    }
  },[isSubmitSuccessful])

  async function deletesection(id,index){
    const loadingtoast=toast.loading("Please Wait......")
    try{
      const result=await apiConnector("POST",section.deletesectionurl,{sectionid:id},{
       Authorization:`Bearer ${token}`
      });
      if(result.status===200){
        const updatedsection=[...coursedata?.sections];
        updatedsection.splice(index,1);
        // setsections(updatedsection);
        dispatch(set_coursedata({...coursedata,sections:updatedsection}))
        toast.success("Section deleted Successfully")
      }
    }catch(err){
     console.log("Error while deleting section","=>",err);
     toast.error(err.response.data.Message)
    }
    toast.dismiss(loadingtoast);
  }

  async function updatesection(id,index){
    const loadingtoast=toast.loading("Please Wait......")
    const {sectionname}=getValues();
    try{
      const result=await apiConnector("POST",section.updatesectionurl,{sectionid:id,sectionname:sectionname},{
       Authorization:`Bearer ${token}`
      });
      if(result.status===200){
        const updatedsection=[...coursedata?.sections];
        updatedsection[index]=result.data?.section;
        dispatch(set_coursedata({...coursedata,sections:updatedsection}))
        // setsections(updatedsection);
        setValue("sectionname","");
        dispatch(set_sectiononeditmode(false));
        toast.success("Section Updated Successfully")
      }
    }catch(err){
     console.log("Error while Updating section","=>",err);
     toast.error(err.response.data.Message)
    }
    toast.dismiss(loadingtoast);
  }

  function edithandler(){
    const {sectionname}=getValues();
    if(sectiondata.sectionname===sectionname){

      return toast.error("Kindly change any data to update")
    }
    updatesection(sectiondata.id,sectiondata.index);
  }
  function nexthandler(){
    if(coursedata?.sections.length===0){
      return toast.error("Please add  one section to proceed")
    }else{
      dispatch(set_step(3))
    }
  }

  function backhandler(){
    dispatch(set_editmode(true));
    dispatch(set_step(1));
  }
  return (
    <div className=" flex flex-col gap-9 lg:p-10 p-2 bg-richblack-800 text-white rounded-lg border-[2px] border-richblack-700">
        <h1 className=" text-2xl font-semibold">Course Builder</h1>
          <div className=" flex flex-col gap-2">
              <label htmlFor="sectionname">Section Name<sup className=" text-pink-300">*</sup></label>
              <input type="text" id="sectionname" placeholder="Add section to build your course" className=" bg-richblack-700 p-3 rounded-md border-b-[2px] border-richblack-600" {
                ...register("sectionname",{required:true})
              }></input>
              {
                errors.sectionname && (
                  <span className=" text-pink-400">Section name is required</span>
                )
              }
             {
                !sectioneditmode && (<button onClick={handleSubmit(sectionhandler)} className=" flex  items-center gap-3 text-lg text-yellow-100 p-2 font-bold rounded-md border-[1.5px] border-yellow-100 w-fit">Create Section <AiOutlinePlusCircle /></button>)
             }
             {
              sectioneditmode && (<div className=" flex gap-4 items-end">
                <button onClick={edithandler} className=" flex  items-center gap-3 text-lg text-yellow-100 p-2 font-bold rounded-md border-[1.5px] border-yellow-100 w-fit">Edit Section Name<AiOutlinePlusCircle /></button>
                <p onClick={editcancel} className=" h-fit cursor-pointer text-pure-greys-300 border-b-2">Cancel Edit</p>
              </div>)
             }
          </div>
   
        <div className={`flex flex-col  lg:px-24 bg-richblack-700 ${coursedata?.sections.length===0?"py-0":"py-10"} rounded-lg  gap-10 text-xl`}>
            {
              coursedata?.sections.map((data,index)=>{
                return <Section key={index} deletesection={deletesection} index={index} {...data}/>
              })
            }
        </div>
         <div className=" flex gap-3 justify-end">
          <button onClick={backhandler} className=" p-3 px-5 rounded-lg bg-richblack-500">Back</button>
          <button onClick={nexthandler} className=" p-3 px-5 rounded-lg bg-yellow-100 text-black">Next</button>
         </div>
    </div>
  )
}

export default CourseBuilder