import Rating from "../Course/Rating";
function Ratingcard({course,rating,review,user}) {
    // console.log(course,rating,review,user);
  return (
    <div className=" flex flex-col h-[200px] gap-4 p-3 bg-richblack-800 rounded-md text-white">
        <div className=" flex gap-2 items-center">
        <img className=" h-[50px] w-[50px] rounded-full" src={user?.profilephoto} alt="userlogo"></img>
        <div className=" flex flex-col ">
            <h1 className=" text-lg font-semibold">{user?.firstname} {user?.lastname}</h1>
            <p className=" text-pure-greys-200">{user?.email}</p>
        </div>
        </div>
            <p className=" text-pure-greys-200">{course?.title}</p>
            <p>{review}</p>
            <Rating rating={rating} numberofratings={5}/>
        
    </div>
  )
}

export default Ratingcard;