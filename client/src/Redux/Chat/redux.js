import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHATS } from "./ActionType"

const intialValue = {
    chats:[],
    createGroup:null,
    createChat:null
}

export const chatReducer = (store=intialValue,{type,payload}) =>{
    if(type == CREATE_CHAT){
        return ({...store,createChat:payload})
    }
    else if(type == CREATE_GROUP){
        return ({...store,createGroup:payload})
    }
    else if(type == GET_USER_CHATS){
        console.log("chat payload ",payload)
        return ({...store,chats:payload})
    }
    return store;
}