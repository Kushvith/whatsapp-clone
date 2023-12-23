import { Alert, Button, Snackbar } from '@mui/material'
import { green } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentUser, login } from '../../Redux/Auth/Action'
import { store } from '../../Redux/store'

const Signin = () => {
    const [inputData,setInputData] = useState({email:"",password:""})
    const [openSnackBar,setOpenSnackBar] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem("jwt")
    const {auth} = useSelector(store=>store)
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(inputData))
        setOpenSnackBar(true)
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
    const handleChange = (e) =>{
        const {name,value} = e.target
        setInputData((values)=>({...values,[name]:value}))
    }
    const handleCloseSnackbar = ()=>{
        setOpenSnackBar(false)
    }
  return (
    <div>
        <div className='flex justify-center h-screen items-center'>
            <div className='w-[30%] p-10 shadow-md bg-white'>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <p className='mb-2'>Email</p>
                        <input type="text"
                            placeholder='Enter your Email'
                            name='email'
                            onChange={(e)=>handleChange(e)}
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
                    <p>Create new Account</p>
                    <Button variant='text' onClick={()=>navigate("/signup")}>signUp</Button>
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

export default Signin