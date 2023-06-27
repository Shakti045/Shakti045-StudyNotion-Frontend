import { toast } from "react-toastify";
import Img from "../common/LazyLoadImage"
import date from "date-and-time";
import { apiConnector } from "../../services/api";
import { payment } from "../../services/url";
import { useSelector } from "react-redux";
function Orderhistorycard({courseid,paymentId,purchasedate}) {
    const pattern=date.compile('MMM DD YYYY | hh:mm A');
    const newdate=date.format(new Date(purchasedate),pattern);
    const {token}=useSelector((state)=>state.auth);    
    async function handler(){
        const loadingtoast=toast.loading("Please wait.....")
        try{
          const result=await apiConnector("POST",payment.getpaymentdetailsurl,{paymentId:paymentId},{
            Authorization:`Bearer ${token}`
          })
          if(result.status===200){
            toast.success(result.data.Message);
          }
        }catch(err){
            console.log("Error while fetching details of payment","=>",err);
            toast.error("Something went wrong please try again")
        }
        toast.dismiss(loadingtoast);
    }
  return (
    <>
        {
            courseid.map((data,index)=>(
                <div key={index} className=" flex flex-col rounded-md border-[1px] border-richblack-500 gap-2  bg-richblack-700 lg:w-[320px] w-[95vw]  md:w-[320px]">
                    <Img className={" h-[200px] lg:w-[320px] w-[95vw]  md:w-[320px]"} src={data?.thumbnail}/>
                    <div className=" flex flex-col gap-2 p-4">
                    <h1 className=" truncate text-xl font-semibold">{data?.title}</h1>
                    <p >Purchased On: {newdate}</p>
                    <p>Paymentid: {paymentId}</p>
                    <button onClick={handler} className=" p-2 rounded-md bg-yellow-100 text-black font-semibold">Get PaymentDetails</button>
                   </div>
                </div>
            ))
        }
    </>
  )
}

export default Orderhistorycard