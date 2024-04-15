import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaShoppingCart} from "react-icons/fa";
import {FiMenu} from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import ProfileDropdown from "../Home/ProfileDropdown";
import { apiConnector } from "../../services/api";
import { category } from "../../services/url";
import {FaArrowAltCircleDown} from "react-icons/fa"
import jwtdecode from "jwt-decode";
import { set_token } from "../../redux/slices/auth";
import { set_user } from "../../redux/slices/user";
import { toast } from "react-toastify";
function Nav() {
    const location=useLocation();
    const [bg,setbg]=useState(true);
    const [categories,setcategories]=useState([]);
    const [showmwnu,setshowmenu]=useState(false);
    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.user);
    const {cartitems}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    async function getcategories(){
       try{
        const {data}= await  apiConnector("GET",category.showAllCategoriesurl);
        setcategories(data?.Categories || []);
       }catch(err){
        console.log("Error while fetching all categories in nav.js","=>",err);
       }
    }
    function checktokenvalidity(){
      const decoded=jwtdecode(token);
        const exppirationtime=decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000)
         if(currentTime>exppirationtime){
            dispatch(set_token(null));
            dispatch(set_user(null));
            localStorage.clear();
            toast.error("Session expired kindly login")
         }
    }
    useEffect(()=>{
      getcategories();
      if(token){
        checktokenvalidity();
      }
    },[])
    useEffect(()=>{
        if(location.pathname!=="/"){
            setbg(false);
        }else{
            setbg(true);
        }
        if(showmwnu){
          setshowmenu(false);
        }
    },[location.pathname]);
  return (
   <>
    <div className={` hidden lg:flex justify-between px-8 p-4 h-14 border-richblack-700 border-b-[.5px]   items-center  ${bg===true?"bg-richblack-900 ":"bg-richblack-800"} text-white`}>
    <div>
   <Link to="/"><img src={logo} alt="logo"></img></Link>
    </div>
     <ul className=" flex gap-4 items-center text-lg">
        <li ><NavLink to="/">Home</NavLink></li>
        <li className=" cursor-pointer relative flex  gap-2 items-center group"><p>Catalog</p><p className=" relative top-[2px]"><FaArrowAltCircleDown/></p>
        <div className=" transition-all  duration-200 rounded-md invisible group-hover:visible  bg-richblack-5 w-[50px] h-[50px] translate-x-14 rotate-45 absolute top-[120%]">

        </div>
         <div className=" transition-all z-50 duration-200 invisible group-hover:visible  bg-richblack-5 p-4 w-[300px] rounded-lg absolute top-[150%] translate-x-[-100px] ">
         {
          categories.map((data,index)=>{
           return <Link key={index} to={`category/${data?._id}`}><p className=" p-3 text-richblack-900 rounded-lg hover:bg-richblack-100 font-semibold" >{data?.name}</p></Link>
          })
         }
         </div>
        </li>
        <li ><NavLink to="/about">About Us</NavLink></li>
        <li ><NavLink to="/contactus">Contact Us</NavLink></li>
     </ul>
    {
      token===null?  <div className=" flex gap-5">
      <Link to="/login"><button className=" border-[1px] border-richblack-700 py-2 px-3 rounded-lg bg-richblack-800">Log in</button></Link>
      <Link to="/signup"><button className=" border-[1px] border-richblack-700 py-2 px-3 rounded-lg bg-richblack-800">Signup</button></Link>
    </div>:<>
        {
          user?.role==="Instructor"?(<div>
           <ProfileDropdown/>
          </div>):(<div className=" text-lg flex items-center gap-5">
              <Link to="/dashboard/cart">
              <div className=" relative text-2xl text-yellow-200">
               <FaShoppingCart/>
               <div className=" text-white text-base absolute top-[-20px] right-[5px]">{cartitems.length>0 &&(
                cartitems.length
               )}</div>
               
            </div>
              </Link>
            <ProfileDropdown/>
          </div>)
        }
    </>
    }
    </div>
    
    <div className={`p-4 lg:hidden flex flex-col gap-4  border-richblack-700  border-b-[.5px]    ${bg===true?"bg-richblack-900 ":"bg-richblack-800"} text-white`}>
    <div className={` flex justify-between border-richblack-5 items-center } text-white`}>
    <div>
   <Link to="/"><img src={logo} className=" lg:w-fit w-[150px]" alt="logo"></img></Link>
    </div>
       {
        token?(<div className=" text-3xl">
          {/* <div onClick={()=>setshowmenu(!showmwnu)}><ProfileDropdown/></div> */}
        <FiMenu onClick={()=>setshowmenu(!showmwnu)}></FiMenu> 
      </div>):(<div className=" flex gap-5">
      <Link to="/login"><button className=" border-[1px] border-richblack-700 py-2 px-3 rounded-lg bg-richblack-800">Log in</button></Link>
      <Link to="/signup"><button className=" border-[1px] border-richblack-700 py-2 px-3 rounded-lg bg-richblack-800">Signup</button></Link>
    </div>)
       }
    </div>
         <div  className={` overflow-hidden flex flex-col gap-2   items-center bg-richblack-800 absolute top-[calc(3.5rem)] ${showmwnu?"h-[85vh]":"h-0"} transition-all duration-200 right-0 left-0 z-50`}>
          <div className=" mt-6">
              {
                token &&  (user?.role==="Instructor"?(<div>
                  <ProfileDropdown/>
                 </div>):(<div className=" text-lg flex lg:flex-row flex-col-reverse items-center gap-10">
                     <Link to="/dashboard/cart">
                     <div className=" relative text-2xl text-yellow-200">
                      <FaShoppingCart/>
                      <div className=" text-white text-base absolute top-[-20px] right-[5px]">{cartitems.length>0 &&(
                       cartitems.length
                      )}</div>
                      
                   </div>
                     </Link>
                   <ProfileDropdown/>
                 </div>))
              }
          </div>

          <ul className=" mt-8 flex flex-col gap-4 items-center text-lg">
        <li ><NavLink to="/">Home</NavLink></li>
        <li ><NavLink to="/dashboard/profile">Dashboard</NavLink></li>
        <li className=" cursor-pointer relative flex  gap-2 items-center group"><p>Catalog</p><p className=" relative top-[2px]"><FaArrowAltCircleDown/></p>
        <div className=" transition-all  duration-200 rounded-md invisible group-hover:visible  bg-richblack-5 w-[50px] h-[50px] translate-x-14 rotate-45 absolute top-[120%]">

        </div>
         <div className=" transition-all z-50 duration-200 invisible group-hover:visible  bg-richblack-5 p-4 w-[300px] rounded-lg absolute top-[150%] translate-x-[-100px] ">
         {
          categories.map((data,index)=>{
           return <Link key={index} to={`category/${data?._id}`}><p className=" p-3 text-richblack-900 rounded-lg hover:bg-richblack-100 font-semibold" >{data?.name}</p></Link>
          })
         }
         </div>
        </li>
        <li ><NavLink to="/about">About Us</NavLink></li>
        <li ><NavLink to="/contactus">Contact Us</NavLink></li>
     </ul>
         </div>
    </div>
   </>
  )
}

export default Nav;
