
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const StatusCard = () => {
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate("/status/{userId}")
    }
  return (
    <div >
        <div className='flex items-center py-5' onClick={handleNavigate}>
        <div> <img  className="rounded-full w-10 h-10 " src="https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg" alt="" /></div>
        <div className='ml-2 text-white'>Kushvith Chinna</div>
        </div>
    </div>
  )
}
