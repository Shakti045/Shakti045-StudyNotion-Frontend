import { useEffect, useState } from "react";
import {RxCross2} from "react-icons/rx";
function TagsInput({register,errors,coursedata,editmode,setValue}) {
    const [tags,settags]=useState([]);
    const [tag,settag]=useState("");
const validatetags=(tags)=>{
  if(tags.length===0){
    return "Tag(s) is/are required"
  }
  return true;
}
    useEffect(()=>{
      register("tags",{validate:validatetags})
      setValue("tags",tags);
      if(editmode){
        const {tags}=coursedata;
        settags(tags);
      }
    },[])
    useEffect(()=>{
      setValue("tags",tags);
    },[tags])
    function addtag(){
      settags([...tags,tag])
      settag("");
    }
    window.onkeyup=(e)=>{
      e.preventDefault();
      if(e.keyCode===13 && tag){
        addtag();
      }
    }

    function deletetag(index){
      const updatedtags=[...tags];
      updatedtags.splice(index,1);
      settags(updatedtags);
    }

  return (
    <div className=" flex flex-col gap-1">
      <label htmlFor="tags">Tags<sup className=" text-pink-400">*</sup></label>
      <div className=" flex gap-2 flex-wrap items-center">
      {
        tags.map((data,index)=>{
            return <div className="  flex  items-center gap-2 bg-yellow-100 text-richblack-900 font-bold rounded-md p-2" key={index}>
              <p>#{data}</p>
              <button onClick={()=>deletetag(index)}><RxCross2/></button>
            </div>
        })
       }
      </div>
      <input value={tag} onChange={(e)=>settag(e.target.value)} type="text" id="tags" className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none"  placeholder="Enter Tags And Press Enter" 
        ></input>
        {
          errors.tags && (
            <span className=" text-pink-300">{errors.tags.message}</span>
          )
        }
    </div>
  )
}

export default TagsInput;