import { base_url } from "../../config/app"
import { LOGIN, LOGOUT_USER, REGISTER, REQ_USER, SEARCH_USER } from "./ActionType"

export const register = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/auth/signup`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(data)
            
        })
        const user = await res.json()
        console.log("user ",user)
        if(user.message && user.status == true){
            localStorage.setItem("jwt",user.message)
        }
        dispatch({type:REGISTER,payload:user})
    } catch (error) {
        console.log(error)
    }
}

export const login = (data) => async (dispatch)=>{
    try {
        const res = await fetch(`${base_url}/auth/loginin`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(data)
            
        })
        const user = await res.json()
        console.log("user ",user)
        if(user.message && user.status == true){
            localStorage.setItem("jwt",user.message)
        }
        dispatch({type:LOGIN,payload:user})
    } catch (error) {
        console.log(error)
    }
}
export const currentUser = (token) => async (dispatch) =>{
    try {
        const res = await fetch(`${base_url}/api/users/profile`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const resData = await res.json()
        console.log("user Data ",resData)
        dispatch({type:REQ_USER,payload:resData})
        
    } catch (error) {
        console.log(error)
    }
}

export const searchUser = (data) => async (dispatch) =>{
    try {
        const res = await fetch(`${base_url}/api/users/search?query=${data.keyword}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${data.token}`
            },
        })
        const resData = await res.json()
        console.log("search Data ",resData)
        dispatch({type:SEARCH_USER,payload:resData})
        
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (data) => async (dispatch) =>{
    try {
        const res = await fetch(`${base_url}/api/users/update`,{
            method:"PUT",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${data.token}`
            },
            body:JSON.stringify(data.group) 
        })
        const resData = await res.json()
        console.log("search Data ",resData)
        dispatch({type:SEARCH_USER,payload:resData})
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = ()=>async(dispatch)=>{
    await localStorage.removeItem("jwt")
    dispatch({type:REQ_USER,payload:null})
    dispatch({type:LOGOUT_USER,payload:null})
}
