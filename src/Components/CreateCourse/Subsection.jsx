import {RxDropdownMenu} from "react-icons/rx";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { set_subsectiondata, set_subsectioneditmode } from "../../redux/slices/course";
function Subsection({data,deletesubsection,index,seshowsubsectionform}) {
  const {_id,subsectionname}=data;
  const dispatch=useDispatch();
  function edithandler(){
    dispatch(set_subsectioneditmode(true));
    dispatch(set_subsectiondata(data));
    seshowsubsectionform(true);
  }
  return (
    <div className=" flex justify-between border-b-[2px] border-richblack-200 ">
        <div className=" flex gap-2 items-center">
          <RxDropdownMenu/>
        <p>{subsectionname}</p>
        </div>
        <div className=" flex items-center gap-3">
        <div className=" flex items-center gap-2 ">
        <button onClick={edithandler}><BiEdit></BiEdit></button>
        <button onClick={()=>deletesubsection(_id,index)}><AiFillDelete/></button>
       </div>
       {/* <button><AiFillCaretDown/></button> */}
        </div>
    </div>
  )
}

export default Subsection