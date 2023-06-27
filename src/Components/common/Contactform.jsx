import { useForm } from "react-hook-form"
import countrycode from "../../data/countrycode.json"
import { toast } from "react-hot-toast";
import axios from "axios";
import { contactusurl } from "../../services/url";
import { useEffect } from "react";
function Contactform() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors,isSubmitSuccessful },
      } = useForm();
    async function submithandler(data){
      const loadingtoast=toast.loading("Please wait....")
        try{
          const {firstname,lastname,email,countrycode,phoneno,message}=data;
          const result=await axios.post(contactusurl,{firstname:firstname,lastname:lastname,email:email,phonenumber:countrycode+phoneno,message:message})
          if(result.status===200){
            toast.success("Request Submitted")
          }
        }catch(err){
          console.log(err);
          toast.error(err.response.data.Message);
        }
        toast.dismiss(loadingtoast);
    }

    useEffect(()=>{
      if(isSubmitSuccessful){
        reset({
          firstname:"",
          lastname:"",
          email:"",
          phoneno:"",
          countrycode:"+91",
          message:""
        })
      }
      // eslint-disable-next-line
    },[isSubmitSuccessful])
  return (
      <form onSubmit={handleSubmit(submithandler)} className="  lg:w-[37vw] w-[92vw] flex flex-col gap-4">
        <div className=" flex flex-col lg:flex-row justify-between">
        <div className=" flex flex-col   gap-2">
            <label htmlFor="firstname">First Name<sup className="text-pink-200">*</sup></label>
            <input placeholder="Enter First Name" id=" firstname" className=" p-2 rounded-md  bg-richblack-800 text-white text-lg"
            {
                ...register("firstname",{required:{value:true,message:"Please Enter First Name"}})
            }
            ></input>
           {
            errors.firstname && (
                <span className="text-pink-200">{errors.firstname.message}</span>
            )
           }
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="lastname">Last Name</label>
            <input placeholder="Enter Last Name" id="lastname" className="p-2 rounded-md bg-richblack-800 text-white text-lg"
            {
                ...register("lastname")
            }
            ></input>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="email">Email Adress<sup className="text-pink-200">*</sup></label>
          <input type="email" name="email" id="email" className=" p-2 rounded-md bg-richblack-800 text-white text-lg" placeholder="Enter Your Mail Adress"
            {
              ...register("email",{required:{value:true,message:"Please enter you mail adress"}})
            }
          ></input>
          {
            errors.email && (
              <span className="text-pink-200">{errors.email.message}</span>
            )
          }
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="phonenumber">Phone Number<sup className="text-pink-200" >*</sup></label>
          <div className=" flex gap-5">
            <select className=" p-2 rounded-md bg-richblack-800 text-white text-lg w-[18%]" name="countrycode" id="countrycode"
             {...register("countrycode",{required:true})}
            >
             
               {
                  countrycode.map((element,index)=>{
                    return <option className=" max-w-fit" key={index} value={element.code}>{`${element.code}-${element.country}`}</option>
                  })
                }
            </select>
            <input type="number" placeholder="Enter your mobile number" className=" w-[100%] p-2 rounded-md bg-richblack-800 text-white text-lg aboutphonenumber "
              {
                ...register("phoneno",{required:{value:true,message:"Please Enter Your Phone Number"},minLength:{value:9,message:"Invalid Phone Number"},maxLength:{value:10,message:"Invalid Phone Number"}})
              }
            >
            </input>
          </div>
          {
              errors.phoneno && (
                <span className=" text-pink-200">{errors.phoneno.message}</span>
              )
            }
        </div>
         <div className=" flex flex-col gap-2">
           <label htmlFor="message">Message<sup className="text-pink-200" >*</sup></label>
           <textarea placeholder="Write your message here" id="message" name="message" rows={7} cols={40} className=" p-2 rounded-md bg-richblack-800 text-white text-lg" {
            ...register("message",{required:true})
           }>
           </textarea>
           {
              errors.message && (
                 <span className="text-pink-200">Please provide your message</span>
              )
            }
         </div>
        <button type="submit" className=" p-3 rounded-md bg-yellow-200 text-richblack-900 text-lg font-bold border-b-2">Send Message</button>
      </form>
  )
}

export default Contactform