import { Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Nav from "./Components/common/Nav";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Category from "./Pages/Category";
import Dashboard from "./Pages/Dashboard";
import Privateroutes from "./Components/common/Privateroutes";
import Openroutes from "./Components/common/Openroutes";
import Resetpassword from "./Pages/Resetpassword";
import Newpassword from "./Pages/Newpassword";
import Course from "./Pages/Course";
import Error from "./Pages/Error";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Userprofile from "./Pages/Userprofile";
import Settings from "./Pages/Settings";
import Cart from "./Pages/Cart";
import CreateCourse from "./Pages/CreateCourse/CreateCourse";
import IsInstructor from "./Components/common/IsInstructor";
import IsStudent from "./Components/common/IsStudent";
import PurchaseHistory from "./Pages/Dashboard/PurchaseHistory";
import StudentCourses from "./Pages/Dashboard/StudentCourses";
import Allcourse from "./Pages/Allcourse";
import Wishlist from "./Pages/Dashboard/Wishlist";
import EnrolledCourse from "./Pages/EnrolledCourse/EnrolledCourse";
import Teachercourses from "./Pages/Dashboard/Teachercourses";
import SocialAuth from "./Pages/SocialAuth";
import TeacherDashboard from "./Pages/Dashboard/TeacherDashboard";
function App() {
  return (
     <div className=" overflow-x-hidden min-h-screen overflow-y-hidden   bg-richblack-900">
      <Nav></Nav>
       <Routes>
         <Route path="/" element={<Home></Home>}></Route>
         <Route path="/signup" element={<Openroutes><Signup></Signup></Openroutes>}></Route>
         <Route path="/login" element={<Openroutes><Login></Login></Openroutes>}></Route>
         <Route path="/category/:id" element={<Category></Category>}></Route>
         <Route path="/resetpassword" element={<Openroutes><Resetpassword/></Openroutes>}></Route>
         <Route path="/resetpassword/:token" element={<Openroutes><Newpassword/></Openroutes>}></Route>
         <Route path="/course/:courseid" element={<Course/>}></Route>
         <Route path="*" element={<Error></Error>}></Route>
         <Route path="/about" element={<About></About>}></Route>
         <Route path="/contactus" element={<Contact></Contact>}></Route>
        <Route element={<Privateroutes><Dashboard/></Privateroutes>}>
                     <Route path="/dashboard/profile" element={<Userprofile/>}></Route>
                    <Route path="/dashboard/enrolled-courses" element=  {<IsStudent><StudentCourses/></IsStudent>}></Route>
                    <Route path="/dashboard/cart" element={<IsStudent><Cart/></IsStudent>}></Route>
                    <Route path="/dashboard/settings" element={<Settings/>}></Route>
                    <Route path="/dashboard/createcourse" element={<IsInstructor><CreateCourse/></IsInstructor>}></Route>
                    <Route path="/dashboard/purchase-history" element={<IsStudent><PurchaseHistory/></IsStudent>}></Route>
                    <Route path="/dashboard/allcourses" element={<Allcourse/>}></Route>
                    <Route path="/dashboard/wishlist" element={<Wishlist/>}></Route>
                    <Route path="/dashboard/teacher/mycourses" element={<Teachercourses/>}></Route>
                    <Route path="/dashboard/teacher-dashboard" element={<TeacherDashboard/>}></Route>
        </Route>
        <Route path="/enrolled-courses/:courseid" element={<IsStudent><EnrolledCourse/></IsStudent>}></Route>
        <Route path="/socialauth" element={<SocialAuth/>}></Route>
      </Routes>  
     </div>
  );
}

export default App;
