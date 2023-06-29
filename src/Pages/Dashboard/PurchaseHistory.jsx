import {toast} from "react-toastify"
import { apiConnector } from "../../services/api";
import { payment } from "../../services/url";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Orderhistorycard from "../../Components/Dashboard/Orderhistorycard";
function PurchaseHistory() {
  const {token}=useSelector((state)=>state.auth);
  const [details,setdetails]=useState([]);  
  async function getdata(){
    const loadingtoast=toast.loading("Please wait........")
    try{
        const result=await apiConnector("GET",payment.getorderhistoryurl,null,{
          Authorization:`Bearer ${token}`
        })
        if(result.status===200){
          setdetails(result.data?.details);
          toast.success("Orders fetched successfully")
        }
  
    }catch(err){
      console.log("Error while getting order history","=>",err);
      toast.error("Something Went Wrong")
    }
    toast.dismiss(loadingtoast);
  }

  useEffect(()=>{
    getdata();
  },[])
  return (
    <div className=" font-inter h-[calc(100vh-3.5rem)] profilesection overflow-y-scroll flex flex-col  gap-10 lg:p-10 p-2 w-full    text-white">
      <h1 className=" text-3xl font-semibold">Purchase History</h1>
      <div className=" mx-auto grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5">
         {
          details.map((data,index)=>{
            return <Orderhistorycard key={index} {...data}/>
          })
         }
      </div>
    </div>
  )
}

export default PurchaseHistory