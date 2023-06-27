import { useDispatch, useSelector } from "react-redux"
import Cartitem from "../Components/Cart/Cartitem";
import { capturepayment } from "../services/paymentservices";
import { useNavigate } from "react-router";
import { reset_cart } from "../redux/slices/cart";
function Cart() {
  const {cartitems}=useSelector((state)=>state.cart);
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  // console.log(cartitems);
  const totalCoast = cartitems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
  // console.log(totalCoast);

  async function checkouthandler(){
    const courses=[];
    for(const course of cartitems){
      courses.push(course._id);
    }
    const result=await capturepayment(courses,token,{firstName:user.firstname,email:user.email},navigate,dispatch);
    if(result){
      dispatch(reset_cart());
    }
  }
  return (
         <div className="font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10  lg:p-10 p-2     text-white">
          <h1 className=" font-bold text-3xl">Cart</h1>
          <div className=" opacity-50 border-b-[1px] pb-3">
              <p>{cartitems.length} Courses in Cart</p>
          </div>
             {
              cartitems.length>0?<div className=" flex flex-col gap-6  lg:flex-row lg:gap-0  lg:justify-between">
              <div className=" flex flex-col lg:w-[75%] bg-yellow-800  gap-5">
              {
              cartitems.map((data,index)=>{
                return <Cartitem key={index} {...data}></Cartitem>
              })
             }
              </div>
              <div className=" flex flex-col gap-2 p-6 rounded-md bg-richblack-800 h-fit ">
                <p className=" text-pure-greys-100">Total:</p>
                <p className=" text-3xl font-inter font-bold">₹ {totalCoast}</p>
                <button onClick={checkouthandler} className=" p-2 bg-yellow-50 text-richblack-900 font-bold rounded-lg">Proceed To Checkout</button>
              </div>
           </div>:<p className="  text-3xl font-bold text-center text-white">Your Cart Is Empty</p>
             }
        </div>
  )
}

export default Cart



