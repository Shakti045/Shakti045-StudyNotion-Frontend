import { Link, useNavigate } from "react-router-dom"
import Img from "../common/LazyLoadImage"
import { useDispatch, useSelector } from "react-redux"
import { addto_cart } from "../../redux/slices/cart";
import { toast } from "react-toastify";
import { capturepayment } from "../../services/paymentservices";
function DashboardCoursecard({_id,description,price,category,instructor,thumbnail,title,studentsenrolled,ratingsandreview}) {
  const {user}=useSelector((state)=>state.user); 
  const {cartitems}=useSelector((state)=>state.cart);
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function addtocathandler(){
    if(cartitems.findIndex((e)=>e._id===_id)>-1){
      toast.error("Item is alredy in cart");
      return;
    }
    dispatch(addto_cart({_id:_id,thumbnail:thumbnail,price:price,rating:ratingsandreview,title:title,category:category?.name}))
 }
 function buynowhandler(){
   capturepayment([_id],token,user,navigate,dispatch);
 }
  return (
      <div className=" border-[1px] border-richblack-700 p-5 flex lg:flex-row flex-col justify-between items-start w-full">
         <Link to={`/course/${_id}`}>
         <div className=" flex lg:flex-row flex-col gap-5 lg:min-w-[70%] lg:max-w-[70%">
         <div>
         <Img src={thumbnail} className={" lg:h-[200px] h-[250px] lg:w-[300px] w-[85vw] rounded-md"}></Img>
         </div>
        <div className="   flex flex-col gap-2 lg:gap-0 lg:justify-between">
            <p className=" text-xl font-bold"> {title}</p>
            <p className=" text-lg font-semibold">#{category.name}</p>
            <p className=" truncate">{description}</p>
            <p>Total Students:{studentsenrolled.length}</p>
            <p>Rs.{price}</p>
        </div>
        </div>
         </Link>
         <div className=" lg:w-[30%] lg:bg-richblack-700  lg:p-4 rounded-md  flex flex-col gap-5">
         <div  className=" mt-2 lg:mt-0  flex gap-2 items-center">
           <img className=" h-[50px] w-[50px] rounded-md" src={instructor.profilephoto}></img>
           <div className=" flex flex-col gap-2">
          <p>{instructor.firstname}  {instructor.lastname}</p>
          <p>{instructor.email}</p>
           </div>
        </div>
         <div className="  flex lg:flex-col gap-3">
           {
            studentsenrolled.indexOf(user?._id)===-1?(<><button onClick={addtocathandler} className=" p-2 rounded-md bg-pure-greys-200  text-black font-semibold">Add To Cart</button>
            <button  onClick={buynowhandler} className=" p-2 rounded-md bg-yellow-100 text-black font-semibold">Buy Now</button></>):(<>
              <button onClick={()=>navigate(`/enrolled-courses/${_id}`)} className=" p-2 rounded-md bg-pure-greys-200  text-black font-semibold">Go To Your Course</button>
              <button onClick={()=>navigate(`/enrolled-courses/${_id}`)} className=" p-2 rounded-md bg-pure-greys-200  text-black font-semibold">Add Review To Course</button>
            </>)
           }
         </div>
         </div>
    </div>
   
  )
}

export default DashboardCoursecard;