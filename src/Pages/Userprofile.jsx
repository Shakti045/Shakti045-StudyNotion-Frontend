import { useNavigate } from "react-router"
import {FiEdit} from "react-icons/fi"
import { useSelector } from "react-redux"
function Userprofile() {
  const {user}=useSelector((state)=>state.user)
  const profiledata=user.profile;
  const navigate=useNavigate();
  return (
      <div className=" h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10 lg:p-10 p-3 w-full    text-white">
              <div>
                <h1 className=" text-3xl font-bold ">My Profile</h1>
              </div>
          
               
              <div className="  border-[1px] border-richblack-600  flex justify-between lg:items-center lg:p-10 p-2 rounded-md bg-richblack-800">
              <div className=" flex gap-3 items-center">
                    <img className=" h-[80px] w-[80px] rounded-full" src={user.profilephoto} alt="profilephoto"></img>
                    <div className="  flex flex-col gap-1">
                      <h1 className=" text-lg">{user.firstname + " " + user.lastname}</h1>
                      <p className=" max-w-[200px] lg:max-w-fit truncate  text-pure-greys-50">{user.email}</p>
                    </div>
                 </div>
                  <button onClick={()=>navigate("/dashboard/settings")} className=" hidden  lg:flex items-center gap-1  w-fit h-fit py-2 px-4 rounded-md bg-yellow-100 text-richblack-900">
                    Edit <FiEdit/>
                  </button>
              </div>



              <div className=" border-[1px] border-richblack-600  flex justify-between items-center lg:p-10 p-2 rounded-md bg-richblack-800">
                   <div className=" w-full flex justify-between items-center">
                   <div className=" flex flex-col gap-3 ">
                   <h1 className=" text-lg font-bold">About</h1>
                   <p>{profiledata?.about?profiledata?.about:"Write Something About Yourself"}</p>
                  </div>
                  <button onClick={()=>navigate("/dashboard/settings")} className="  flex items-center gap-1  w-fit h-fit py-2 px-4 rounded-md bg-yellow-100 text-richblack-900">
                    Edit <FiEdit/>
                  </button>
                   </div>
             </div> 

              <div className="  border-[1px] border-richblack-600 flex  flex-col gap-7 lg:p-10 p-2 rounded-md bg-richblack-800">
                 <div className=" w-full flex justify-between items-center">
                    <h1 className=" text-lg font-bold">Personal Details</h1>
                    <button onClick={()=>navigate("/dashboard/settings")} className="  flex items-center gap-1  w-fit h-fit py-2 px-4 rounded-md bg-yellow-100 text-richblack-900">
                    Edit <FiEdit/>
                  </button>
                 </div>

                  <div className=" grid lg:grid-cols-2 grid-cols-1 lg:gap-5 ">
                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">First Name</p>
                       <p>{user.firstname}</p>
                      </div>
                       

                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">Last Name</p>
                       <p>{user.lastname}</p>
                      </div>
                      
                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">Email</p>
                       <p>{user.email}</p>
                      </div>

                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">Gender</p>
                       <p>{profiledata?.gender?profiledata?.gender:"Add Gender"}</p>
                      </div>

                     

                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">Phone Number</p>
                       <p>{profiledata?.phonenumber?profiledata?.phonenumber:"Add Phone Number"}</p>
                      </div>

                      <div className=" flex flex-col gap-1">
                       <p className=" opacity-30">Date Of Birth</p>
                       <p>{profiledata?.dob?profiledata?.dob.split('').splice(0,10).join(''):"Add Date OF Birth"}</p>
                      </div>

                      
                  </div>
              </div>
           </div>
 
  )
}

export default Userprofile