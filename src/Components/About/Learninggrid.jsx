import { Link } from "react-router-dom";

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


function Learninggrid() {
  return (
    <div className={`mt-20 w-[90%]     grid lg:grid-cols-4 grid-cols-1 items-center justify-center mx-auto  text-white  `}>
       {
        LearningGridArray.map((element,index)=>{
            return (
                  <div key={index} className={`${element.order===-1 && "  lg:col-span-2 p-5 " }${element.order===3 && " lg:col-start-2"}`}>
                     {
                      element.order===-1?(<div className=" flex flex-col items-start gap-4">
                      <h1 className= "  text-3xl font-bold">{element.heading}</h1>
                      <h1 className="  text-blue-500 font-bold text-3xl">{element.highlightText}</h1>
                      <p  className=" opacity-70">{element.description}</p>
                      <Link to={element.BtnLink}><button className=" p-2 bg-yellow-50 tetxt-black rounded-lg">{element.BtnText}</button></Link>
                  </div>):(<div className={`${element.order%2===0?" bg-richblack-800":" bg-richblack-700"}  h-[330px] flex flex-col gap-3 p-10 `}> 
                   <h1 className=" text-2xl font-bold">{element.heading}</h1>
                   <p className=" opacity-70">{element.description}</p> 
                   </div>)
                     }
                  </div>             
            )
        })
       
       }

    </div>
  )
}

export default Learninggrid;

