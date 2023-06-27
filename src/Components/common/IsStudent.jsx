import { useSelector } from "react-redux"
import { Navigate } from "react-router";
function IsStudent({children}) {
    const {user}=useSelector((state)=>state.user);
   if(user?.role==="Student"){
    return children;
   }else{
    return <Navigate to="/error"></Navigate>
   }
}

export default IsStudent;