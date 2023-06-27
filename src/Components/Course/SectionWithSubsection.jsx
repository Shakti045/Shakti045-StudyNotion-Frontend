import {BsChevronDown} from "react-icons/bs"
import {IoIosArrowUp} from "react-icons/io";
import { AiFillLock } from "react-icons/ai";
import {FiVideo} from "react-icons/fi"
function SectionWithSubsection({sectionname,subsections,activelisthandler,activelist,_id}) {
      return (
    <div className="">
     <div  onClick={()=>activelisthandler(_id)} className=" border-b-[1px]  border-richblack-600 flex gap-2 justify-between items-center p-8 text-xl font-semibold  bg-richblack-800  lg:cursor-pointer">
       <div  className=" flex gap-2 items-center">
                     {
                        activelist.indexOf(_id)>-1===true?<IoIosArrowUp/>:<BsChevronDown/>
                     }   
                    {sectionname}
                    </div>
                    <div>
                    <p className=" text-yellow-50">{subsections.length} lecture(s)</p>    
                    </div>
                    </div>

           <ul className={`${(activelist.indexOf(_id)>-1)?`h-[${subsections.length*50}px]`:" h-0"} overflow-hidden transition-all duration-700`}>
           {
            subsections.map((data,index)=>(
                    <li className={`  flex gap-2 justify-between items-center p-3   bg-richblack-900`} key={index}>
                         <p className=" flex gap-2 items-center">
                            <FiVideo/>{data?.subsectionname}
                         </p>
                         <AiFillLock/>
                    </li>
                ))
            
        }
          </ul>             
    </div>
  )
}

export default SectionWithSubsection;