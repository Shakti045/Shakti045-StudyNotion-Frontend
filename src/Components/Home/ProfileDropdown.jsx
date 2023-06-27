import { useSelector } from "react-redux"
import {AiOutlineCaretDown} from "react-icons/ai"
import {RiDashboard2Line} from "react-icons/ri"
import {BiLogOut} from "react-icons/bi"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_token } from "../../redux/slices/auth";
import { set_user } from "../../redux/slices/user";
import { toast } from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
const ProfileDropdown = () => {
    const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {user}=useSelector((state)=>state.user);
     function logouthandler(){
   dispatch(set_token(null));
   dispatch(set_user(null));
   localStorage.clear();
   toast.success("Logged Out")
   navigate("/");
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className=" relative">
      <button className=" flex gap-1 items-center" onClick={toggleDropdown}>
      <img alt="profileimage"   className=" rounded-full h-[30px] w-[30px]" src={user?.profilephoto}></img>
       <AiOutlineCaretDown ></AiOutlineCaretDown>
      </button>
      {isOpen && (
        <div  className={`flex flex-col    items-start text-xl gap-3 bg-richblack-700 text-pure-greys-5  absolute  top-[148%] right-0 translate-x-3 z-50   p-3 rounded-lg`}>
               <div className="   flex items-center gap-2">
                <RiDashboard2Line/>
                <Link to={`/dashboard/profile`}>Dashboard</Link>
               </div>
               <div className="  flex items-center gap-2">
                <BiLogOut/>
                <button onClick={logouthandler}>Log Out</button>
               </div>
                <div className="rounded-md  translate-y-[-12px]   bg-richblack-700 w-[30px] h-[30px] rotate-45 absolute top-[0%] right-2 z-10">
        
             </div>
             </div>
      )}
    </div>
  );
};

export default ProfileDropdown;





// function Profile() {
  // const {user}=useSelector((state)=>state.user);
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//   const [showmenu,setshowmenu]=useState(false);
//   const reference=useRef();
//   function logouthandler(){
//    dispatch(set_token(null));
//    dispatch(set_user(null));
//    localStorage.clear();
//    toast.success("Logged Out")
//    navigate("/");
//   }
//   document.onclick=(e)=>{
    
//     if(showmenu){
//       if(e.target!==reference.current ){
//          setshowmenu(false);
//       }
//     }
//    }
//   return (
//     <div     className="  cursor-pointer relative flex items-center gap-2 text-sm">
//       <img ref={reference} onClick={()=>setshowmenu(!showmenu)} alt="profileimage"   className=" rounded-full h-[30px] w-[30px]" src={user?.profilephoto}></img>
//         <AiOutlineCaretDown ></AiOutlineCaretDown>
//       <div  className={`flex flex-col ${showmenu===true?"opacity-70":"opacity-0"} transition-opacity duration-200  items-start text-xl gap-3 bg-richblack-700 text-pure-greys-5  absolute  top-[100%]  translate-y-5 z-50  right-[-13px] p-3 rounded-lg`}>
//        <div className="   flex items-center gap-2">
//         <RiDashboard2Line/>
//         <Link to={`/dashboard`}>Dashboard</Link>
//        </div>
//        <div className="  flex items-center gap-2">
//         <BiLogOut/>
//         <button onClick={logouthandler}>Log Out</button>
//        </div>
//        <div className="rounded-md  translate-y-[-12px]   bg-richblack-700 w-[30px] h-[30px] rotate-45 absolute top-[0%] right-2 z-10">

// </div>
//       </div>
//     </div>
//   )
// }

// export default Profile