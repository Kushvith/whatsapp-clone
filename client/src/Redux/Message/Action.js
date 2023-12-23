import { base_url } from "../../config/app"
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType"

export const createMessage = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/api/messages/create`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${data.token}`
            },
            body:JSON.stringify(data.message)
            
        })
        const message = await res.json()
        console.log("chat",message)
        dispatch({type:CREATE_NEW_MESSAGE,payload:message})

    } catch (error) {
        console.log(error)
    }
}

export const getAllMessages = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/api/messages/chat/${data.chatId}`,{
            method:"GET",
            headers:{
                "content-Type":"application/json",
                "Authorization":`Bearer ${data.token}`
            }
            
        })
        const allMessages = await res.json()
        console.log("messages",allMessages)
        dispatch({type:GET_ALL_MESSAGES,payload:allMessages})

    } catch (error) {
        console.log(error)
    }
}