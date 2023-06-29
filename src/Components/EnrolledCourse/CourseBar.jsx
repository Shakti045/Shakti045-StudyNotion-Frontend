import { useLocation, useNavigate, useParams } from "react-router";
import Review from "./Review";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {IoMdArrowDropup,IoMdArrowDropdown} from "react-icons/io"
function CourseBar() {
    const {courseid,sectionid,subsectionid}=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const {currentcouredata,totalvideos,completedvideos}=useSelector((state)=>state.enrolledcourse);
    const [activesection,setactivesection]=useState([]); 
    const [activesubsection,setactivesubsection]=useState();
    function setactivesectionandsubsection(){
        setactivesection([sectionid]);
        setactivesubsection(subsectionid);
    } 
    function sectionclickhandler(id){
      const index=activesection.indexOf(id);
      if(index>=0){
        const updatedactivesection=[...activesection];
        updatedactivesection.splice(index,1);
        setactivesection(updatedactivesection);
      }else{
        if(activesection.includes(sectionid)){
            setactivesection([sectionid,id])
        }else{
            setactivesection([id])
        }
      }
    }
    function subsectionclickhandler(sid,subid){
        if(subid!==subsectionid){
            navigate(`/course/${currentcouredata._id}/section/${sid}/subsection/${subid}`)
        }
    }
    useEffect(()=>{
        setactivesectionandsubsection()
    },[courseid,sectionid,subsectionid,location.pathname])   
  return (
    <div className=" flex flex-col h-full bg-richblack-800 ">
        <div className=" w-full flex flex-col justify-between border-b-2 p-5 h-[30%] ">
         <Review courseid={courseid}/>
        <div >
        <h1 className=" text-white font-semibold text-xl">{currentcouredata?.title}</h1>
         <p><span>{completedvideos?.length}</span>/<span>{totalvideos}</span></p>
        </div>
        </div>

        <div className=" h-[70%] flex flex-col gap-3 w-full overflow-y-auto">
             {
                currentcouredata?.sections.map((data,index)=>(
                    <div  key={index} className=" lg:cursor-pointer flex flex-col ">
                         <div onClick={()=>sectionclickhandler(data._id)} className=" flex justify-between items-center bg-richblack-700 p-4">
                            <p className=" text-lg font-semibold">{data.sectionname}</p>
                            {
                                activesection.includes(data._id)?<IoMdArrowDropdown size={20}/>:<IoMdArrowDropup size={20}/>
                            }
                         </div>
                          {
                            activesection.includes(data._id)?(<div className=" flex flex-col  ">
                                {
                                     data.subsections.map((e,index)=>(
                                       <li onClick={()=>subsectionclickhandler(data._id,e._id)}  key={index} className={` hover:bg-richblue-400 lg:cursor-pointer p-2 border-b-2 border-pure-greys-500 text-richblack-900 font-semibold  ${activesubsection===e._id?" bg-yellow-200":"bg-pure-greys-300"} list-none flex gap-2 items-center`}>
                                         <input onChange={()=>{}} checked={completedvideos.includes(e._id)} type="checkbox"></input>
                                         <p>{e.subsectionname}</p>
                                       </li>
                                     ))
                                }
                            </div>):(<></>)
                          }
                    </div>
                ))
             }
        </div>
    </div>
  )
}

export default CourseBar;