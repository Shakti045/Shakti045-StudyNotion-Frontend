import Review from "./Review"
import Sections from "./Sections";
function CourseBar({sectiondata,courseid,coursetitle}) {
  return (
        <div className=" flex flex-col h-full w-full bg-richblack-800 ">
        <Review courseid={courseid}/>
         <div className=" p-4 border-b-[1px] border-pure-greys-300">
            <h1 className=" text-xl font-bold">{coursetitle}</h1>
            <h1 className=" text-lg text-pure-greys-300">{`${0}/${sectiondata.length}`}</h1>
         </div>
         <div className=" flex flex-col gap-3 mt-3">
            {
                sectiondata.map((data,index)=>{
                    return (<Sections key={index} {...data}></Sections>)
                })
            }
         </div>
     </div>
  )
}

export default CourseBar;