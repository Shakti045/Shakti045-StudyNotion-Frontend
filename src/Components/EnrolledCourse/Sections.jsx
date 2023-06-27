import {FaArrowCircleUp} from "react-icons/fa"
import {AiFillCaretDown} from "react-icons/ai"
import Subsections from "./Subsections"
import { useState } from "react"
function Sections({_id,sectionname,subsections}) {
    // console.log(_id,sectionname,subsections);
    const [showsubsection,setshowsubsection]=useState(false);
  return (
    <div>
        <div onClick={()=>setshowsubsection(!showsubsection)} className=" items-center cursor-pointer flex p-3 bg-richblack-700 justify-between">
        <h1>{sectionname}</h1>
          {
            showsubsection===true?<AiFillCaretDown/>:<FaArrowCircleUp/>
          }
        </div>
        <div className={`${showsubsection===true?"":" hidden"}`}>
                 {
                  subsections.map((data,index)=>{
                    return (<Subsections key={index} {...data}></Subsections>)
                  })
                 }
            </div>
    </div>
  )
}

export default Sections