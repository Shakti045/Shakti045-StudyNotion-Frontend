import React from 'react'
import { TypeAnimation } from 'react-type-animation'
export default function  Coding ({code}) {
    const array=[1,2,3,4,5,6,7,8,9,10,11]
  return (
    <div className='coding flex font-mono  p-2 lg:w-[40vw] w-[90vw] border-[1px] border-richblack-400'>
        <div className=' flex flex-col  w-[10%]'>
            {
                array.map((data,index)=>{
                    return <p key={index}>{data}</p>
                })
            }
        </div>
        <div className=' text-yellow-5'>
        <TypeAnimation
            sequence={[code, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>
    </div>
  )
}
