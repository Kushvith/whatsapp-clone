import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import SelectedMember from './SelectedMember'
import ChatCard from '../ChatCard/ChatCart'
import NewGroup from './NewGroup'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Redux/store'
import { searchUser } from '../../Redux/Auth/Action'

const CreateGroup = ({isSetgroup}) => {
    const [newGroup,setNewGroup] = useState(false)
    const [groupMember,setGroupMember] = useState(new Set())
    const [query,setQuery] = useState("");
    const {auth} = useSelector((store)=>store)
    const dispatch = useDispatch()
    const token =localStorage.getItem("jwt")
    const handleRemoveMember = (item) =>{
        console.log(item)
        groupMember.delete(item)
        console.log(groupMember)
        setGroupMember(groupMember)
    }
    const handleSearch = (keyword)=>{
        dispatch(searchUser({keyword,token}))
    }
  return (
    <div className='w-full h-full'>
        {!newGroup && (
        <div>
        <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold'/>
            <p className='text-xl font-semibold'>Add Group partipitants</p>
            </div>
            <div className='relative bg-white py-4 px-3'>
                <div className='flex space-x-2 flex-wrap space-y-1'>
                    {groupMember.size>0 && Array.from(groupMember).map((item)=>
                    {
                        
                        return <SelectedMember handleRemoveMember={()=>handleRemoveMember(item)} member={item}/>})}
                </div>
                <input type="text" onChange={(e)=>{
                    handleSearch(e.target.value)
                    setQuery(e.target.value)
                }} className='outline-none border-b border-[#8888] p-2 w-[93%]' placeholder='search user' value={query} />
            </div>
            <div className='bg-white overflow-y-scroll h-[50.2vh]'>
                {query && auth?.searchuser?.map((item)=><div
                    onClick={
                        ()=>{
                            groupMember.add(item)
                            setGroupMember(groupMember)
                            setQuery("")
                        }
                    }
                    key={item?.id}
                >
                    <hr />{
                        auth.requser?.id !=item?.id &&<ChatCard name={item?.full_name} userImage={item?.profile_picture}/>
                    }
                    
                </div>)}
                
            </div>
            <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center'>
                <div className='p-5 bg-[#008069] rounded-full cursor-pointer'
                onClick={()=>{setNewGroup(true)}}
                >
                    <BsArrowRight className='text-3xl font-bold text-white'/>
                </div>
            </div>
            </div>
            )}
            {newGroup && <NewGroup group={groupMember} isSetgroup={isSetgroup}/>}
    </div>
  )
}

export default CreateGroup