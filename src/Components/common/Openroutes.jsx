import { Navigate } from "react-router"
import { useSelector } from "react-redux"
function Openroutes({children}) {
    const {token}=useSelector((state)=>state.auth)
    if(token===null){
        return children;
    }else{
        return <Navigate to="/dashboard/profile"></Navigate>
    }
}

export default Openroutes