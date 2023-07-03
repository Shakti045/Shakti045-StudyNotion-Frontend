import {Chart, registerables} from "chart.js"
import { useState } from "react";
import {Pie,Bar} from "react-chartjs-2"
Chart.register(...registerables);
function Visualize({data}) {
    const [toggle,settoggle]=useState(true);
    const [option,setoption]=useState(true);
    function getrandomcolor(k){
     let colors=[];
     for(let i=0;i<k;i++){
        const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        colors.push(color);
     }
     return colors;
    }

    const chartDataForStudents = {
        labels: data.map((course)=> course.title),
        datasets: [
            {
                data: data.map((course)=> course.totalstudent),
                backgroundColor: getrandomcolor(data.length),
            }
        ]
    }

    const chastdataforincome={
        labels:data.map((course)=>course.title),
        datasets:[
            {
                data: data.map((course)=> course.profit),
                backgroundColor: getrandomcolor(data.length),
            }
        ]
    }

  return (
    <div  className=" w-full h-full flex-col  gap-3">
         <div className=" flex lg:flex-row flex-col gap-3  justify-between">
         <div className=" flex gap-6">
         <button onClick={()=>settoggle(true)} className={`${toggle?"bg-yellow-100":' bg-yellow-500'} h-fit p-2 rounded-md text-black font-semibold`}>Student</button>
         <button onClick={()=>settoggle(false)} className={`${toggle===false?"bg-yellow-100":' bg-yellow-500'}  h-fit p-2 rounded-md text-black font-semibold`}>Income</button>
       </div>
       <div className=" flex gap-6">
       <button onClick={()=>setoption(true)} className={`${option?"bg-yellow-100":' bg-yellow-500'} h-fit p-2 rounded-md text-black font-semibold`}>Pie Chart</button>
         <button onClick={()=>setoption(false)} className={`${option===false?"bg-yellow-100":' bg-yellow-500'}  h-fit p-2 rounded-md text-black font-semibold`}>Bar Graph</button>

       </div>
         </div>
        <div className=" h-full w-full flex flex-col justify-center  items-center" >
          {
            option?(<div className=" min-w-full flex flex-col justify-center items-center max-h-[90%]">
                <Pie 
                data={toggle?chartDataForStudents:chastdataforincome}
            />
            </div>):(<Bar 
                data={toggle?chartDataForStudents:chastdataforincome}
            />)
          }
        </div>
    </div>
  )
}

export default Visualize;

