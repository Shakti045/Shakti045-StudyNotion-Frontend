import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom';
import {FaFacebook} from "react-icons/fa"
import {FcGoogle} from "react-icons/fc"
import {IoLogoTwitter,IoLogoYoutube} from "react-icons/io"
import {FooterLink} from "../../data/footer-links"
 function Footer () {
  return (
 <div className='mt-8 w-screen text-white bg-richblack-800 flex flex-col gap-12'>

<div className=' lg:border-b-2 border-richblack-700  flex lg:flex-row flex-col gap-10  justify-between lg:p-10 p-5 lg:mx-3 '>


<div className=' flex  gap-6 lg:gap-0 lg:w-[50%] w-screen pr-5 border-r-2 border-richblack-700 justify-between'>
   <div className=' flex flex-col gap-3'>
    <img src={logo} alt="logo"></img>
    <h1 className='text-xl font-bold'>Company</h1>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>About</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Careers</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Affiliates</p></Link>
    <div className=' mt-5 flex gap-3 opacity-75 text-lg'>
     <FaFacebook/>
     <FcGoogle/>
     <IoLogoTwitter/>
     <IoLogoYoutube/>
    </div>
   </div>

   <div className=' flex flex-col gap-3'>
    <h1 className='text-xl font-bold'>Resources</h1>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Articles</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Blog</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Chart Sheet</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Code challenges</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Docs</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Projects</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Videos</p></Link>
    <Link to="/login"><p className=' opacity-50 hover:opacity-100'>Workspaces</p></Link>
     
    <h1 className=' text-xl font-bold mt-6'>Support</h1>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Help Center</p></Link>
   </div>
   <div className='flex flex-col gap-3'>
   <h1 className=' text-xl font-bold'>Plans</h1>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Paid memberships</p></Link>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>For students</p></Link>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Business solutions</p></Link>
    <h1 className=' text-xl font-bold mt-6'>Community</h1>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Forums</p></Link>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Chapters</p></Link>
    <Link to="/contactus"><p className=' opacity-50 hover:opacity-100'>Events</p></Link>
   </div>
</div>


<div className=' flex lg:w-[50%]  w-screen lg:pl-5 gap-6 lg:gap-0  justify-between'>
   
<div className='flex flex-col gap-3'>
   <h1 className=' text-xl font-bold'>Subjects</h1>
     {
         FooterLink[0].links.map((data,index)=>{
             return <Link to={data.link} key={index}><p className=' opacity-50 hover:opacity-100'>{data.title}</p></Link> 
         })
     }
   </div>
   
   <div className='flex flex-col gap-3'>
   <h1 className=' text-xl font-bold'>Languages</h1>
     {
         FooterLink[1].links.map((data,index)=>{
             return <Link to={data.link} key={index}><p className=' opacity-50 hover:opacity-100'>{data.title}</p></Link> 
         })
     }
   </div>

   <div className=' flex flex-col gap-3'>
   <h1 className=' text-xl font-bold'>Career building</h1>
     {
         FooterLink[2].links.map((data,index)=>{
             return <Link to={data.link} key={index}><p className=' opacity-50 hover:opacity-100'>{data.title}</p></Link> 
         })
     }
   </div>

</div>


</div>
 
 <div className=' flex justify-around mb-9 '>
     <div className=' flex gap-2'>
        <Link to="/"><p className='pr-3 border-r-2 border-richblack-700 opacity-50 '>Privacy Policy</p></Link>
        <Link to="/"><p className='pr-3 border-r-2 border-richblack-700 opacity-50 '>Cookie Policy</p></Link>
        <Link to="/"><p className='opacity-50 '>Terms</p></Link>
     </div>
     <div>
        <p className=' opacity-50'>Made with ❤️ CodeHelp © 2023 Studynotion</p>
     </div>
 </div>

    </div>
  )
}


export default Footer;