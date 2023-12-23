import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType"

const intialstate = {
    messages:null,
    newmessages:null
}

export const messageReducer = (state = intialstate,{type,payload}) =>
{
    if(type == CREATE_NEW_MESSAGE){
        return {...state,newmessages:payload}
    }
    else if(type == GET_ALL_MESSAGES){
        return {...state,messages:payload}
    }
    return state;
}