import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../assets/Images/TimelineImage.png"
const data=[
    {
        logo:logo1,
        heading:"Leadership",
        subheading:"Fully committed to the success company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        subheading:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        subheading:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        subheading:"Code your way to a solution"
    },
]
function Advertising() {
  return (
    <div className=" flex lg:flex-row flex-col gap-10 lg:gap-0 w-11/12 justify-between  mt-14">
    <div className=" flex flex-col gap-14">
      {
        data.map((element,index)=>{
            return (<div key={index} className=" flex gap-10 items-center ">
                <div className=" p-4 bg-white  rounded-full ">
                    <img className=" w-[30px] h-[30px]"  src={element.logo} alt={element.heading}></img>
                </div>
                <div className=" flex flex-col">
                    <p className=" text-xl font-bold">{element.heading}</p>
                    <p className=" opacity-70">{element.subheading}</p>
                </div>
            </div>)
        })
      }
    </div>
    <div>
       <div>
        <img className=" timelineimage h-[410px] w-[600px]" src={timelineimage} alt="timelineimage"></img>
       </div>
       <div className=" w-[80%] mx-auto translate-y-[-60px] flex lg:p-10 p-4 bg-caribbeangreen-700 text-white">
        <div className=" flex  lg:gap-8 lg:flex-row flex-col lg:items-center items-start ">
            <p className="  text-3xl font-bold">10</p>
            <p className=" opacity-75">YEARS EXPERIENCES</p>
        </div>
        <div className=" flex lg:gap-8 ml-6 lg:flex-row flex-col lg:items-center items-start">
            <p className=" text-3xl font-bold">250</p>
            <p className=" opacity-75">TYPES OF COURSES</p>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Advertising