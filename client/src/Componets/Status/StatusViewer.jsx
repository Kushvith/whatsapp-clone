import React, { useEffect, useState } from 'react'
import { dummyData } from './dummyStories'
import ProgressBar from './ProgressBar'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const StatusViewer = () => {
  const [currentIndex,setCurrentIndex] = useState(0)
  const [activeIndex,setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const handleNextStory = ()=>{
    if(currentIndex < dummyData?.length-1){
      setCurrentIndex(currentIndex+1)
      setActiveIndex(activeIndex+1)
    }
    else{
      setCurrentIndex(0)
      setActiveIndex(0)
    }
  }
  useEffect(()=>{
    const intervalId = setInterval(()=>{
      handleNextStory();
      
    },2000)
    return ()=>clearInterval(intervalId)
  },[currentIndex])
  return (
    <div className='flex justify-center items-center h-[100vh] bg-slate-900 w-full'>
         <div className='absolute top-10'>
          <div className='flex items-center'>
            {dummyData.map((item,index)=><ProgressBar key={index} duration={2000} index={index} activeIndex={activeIndex}/>)}

          </div>

          </div>
          <div>
            <IoIosArrowRoundBack className='text-white text-4xl cursor-pointer absolute top-10 left-10' onClick={()=>navigate(-1)}/>
            <AiOutlineClose className='text-white text-4xl cursor-pointer absolute top-10 right-10' onClick={()=> navigate("/")}/>
          </div>
        <div className=''>
          <img src={dummyData?.[currentIndex].image} alt="" className='max-h-[94vh] h-[94vh] object-contain'/>
        
          </div>
        </div>
      
    
  )
}

export default StatusViewer