import {apiConnector} from "./api"
import { payment } from "./url";
import { toast } from "react-hot-toast";
import razpaylogo from "../assets/Logo/rzp_logo.png"


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
    
            script.onload = () => {
                resolve(true);
            }
            script.onerror= () =>{
                resolve(false);
            }
            document.body.appendChild(script);
        })
    }
    

    async function sendPaymentSuccessEmail(response, amount, token) {
        try{
            const result=await apiConnector("POST", payment.sendpaymentconfirmationurl, {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },{
                Authorization: `Bearer ${token}`
            })
            if(result.status===200){
                toast.success("Confirmation mail sent")
            }
        }
        catch(error) {
            console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
        }

    }
    
   async function verifyPayment(response, courses, token, navigate, dispatch){
    const loadingtoast=toast.loading("Please wait.....")
     try{
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=response;
        const result=await apiConnector("POST",payment.verifysignatureyurl,{razorpay_payment_id:razorpay_payment_id,razorpay_order_id:razorpay_order_id,razorpay_signature:razorpay_signature,courses:courses},{
            Authorization:`Bearer ${token}`
        });
        console.log(result);
        if(result.status===200){
           toast.success("Course registration successfull");
           navigate("/dashboard/enrolled-courses");
        }
     }catch(err){
        console.log("Error while verifying signature","=>",err);
     }
     toast.dismiss(loadingtoast);
   }






export const capturepayment=async(courses,token,userDetails,navigate,dispatch)=>{
  const loadingtoast=toast.loading("Please wait.....")
  try{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if(!res) {
        toast.error("RazorPay SDK failed to load");
        return false;
    }

    const orderResponse=await apiConnector("POST",payment.capturepaymenturl,{courses:courses},{
        Authorization:`Bearer ${token}`
    })
    // console.log(orderResponse);
    if(!orderResponse){
        toast.error("Payment initiation failed")
        return false;
    }

    const options = {
        key: process.env.RAZORPAY_KEY,
        currency: orderResponse.data.responce.currency,
        amount: `${orderResponse.data.responce.amount}`,
        order_id:orderResponse.data.responce.id,
        name:"StudyNotion",
        description: "Thank You for Purchasing the Course",
        image:razpaylogo,
        prefill: {
            name:`${userDetails.firstName}`,
            email:userDetails.email
        },
        handler: function(response) {
            sendPaymentSuccessEmail(response, orderResponse.data.responce.amount,token );
            verifyPayment(response, courses, token, navigate, dispatch);
        }
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function(response) {
        toast.error("oops, payment failed");
        console.log(response.error);
    })

  }catch(err){
    console.log("Error while capturing payment","=>",err);
    toast.error(err.response.data.Message)
  }

  toast.dismiss(loadingtoast);
}