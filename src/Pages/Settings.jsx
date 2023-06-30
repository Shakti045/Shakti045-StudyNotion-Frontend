import { useState } from "react"
import { useSelector } from "react-redux"
import {BsUpload} from "react-icons/bs"
import axios from "axios"
import { profile,auth } from "../services/url"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { set_user } from "../redux/slices/user"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { apiConnector } from "../services/api"
import { useNavigate } from "react-router-dom"
import { set_token } from "../redux/slices/auth"
import {AiFillDelete} from "react-icons/ai"
function Settings() {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.user)
  const {token}=useSelector((state)=>state.auth);
  const [file,setfile]=useState(null);
  const [filename,setfilename]=useState();
  const [passsdata,setpassdata]=useState({password:"",newpassword:""});
  const[image,setimage]=useState();
  const profiledata=user.profile;
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
  }=useForm();
  function filechangehandler(e){
    const file=e.target.files[0];
    setfilename(file.name)
    setfile(file);
    const reader = new FileReader();
    
        reader.onload = () => {
          setimage(reader.result)
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
  }
  async function filehandler(){
    const loadingtoast=toast.loading("Uploading.....")
     try{
        const formdata=new FormData();
        formdata.append("file",file);
        formdata.append("token",token);
        const result=await axios.post(profile.updateprofilepicurl,formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        })
        if(result.status===200){
          toast.success("Image Uploaded Successfully")
          dispatch(set_user({...user,profilephoto:result.data.url}))
          setfilename("");
          setfile(null);
        }
     }catch(err){
        toast.error(err.response.data.Message)
     }
     toast.dismiss(loadingtoast);
  }
  function uploadhandler(){
    if(file!==null){
       filehandler();
    }else{
        toast.error("Please Select A File")
    }
    }
  async function submithandler(data){
    const loadingtoast=toast.loading("Uploading.....")
     try{
       const result=await apiConnector("POST",profile.updateprofileurl,{...data,token:token});
        if(result.status===200){
          toast.success("Profile Updated")
          dispatch(set_user({...user,profile:{...data}}));
        }
     }catch(err){
      toast.error(err.response.data.Message);
     }
     toast.dismiss(loadingtoast);
  }
  
  function passhandler(e){
    setpassdata(()=>{
      return {...passsdata,[e.target.name]:e.target.value}
    })
  }

  async function deletehandler(){
    const loadingtoast=toast.loading("Please Wait....")
    try{
      const result=await apiConnector("POST",profile.deleteaccounturl,{token:token})
      if(result.status===200){
        toast.success("Request Submitted Successfully");
        navigate("/");
        dispatch(set_token(null));
        dispatch(set_user(null));
        localStorage.clear();
      }
    }catch(err){
      toast.error(err.response.data.Message);
     }
     toast.dismiss(loadingtoast);
  }
  async function passwordhandler(){
     if(passsdata.password===passsdata.newpassword){
     return toast.error("Both Password Should Be Different")
     }
     if(!passsdata.password || !passsdata.newpassword ){
      return toast.error("Both Password Required")
     }
     const loadingtoast=toast.loading("Uploading.....")
     try{
       const result= await apiConnector("POST",auth.changepasswordurl,{...passsdata,token:token})
       if(result.status===200){
        toast.success("Password Changed Succesfully")
        dispatch(set_token(null));
        navigate("/login");
        toast.success("Relogin With New Password")
       }
     }catch(err){
      toast.error(err.response.data.Message);
     }
     toast.dismiss(loadingtoast);
  }
  return (
         <div className=" font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col gap-10 lg:p-10 p-5 w-full    text-white">
               
               <div>
                <h1 className=" text-4xl font-bold">Edit Profile</h1>
               </div>

            <div className=" border-[1px] border-richblack-600  flex justify-between items-center lg:p-10 p-2 rounded-md bg-richblack-800">
              <div className=" flex gap-3  items-center">
                    <img className=" h-[80px] w-[80px] rounded-full" src={image?image:user.profilephoto} alt="profilephoto"></img>
                    <div className=" flex flex-col gap-1">
                      <h1 className=" text-lg">Change Profile Picture</h1>
                       <div className=" flex gap-2 items-center">
                         <label htmlFor="fileupload"><div className=" cursor-pointer py-2 px-4 rounded-md bg-richblack-600 text-white">Select</div></label>
                         <input type="file" id="fileupload" accept=".jpg ,.jpeg, .svg,.gif,.webp" 
                         style={{ display: 'none' }} onChange={filechangehandler}></input>
                         <button onClick={uploadhandler} className=" flex gap-2 items-center  py-2 px-4 rounded-md text-richblack-900 bg-yellow-100 ">Upload<BsUpload style={{fontWeight:900}}/></button>
                         <span className=" hidden lg:block text-pink-300">{filename}</span>
                       </div> 
                      </div>
                    </div>
                  </div>
               
                <div className="  border-[1px] border-richblack-600  flex  flex-col lg:p-10 p-2  rounded-md bg-richblack-800">
                    <p className=" text-lg font-bold">Profile Information</p>
                    <form className=" flex flex-col gap-8 mt-5 text-white">

                       <div className=" flex lg:flex-row flex-col gap-5">
                        
                       <div className=" lg:w-[50%] flex flex-col gap-2">
                        <label htmlFor="firstname">First Name</label>
                        <input id="firstname" className=" outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="text"  defaultValue={user.firstname} {...register("firstname")} ></input>
                       </div>
                        
                       <div className=" lg:w-[50%] flex flex-col gap-2">
                        <label htmlFor="lastname">Last Name</label>
                        <input id="lastname" className=" outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="text"  defaultValue={user.lastname} {...register("lastname")} ></input>
                       </div>
                       
                       </div>
                        
                       <div className=" flex lg:flex-row flex-col gap-5">
                        
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="dob">Date Of Birth</label>
                         <input id="dob" className=" outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="date"  defaultValue={profiledata?.dob} {...register("dob")} ></input>
                        </div>
                         
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="gender">Gender</label>
                         <select defaultValue={profiledata?.gender} className=" outline-none p-3 text-lg bg-richblack-600 text-white rounded-lg" id="gender" {...register("gender")}>
                           <option value={"Male"}>Male</option>
                           <option value={"Female"}>Female</option>
                           <option value={"Prefer Not To Say"}>Prefer Not To Say</option>
                           <option value={"Other"}>Other</option>
                         </select>
                        </div>
                       </div>
                    

                       <div className=" flex  lg:flex-row flex-col gap-5">
                        
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="contactno">Contact Number</label>
                         <input id="contactno" className="profilecontact outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="number"  defaultValue={profiledata?.phonenumber} placeholder="Enter Your Contact Number" {...register("phonenumber")} ></input>
                        </div>
                         
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="about">About</label>
                         <input id="about" className="outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="text"  defaultValue={profiledata?.about} placeholder="Enter Your Bio" {...register("about")} ></input>
                        </div>
                        </div>
                    </form>
                </div> 
         
                          <div className=" flex gap-4 justify-end">
                          <Link to="/dashboard/profile"> <button className=" py-2 px-6 font-inter bg-richblack-200 rounded-lg">Cancel</button></Link>
                          <button onClick={handleSubmit(submithandler)} className=" py-2 px-6 text-richblack-900 font-inter bg-yellow-200 rounded-lg">Save</button>
                         </div>
                 
                <div className="  border-[1px] border-richblack-600  flex  flex-col lg:p-10 p-2  gap-5 rounded-md bg-richblack-800">
                <p className=" text-lg font-bold">Password</p>
                <div className=" flex lg:flex-row flex-col gap-5">
                        
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="currpassword">Current Password</label>
                         <input onChange={passhandler} value={passsdata.password} name="password" placeholder="Enter Your Current Paswword" id="currpassword" className=" outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="password"></input>
                        </div>
                         
                        <div className=" lg:w-[50%] flex flex-col gap-2">
                         <label htmlFor="newpassword">New Password</label>
                         <input onChange={passhandler}  id="newpassword" value={passsdata.newpassword} name="newpassword" className=" outline-none p-3 bg-richblack-600 text-white rounded-lg"  type="password" placeholder="Enter Your New Password"  ></input>
                        </div>
                        </div>

                        
                </div>  
                        <div className=" flex gap-4 justify-end">
                          <Link to="/dashboard/profile"> <button className=" py-2 px-6 font-inter bg-richblack-200 rounded-lg">Cancel</button></Link>
                          <button onClick={passwordhandler} className=" py-2 px-6 text-richblack-900 font-inter bg-yellow-200 rounded-lg">Update</button>
                         </div>


                         <div className=" flex gap-4 rounded-lg border-[1px] border-richblack-700 bg-pink-900 lg:p-10 p-2 "> 
                             <div className=" w-fit h-fit bg-pink-700  rounded-full p-4 ">
                                 <AiFillDelete size={30} color="red"/>
                             </div>
                             <div className=" flex flex-col gap-3 lg:w-[40%] text-pure-greys-100">
                                <h1 className=" text-2xl font-bold">Delete Account</h1>
                                <p>Would you like to delete account?</p>
                                <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
                                <button onClick={deletehandler} className=" w-fit font-edu-sa ">I want to delete my account.</button>
                             </div>
                       </div>
                   </div>
           
  )
}

export default Settings;