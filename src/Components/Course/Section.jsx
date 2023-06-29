import { useState } from "react";
import SectionWithSubsection from "./SectionWithSubsection";
function Section({sectiondata,duration="00h 00 min"}) {
   const [activelist,setactivelist]=useState([]);
   function activelisthandler(id){
    const index=activelist.indexOf(id);
     if(index>-1){
        const updatedlist=[...activelist];
        updatedlist.splice(index,1);
        setactivelist(updatedlist);
     }else{
      setactivelist([...activelist,id]);
     }
   }
    function calculatevideos(){
      let a=0;
      sectiondata.forEach((data)=>{
          a=a+data.subsections.length;
      })
      return a;
  }
  return (
    <div>
    <div className=" flex justify-between">
                 <p>{sectiondata.length} section(s) {calculatevideos()} lecture(s) {duration} total length</p>
                 <button onClick={()=>setactivelist([])}  className=" text-yellow-50">Collapse all sections</button>
  </div>
    <div className=" mt-7 border-[2px] border-richblack-700 flex flex-col">
    {
 sectiondata.map((data,index)=>{
   return <SectionWithSubsection activelisthandler={activelisthandler} activelist={activelist} key={index} {...data} />
 })
}
    </div>
</div>
  )
}

export default Section

