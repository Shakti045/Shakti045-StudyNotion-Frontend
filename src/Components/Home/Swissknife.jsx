import comparewithothers from "../../assets/Images/Compare_with_others.svg"
import knowyourprogress from "../../assets/Images/Know_your_progress.svg"
import planyourlesson from "../../assets/Images/Plan_your_lessons.svg"
import HomeButtons from "./HomeButtons"
function Swissknife() {
  return (
    <div className=" w-11/12 mb-[100px] flex flex-col items-center mt-10">
        <div className="  flex flex-col gap-2">
            <p className="text-center text-4xl">Your swiss knife for <span className="text-blue-400 font-semibold">learning any language</span></p>
        </div>
        <div className=" mx-auto">
        <p className=" text-center text-lg opacity-70 " >Using spin making learning multiple languages easy. with 20+ <br></br> languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        <div className=" mt-8  lg:flex">
            <div className=" lg:translate-x-[80px] lg:z-10">
             <img  src={knowyourprogress} alt="knowyourprogress"></img>
            </div>
            <div className=" lg:z-30">
            <img  src={comparewithothers} alt="comparewithothers"></img>
                </div>
                <div className=" lg:z-40">
                <img className=" lg:translate-x-[-100px]" src={planyourlesson} alt="planyourlesson"></img>
                </div>
        </div>
        <div className=" mx-auto">
            <HomeButtons linkto={"/signup"} className=" bg-yellow-100 text-black font-semibold">Learn More</HomeButtons>
        </div>
    </div>
  )
}

export default Swissknife