import { useSelector } from "react-redux";
import WishlistItem from "../../Components/Cart/WishlistItem";
function Wishlist() {
    const {wishlistitems}=useSelector((state)=>state.wishlist)
    console.log(wishlistitems);
  return (
    <div className="font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10  lg:p-10 p-2     text-white">
    <h1 className=" font-bold text-3xl">Cart</h1>
    <div className=" opacity-50 border-b-[1px] pb-3">
        <p>{wishlistitems.length} Courses in Wishlist</p>
    </div>
       {
        wishlistitems.length>0?<div className=" flex  justify-between">
        <div className="  flex flex-col w-[100%] gap-5">
        {
        wishlistitems.map((data,index)=>{
          return <WishlistItem key={index} {...data}></WishlistItem>
        })
       }
     </div>
     </div>:<p className="  text-3xl font-bold text-center text-white">Your Wishlist Is Empty</p>
       }
  </div>
  )
}

export default Wishlist;





