import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {TiTick} from "react-icons/ti"
function Rendersteps() {
    const data=[
        {
          id:1,
          step:"Course Information"
        },
        {
          id:2,
          step:"Course Builder"
        },
        {
          id:3,
          step:"Course Publish"
        }
      ]
      const {step}=useSelector((state)=>state.course);
      const dispatch=useDispatch();
  return (
    <div className=" flex flex-col gap-2  w-[80%] mx-auto">
        <div className=" w-full flex  gap-1">
        {
            data.map((element)=>(
                 <div key={element.id} className={`flex  items-center ${element.id<3?" w-[50%]":" w-fit"}`}>
                    <div  className={`stepdivs h-[40px] w-[40px] flex flex-col items-center justify-center  rounded-full ${step>element.id?" bg-yellow-100 text-caribbeangreen-200":" bg-richblack-700 text-white"}`} >
                   {
                    step>element.id?<TiTick size={25} className=" text-black"/>:element.id
                   }
                </div>
                   {
                    element.id!==3 && (<div className={`w-full border-b-[2px] ${element.id>=step?"border-richblack-300":" border-yellow-50"} border-dashed`}></div>)
                   }
                 </div>
            ))
        }
        </div>
        <div className=" flex justify-between">
              {
                data.map((element)=>{
                    return <p className={`${element.id===1 && " -translate-x-10"} ${element.id===3 && " translate-x-10"} ${element.id<step?" text-pure-greys-5":" text-pure-greys-300"}`} key={element.id}>{element.step}</p>
                })
              }
          </div>
    </div>
  )
}

export default Rendersteps;