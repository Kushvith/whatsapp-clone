
import { Alert, Button, Snackbar } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { currentUser, register } from '../../Redux/Auth/Action'
import { store } from '../../Redux/store'

const Signup = () => {
    const [inputData,setInputData] = useState({full_name:"",email:"",password:""})
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {auth} = useSelector(store=>store)
    const token = localStorage.getItem("token")
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(register(inputData))
        setOpenSnackBar(true)
    }
    const handleChange = (e) =>{
       const {name,value} = e.target
        setInputData((values)=>({...values,[name]:value}))
    }
    const handleCloseSnackbar = ()=>{
        setOpenSnackBar(false)
    }
    useEffect(()=>{
        if(token){
            dispatch(currentUser(token))
        }
    },[token])
    useEffect(()=>{
        if(auth.requser?.full_name){
            navigate("/")
        }
    },[auth.requser])
  return (
    <div>
        <div className='flex justify-center h-screen items-center'>
            <div className='w-[30%] p-10 shadow-md bg-white'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                        <p className='mb-2'>full name</p>
                        <input type="text"
                            placeholder='Enter your first name'
                            name='full_name'
                            onChange={(e)=>handleChange(e)}
                            value={inputData.full_name}
                            className='py-2 outline-green-600 w-full rounded-md border px-2'
                        />
                    </div>
                    <div>
                        <p className='mb-2'>Email</p>
                        <input type="text"
                            placeholder='Enter your Email'
                            onChange={(e)=>handleChange(e)}
                            name='email'
                            value={inputData.email}
                            className='py-2 outline-green-600 w-full rounded-md border px-2'
                        />
                    </div>
                    <div>
                        <p className='mb-2'>Password</p>
                        <input type="password"
                            placeholder='Enter your Password'
                            name='password'
                            onChange={(e)=>handleChange(e)}
                            value={inputData.password }
                            className='py-2 outline-green-600 w-full rounded-md border px-2'
                        />
                    </div>
                    <div>
                        <Button variant='contained' type='submit' className='w-full' sx={{background:green[500],padding:"0.5rem"}}>Sign In</Button>
                    </div>
                </form>
                <div className='flex space-x-3 items-center mt-5'>
                    <p>Already have Account</p>
                    <Button variant='text' onClick={()=>navigate("/signin")}>signIn</Button>
                </div>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    action={handleCloseSnackbar}
                ><Alert onClose={handleCloseSnackbar} severity='success' sx={{width:'100%'}}>
                    this is Success message    
                </Alert>
                </Snackbar>
            </div>
        </div>
    </div>
  )
}

export default Signup