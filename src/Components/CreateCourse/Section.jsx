import {RxDropdownMenu} from "react-icons/rx";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete,AiFillCaretDown} from "react-icons/ai";
import {  useState } from "react";
import Subsection from "./Subsection";
import { useDispatch, useSelector } from "react-redux";
import { set_coursedata, set_sectiondata, set_sectiononeditmode, set_subsectiondata, set_subsectioneditmode} from "../../redux/slices/course";
import SubsectionForm from "./SubsectionForm";
import { apiConnector } from "../../services/api";
import { subsction } from "../../services/url";
import { toast } from "react-hot-toast";
function Section({_id,sectionname,subsections,deletesection,index}) {
  // const [subsections,setsubsections]=useState([]);
  const [showbottom,setshowbottom]=useState(true);
  const [showsubsectionform,seshowsubsectionform]=useState(false);
  const {token}=useSelector((state)=>state.auth);  
  // const {editmode}=useSelector((state)=>state.course);
  const {coursedata}=useSelector((state)=>state.course);
  const dispatch=useDispatch();
  function edithandler(){
      dispatch(set_sectiondata({id:_id,index:index,sectionname:sectionname}));
      dispatch(set_sectiononeditmode(true));
  }
  async function addsubsection(formdata){
    const loadingtoast=toast.loading("Please wait.....")
    try{
       formdata.append("sectionid",_id);       
       const result=await apiConnector("POST",subsction.createsubsectionurl,formdata,{
        Authorization:`Bearer ${token}`
       })
       if(result.status===200){
        toast.success("Video added successfully");
        // setsubsections([...subsections,result?.data?.subsection]);
        const updatedsubsections=[...subsections,result?.data?.subsection];
        const oldsections=[...coursedata.sections]
        oldsections[index]={...oldsections[index],subsections:updatedsubsections};
        dispatch(set_coursedata({...coursedata,sections:oldsections}));
        seshowsubsectionform(false);
       }
    }catch(err){
      console.log("Error while creating subsection","=>",err);
      toast.error(err.response.data.Message);
    }
    toast.dismiss(loadingtoast);
  }

  async function deletesubsection(id,subindex){
    const loadingtoast=toast.loading("Please wait.....")
    try{   
       const result=await apiConnector("DELETE",subsction.deletesubsectionurl,{subsectionid:id},{
        Authorization:`Bearer ${token}`
       })
       if(result.status===200){
        toast.success("Video deleted successfully");
        const updatedsubsections=[...subsections];
        updatedsubsections.splice(subindex,1);
        const oldsections=[...coursedata.sections]
        // console.log(index);
        oldsections[index]={...oldsections[index],subsections:updatedsubsections};
        dispatch(set_coursedata({...coursedata,sections:oldsections}));
        // setsubsections(updatedsubsections);
       }
    }catch(err){
      console.log("Error while deleting subsection","=>",err);
      toast.error(err.response.data.Message);
    }
    toast.dismiss(loadingtoast);
  }
  // useEffect(()=>{
  //    if(editmode){
  //     setsubsections(oldsubsections);
  //    }
  // },[])
  function addnewlecture(){
    dispatch(set_subsectioneditmode(false));
    dispatch(set_subsectiondata(null));
    seshowsubsectionform(true);
  }

  async function updatesubsection(formdata,id){
    const loadingtoast=toast.loading("Please wait.....")
    try{   
       const result=await apiConnector("PUT",subsction.updatesubsectionurl,formdata,{
        Authorization:`Bearer ${token}`
       })
       if(result.status===200){
        toast.success("Video updated successfully");
        const subindex=subsections.findIndex((data)=>data._id===id);
        const updatedsubsections=[...subsections];
        updatedsubsections[subindex]=result.data.subsection;
        console.log(updatedsubsections);
        const oldsections=[...coursedata.sections]
        console.log(coursedata);
        // console.log(index);
        oldsections[index]={...oldsections[index],subsections:updatedsubsections};
        // console.log(oldsections);
        dispatch(set_coursedata({...coursedata,sections:oldsections}));
        seshowsubsectionform(false);
       }
    }catch(err){
      console.log("Error while updating subsection","=>",err);
      toast.error(err.response.data.Message);
    }
    toast.dismiss(loadingtoast);
  }
  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between border-b-[1px] pb-2">
         <div className=" flex items-center gap-3">
          <RxDropdownMenu/>
          <p>{sectionname}</p>
         </div>
         <div className=" flex items-center gap-2">
            <div className=" flex gap-2 items-center border-r-2 pr-3">
              <button onClick={edithandler}><BiEdit/></button>
              <button onClick={()=>deletesection(_id,index)}><AiFillDelete/></button>
            </div>
             <button onClick={()=>setshowbottom(!showbottom)}><AiFillCaretDown/></button>
         </div>
    </div>
       <div className={` mx-10 mt-5 flex flex-col gap-2 text-pure-greys-100  ${showbottom?" visible":"hidden"}`}>
       <div className=" flex flex-col gap-2 ">
            {
              subsections.map((data,subsectionndex)=>{
                return <Subsection sectionindex={index} seshowsubsectionform={seshowsubsectionform} deletesubsection={deletesubsection} index={subsectionndex} key={subsectionndex} data={data}></Subsection>
              })
            }
        </div>
        <div >
           <button onClick={addnewlecture} className=" text-yellow-100">Add Lecture+</button>
        </div>
        {
          showsubsectionform && (
            <SubsectionForm updatesubsection={updatesubsection} addsubsection={addsubsection} seshowsubsectionform={seshowsubsectionform}/>
          )
        }
       </div>
    </div>
  )
}

export default Section