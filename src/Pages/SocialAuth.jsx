import { toast } from "react-hot-toast"
import { apiConnector } from "../services/api";
import { sociallogin } from "../services/url";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { set_token} from "../redux/slices/auth";
import { set_user } from "../redux/slices/user";
import Loader from "../Components/common/Loader";
function SocialAuth() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
   async function getdata(){
    try{
       const {data}=await apiConnector("GET",sociallogin.getuserdataurl);
       const {token,user}=data;
       if(!token || !user){
        toast.error("You have no account with us")
        navigate("/signup")
       }else{
        dispatch(set_token(token));
        dispatch(set_user(user));
        localStorage.setItem("studynotiontoken",JSON.stringify(token));
        navigate("/dashboard/profile");
       }
    }catch(err){
        console.log("Error while geting user information in socialauth","=>",err);
    }

   }

   useEffect(()=>{
    getdata();
   },[]);
  return (
    <Loader/>
  )
}

export default SocialAuth