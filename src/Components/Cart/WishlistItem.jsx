import Img from "../common/LazyLoadImage";
import {AiFillDelete} from "react-icons/ai"
import { useDispatch } from "react-redux";
import Rating from "../Course/Rating";
import { addto_cart } from "../../redux/slices/cart";
import defaulcoursethumbnail from "../../assets/Images/defaultcourse.webp"
import {BsCart2} from "react-icons/bs";
import {  remove_from_wishlist } from "../../redux/slices/wishlist";
function WishlistItem({category,_id,price,rating,thumbnail,title}) {
    const dispatch=useDispatch();
    function removehandler(){
         dispatch(remove_from_wishlist(_id));
    }

    function carthandler(){
         dispatch(addto_cart({category:category,_id:_id,price:price,rating:rating,thumbnail:thumbnail,title:title}));
         removehandler(_id);
    }
  return (
    <div className=" w-full   transition-transform hover:scale-[1.02] duration-700 p-2 bg-richblack-800 border-b-4 rounded-lg flex lg:flex-row flex-col gap-6 ">
        <div className=" min-w-fit ">
            <Img src={thumbnail?thumbnail:defaulcoursethumbnail} className={"lg:h-[200px] h-[250px] lg:w-[300px] w-[90vw] rounded-lg"}></Img>
        </div>
      <div className=" lg:w-[50%] flex flex-col gap-2 lg:gap-0   lg:justify-around">
      <p className=" truncate text-2xl font-semibold">{title}</p>
        <p className=" text-pure-greys-200">{category}</p>
        <Rating></Rating>
         <div className=" flex  items-center gap-2">
                <div onClick={removehandler} className=" cursor-pointer flex gap-1 text-lg p-2 items-center rounded-md bg-richblack-700 text-pink-300">
                    <AiFillDelete/>
                    <p>Remove</p>
                </div>
                <div onClick={carthandler} className=" w-fit cursor-pointer flex gap-1 text-lg p-2 items-center rounded-md bg-richblack-700 text-pink-300">
                    <BsCart2/>
                    <p>Add To Cart</p>
                </div>
               
            </div>
               <div>
                    <p className=" text-2xl text-yellow-100">₹ {price}</p>
                </div>
      </div>
    </div>
  )
}

export default WishlistItem;