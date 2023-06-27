import { useEffect } from "react";
import { useState } from "react"

function RequirementsInput({register,errors,coursedata,editmode,setValue}) {
    const [requirements,setrequirements]=useState([]);
    const [requirement,setrequirement]=useState("");
    function deleterequirement(index){
      const updatedreqs=[...requirements];
      updatedreqs.splice(index,1);
      setrequirements(updatedreqs);
    }
     function addreq(){
       if(requirement){
        setrequirements([...requirements,requirement])
        setrequirement("");
       }
     }
     const validatereq=(data)=>{
      if(data.length===0){
        return "Requirement(s)/Instruction(s) is/are required"
      }
      return true;
     }
     useEffect(()=>{
      register("requirements",{validate:validatereq});
      setValue("requirements",[]);
      if(editmode){
        const {requirements}=coursedata;
        setrequirements(requirements)
      }
     },[]);
     useEffect(()=>{
      setValue("requirements",requirements);
     },[requirements])
  return (
    <div className=" flex flex-col gap-2">
      <label htmlFor="requirements">Requirement(s)/Instruction(s)</label>
      <textarea value={requirement} onChange={(e)=>setrequirement(e.target.value)} rows={5} type="text"  className=" p-2 bg-richblack-700 rounded-md border-b-[2px] text-lg outline-none"  placeholder="Enter requirement and instructions for the course and click add below to add" 
        ></textarea>
       <div>
       <button  onClick={addreq} className=" text-yellow-50">add+</button>
       </div>
       {
        errors.requirements && (
          <span className=" text-pink-300">{errors.requirements.message}</span>
        )
       }
        <ul className=" flex flex-col gap-2">
          {
            requirements.map((data,index)=>(
              <li className=" flex gap-2 items-center" key={index}>
                <p>{data}</p>
                <button className=" text-pure-greys-200 text-sm" onClick={()=>deleterequirement(index)}>Clear</button>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default RequirementsInput