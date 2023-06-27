import {RxCross2} from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {MdCloudUpload} from "react-icons/md"
import { useForm } from "react-hook-form";
import { set_subsectiondata, set_subsectioneditmode } from "../../redux/slices/course";
import { toast } from "react-hot-toast";
function SubsectionForm({seshowsubsectionform,addsubsection,updatesubsection}) {
    const {
       register,
       setValue,
       formState:{errors,isSubmitSuccessful},
       handleSubmit,
       reset,
       getValues
    }=useForm();
    const {subsectioneditmode}=useSelector((state)=>state.course)
    const {subsectiondata}=useSelector((state)=>state.course);
    const [video,setvideo]=useState(null);
    const dispatch=useDispatch();
    function mediahandler(e){
        const file = e.target.files[0];
        setValue("video",file);
        const reader = new FileReader();
    
        reader.onload = () => {
          setvideo(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
    }

    function savehandler(){
      const {video,subsectionname,description}=getValues();
      const formdata=new  FormData;
      formdata.append("video",video);
      formdata.append("subsectionname",subsectionname);
      formdata.append("description",description);
      addsubsection(formdata);
    }

    function editsubsction(){
        const {video,subsectionname,description}=getValues();
        const {_id,videourl:oldvideo,subsectionname:oldsubsectionname,description:olddescription}=subsectiondata;
        const formdata=new FormData();
        if(video!==oldvideo){
            formdata.append("video",video);
        }
        if(subsectionname!==oldsubsectionname){
            formdata.append("subsectionname",subsectionname);
        }
        if(description!==olddescription){
         formdata.append("description",description);
        }
        formdata.append("subsectionid",_id);
        updatesubsection(formdata,_id);

    }

    function edithandler(){
        const {video,subsectionname,description}=getValues();
        const {videourl:oldvideo,subsectionname:oldsubsectionname,description:olddescription}=subsectiondata;
        if(
            subsectionname!==oldsubsectionname ||
            olddescription!==description ||
            oldvideo!==video
        ){
            editsubsction();
        }else{
            toast.error("No dats changed to update")
        }

    }

    // useEffect(()=>{
    //     if(isSubmitSuccessful){
    //         setvideo(null);
    //      reset({
    //          video:null,
    //          subsectionname:"",
    //          description:""
 
    //      })
    //     }
    //  },[isSubmitSuccessful])
     useEffect(()=>{
      if(subsectioneditmode){
      const {subsectionname,description,videourl}=subsectiondata;
      setvideo(videourl);    
      setValue("subsectionname",subsectionname);
      setValue("description",description);
      setValue("video",videourl);
      }
     },[subsectioneditmode])

     function canceledit(){
        seshowsubsectionform(false);
        dispatch(set_subsectioneditmode(false));
        dispatch(set_subsectiondata(null))
     }
     function durationcount(e){
        // console.log(e.target.duration);
     }
  return (
    <div className="  text-white flex flex-col justify-center items-center absolute z-40 top-0 right-0 left-0 bottom-0 h-screen  bg-richblack-900 bg-opacity-5 backdrop-blur-sm ">
       <div className=" subsectionform h-[100vh] overflow-y-auto  lg:w-[50vw] flex flex-col  rounded-lg border-[1px] border-richblack-500 bg-richblack-900">
             <div className=" bg-richblack-800 p-6 flex justify-between ">
                <h1 className=" text-2xl font-semibold">{subsectioneditmode?"Edit the Lecture":"Adding Lecture"}</h1>
                <button onClick={()=>seshowsubsectionform(false)}><RxCross2 size={30}/></button>
             </div>
            
            <form>
                <div className=" flex flex-col gap-7 lg:p-10 p-2">
                   
         <div className=" flex flex-col gap-1">
        <p>Course Video<sup className=" text-pink-300">*</sup></p>
         {
            video?(<div className=" border-2 rounded-md border-dashed  p-10 bg-richblack-700 flex flex-col gap-4 items-center">
                   <div>
                     <video onLoadedMetadata={durationcount} className=" h-[300px] w-[350px] rounded-lg" src={video} alt="coursethumbanil" controls></video>
                   </div>
                   <div>
                       <button className=" text-pure-greys-200 border-b-2 pb-2" onClick={()=>setvideo(null)}>Cancel</button>
                   </div>
            </div>):(<> <label htmlFor="video">
            <div className="  cursor-pointer flex flex-col gap-8 items-center p-10  text-pure-greys-300 bg-richblack-700 cur border-[2px] border-dashed rounded-md">
                <div className="  p-4 rounded-full text-yellow-50 bg-richblack-900">
                    <MdCloudUpload size={45}/>
                </div>
                <div>
                    <p className=" text-center">Drag and drop an video, or <br></br>click to <span className=" text-yellow-100">Browse</span> a file</p>
                </div>
                <div className=" w-full flex  justify-around">
                    <li className=" text-center">Aspect ratio 16:9</li>
                    <li className=" text-center">Recommended size 1024x576</li>
                </div>
            </div>
        </label>
        <input id="video" type="file" accept=".mp4" className=" hidden" {
            ...register("video",{required:true})
        } onChange={mediahandler}></input>
        {
            errors.video && (
                <span className=" text-pink-300">Please Upload A Video</span>
            )
        }</>)
         }
       </div>
       <div className=" flex flex-col gap-1">
        <label htmlFor="subsectionname">Subsection Name<sup className=" text-pink-400">*</sup></label>
        <input type="text" id="subsectionname" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" placeholder="Enter Your Course Name" {
            ...register("subsectionname",{required:true})
        }></input>
        {
            errors.subsectionname && (
                <span className=" text-pink-300">Subsection  name is required</span>
            )
        }
      </div>
        
      <div className=" flex flex-col gap-1">
        <label htmlFor="description">Subsection Short Description<sup className=" text-pink-400">*</sup></label>
        <textarea rows={5} type="text" id="description" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none" placeholder="Enter Your Course Description" {
            ...register("description",{required:true})
        }></textarea>
        {
            errors.description && (
                <span className=" text-pink-300">Subsection description is required</span>
            )
        }
      </div> 
        
        <div>
             {
                subsectioneditmode?<div className=" flex gap-3 justify-end"><button onClick={handleSubmit(edithandler)} className=" p-2 rounded-lg bg-yellow-200 text-black">Save Changs</button><button onClick={canceledit} className=" p-2 rounded-lg bg-richblack-200 text-black">Cancel Edit</button></div>:<button onClick={handleSubmit(savehandler)} className=" p-2 rounded-lg bg-yellow-200 text-black">Save</button>
             }
        </div>

         </div>
            </form>
             
       </div>
    </div>
  )
}

export default SubsectionForm;