function Deletecoursemodal({setshowmodal,deletecourse}) {
  return (
    <div className=" absolute top-0 bottom-0 left-0 right-0 z-40 w-[100vw] h-[100vh] bg-opacity-80 bg-richblack-700 flex flex-col items-center justify-center">
      <div className=" flex flex-col gap-4 p-8 rounded-md border-[1px] border-richblack-600 bg-richblack-800 lg:w-[350px] w-[95vw] md:w-[350px] ">
        <h1 className=" text-3xl font-semibold">Do you want to delete this course?</h1>
        <p className=" text-pure-greys-200">All the data related to this course will be deleted</p>
        <div className=" flex items-center gap-4">
            <button onClick={()=>{deletecourse()}} className=" p-2 rounded-md bg-yellow-200 text-black font-bold">Delete</button>
            <button onClick={()=>setshowmodal(false)} className=" p-2 rounded-md bg-pure-greys-100 text-black font-bold">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Deletecoursemodal;