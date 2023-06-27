import { useSelector } from "react-redux"
import Teachermenu from "./Teachermenu";
import Studentmenu from "./Studentmenu";
function Dashboardmenu() {
    const {user}=useSelector((state)=>state.user);
  return (
         <>
           {
            user?.role==="Student"?<Studentmenu/>:<Teachermenu/>
           }
         </>
  )
}

export default Dashboardmenu