import { useState } from 'react'
import Higlightedext from './Higlightedext'
import {HomePageExplore} from "../../data/homepage-explore"
import Coursecards from './Coursecards'
 const tabs={
    "Free":0,
    "New To Coding":1,
    "Most popular":2,
    "Skills paths":3,
    "Career paths":4
 }

function Coursetabs() {
const [currenttab,setcurrenttab]=useState("Free")
const [currentcourses,setcurrentcourses]=useState(HomePageExplore[0].courses)
function changetab(value){
    setcurrenttab(value);
    setcurrentcourses(HomePageExplore[tabs[value]].courses);
}
  return (
    <div className=' mt-12 w-11/12  flex flex-col items-center gap-4'>.

        <div className=' flex flex-col gap-3'>
       <p className=' text-4xl'>Unlock the <Higlightedext>Power of Code</Higlightedext></p>
       <p className=' text-lg text-center opacity-60'>Learn to Build Anything You Can Imagine</p>
        </div>
       
       <div className=' border-b-2 border-blue-300 lg:flex grid grid-cols-2 lg:gap-10 px-5 lg:px-10 py-1 bg-richblack-800 rounded-3xl'>
         {
            Object.keys(tabs).map((element,index)=>{
                return <button onClick={()=>changetab(element)} className={`  ${currenttab===element?"bg-black py-3 px-6 rounded-3xl":"py-3 px-6 rounded-3xl"} hover:bg-black`} key={index}>{element}</button>
            })
         }
       </div>
       <Coursecards currentcourses={currentcourses}></Coursecards>
    </div>
  )
}

export default Coursetabs