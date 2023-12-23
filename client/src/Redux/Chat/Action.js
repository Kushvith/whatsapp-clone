import { base_url } from "../../config/app"
import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHATS } from "./ActionType"

export const createSingleChat = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/api/single`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${data.token}`
            },
            body:JSON.stringify(data.chat)
            
        })
        const chat = await res.json()
        console.log("chat",chat)
        dispatch({type:CREATE_CHAT,payload:chat})

    } catch (error) {
        console.log(error)
    }
}

export const createGroupChat = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/api/group`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${data.token}`
            },
            body:JSON.stringify(data.chat)
            
        })
        const chat = await res.json()
        console.log("chat",chat)
        dispatch({type:CREATE_GROUP,payload:chat})

    } catch (error) {
        console.log(error)
    }
}

export const GetAllChat = (token) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/api/user`,{
            method:"GET",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            
        })
        const chat = await res.json()
        console.log("chat",chat)
        dispatch({type:GET_USER_CHATS,payload:chat})

    } catch (error) {
        console.log(error)
    }
}