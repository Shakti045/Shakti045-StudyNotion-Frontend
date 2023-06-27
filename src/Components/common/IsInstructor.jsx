import { useSelector } from "react-redux"
import { Navigate } from "react-router";
function IsInstructor({children}) {
    const {user}=useSelector((state)=>state.user);
   if(user?.role==="Instructor"){
    return children;
   }else{
    return <Navigate to="/error"></Navigate>
   }
}

export default IsInstructor;