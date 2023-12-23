import { LOGIN, LOGOUT_USER, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType"

const intializer = {
    signin:null,
    signup:null
}

export const authReducer = (store = intializer,{type,payload}) =>{
    if(type == REGISTER){
        return {...store,signup:payload}
    }
    else if(type == LOGIN){
        return {...store,signin:payload}
    }
    else if(type == REQ_USER){
        return {...store,requser:payload}
    }
    else if(type == SEARCH_USER){
        return {...store,searchuser:payload}
    }
    else if(type == UPDATE_USER){
        return {...store,updateuser:payload}
    }
    else if(type == LOGOUT_USER){
        return intializer
    }
    return store
}