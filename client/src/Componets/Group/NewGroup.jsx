import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsCheck2 } from 'react-icons/bs'
import { CircularProgress } from "@mui/material"
import { useDispatch } from 'react-redux'
import { createGroupChat } from '../../Redux/Chat/Action'
 
const NewGroup = ({group,isSetgroup}) => {
    const [isUploading,setIsUploading] = useState(false)
    const [content,setContent] = useState("")
    const [groupImage,setGroupImage] = useState("")

    const token = localStorage.getItem("jwt")
    const dispatch = useDispatch()
    const uploadToCloudinary = (pics)=>{
        setIsUploading(true)
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset","whatsappclone")
        data.append("cloud_name","kushvith")
        fetch("https://api.cloudinary.com/v1_1/kushvith/image/upload",{
            method:"post",
            body:data
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("image_url",data.url)
            setGroupImage(data.url)
            setIsUploading(false)
        })
    }
    const handlesubmit = ()=>{
            let userId = []
            for(let user of group){
                userId.push(user.id)
            }
            const chat = {
                userId,
                chat_name:content,
                chat_image:groupImage
            }
            const data = {
                chat,token
            }
            dispatch(createGroupChat(data))
            isSetgroup(false)
    }
  return (
    <div className='h-full w-full'>
        <div className='flex items-center space-x-10 bg-[#008069] text-white px-10 pt-16 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold'/>
            <p className='text-xl font-semibold'>New Group</p>
        </div>
        <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor="imgInput">
                <img src={groupImage||"https://cdn.pixabay.com/photo/2023/09/14/15/54/bird-8253245_1280.jpg"} alt="" className='max-h-[18vh] max-w-[18vh] h-[25rem] w-[25rem] rounded-full cursor-pointer' />
                {isUploading && <CircularProgress className='absolute top-[14rem] left-[14rem]'/>}
                <input type="file" className='hidden' id='imgInput' onChange={(e)=>uploadToCloudinary(e.target.files[0])} />
            </label>
        </div>
        <div className='w-full flex justify-between items-center py-2 px-5'>
            <input type="text" className='w-full outline-none border-b-2 border-green-700 bg-transparent p-2' onChange={(e)=>{setContent(e.target.value)}} placeholder='Group Name'/>
        </div>
        {content &&<div>
            <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center'>
                <div className='bg-green-600 p-3' onClick={()=>{
                    handlesubmit()
                }}>
                    <BsCheck2 className='text-white text-3xl'/>
                </div>
            </div>
            </div>}
    </div> 
  )
}

export default NewGroup