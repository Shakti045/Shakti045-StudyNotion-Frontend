import { useEffect } from "react";
import { useState } from "react";
import {MdCloudUpload} from "react-icons/md"
function ImageInput({register,errors,coursedata,editmode,setValue}) {
    const [image,setimage]=useState(null);
    function mediahandler(e){
        const file = e.target.files[0];
        setValue("thumbnail",file);
        const reader = new FileReader();
    
        reader.onload = () => {
          setimage(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
    }
    useEffect(()=>{
        if(editmode){
            const {thumbnail}=coursedata;
            setimage(thumbnail);
        }
    },[]);
  return (
    <div className=" flex flex-col gap-1">
        <p>Course Thumbnail<sup className=" text-pink-300">*</sup></p>
         {
            image?(<div className=" border-2 rounded-md border-dashed  p-10 bg-richblack-700 flex flex-col gap-4 items-center">
                   <div>
                     <img className=" h-[300px] w-[350px] rounded-lg" src={image} alt="coursethumbanil"></img>
                   </div>
                   <div>
                       <button className=" text-pure-greys-200 border-b-2 pb-2" onClick={()=>setimage(null)}>Cancel</button>
                   </div>
            </div>):(<> <label htmlFor="thumbnail">
            <div className="  cursor-pointer flex flex-col gap-8 items-center p-10  text-pure-greys-300 bg-richblack-700 cur border-[2px] border-dashed rounded-md">
                <div className="  p-4 rounded-full text-yellow-50 bg-richblack-900">
                    <MdCloudUpload size={45}/>
                </div>
                <div>
                    <p className=" text-center">Drag and drop an image, or <br></br>click to <span className=" text-yellow-100">Browse</span> a file</p>
                </div>
                <div className=" w-full flex  justify-around">
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                </div>
            </div>
        </label>
        <input id="thumbnail" type="file" accept=".jpg ,.jpeg, .svg,.gif,.webp" className=" hidden" {
            ...register("thumbnail",{required:true})
        } onChange={mediahandler}></input>
        {
            errors.thumbnail && (
                <span className=" text-pink-300">Please Upload A Thumbnail</span>
            )
        }</>)
         }
    </div>
  )
}

export default ImageInput;