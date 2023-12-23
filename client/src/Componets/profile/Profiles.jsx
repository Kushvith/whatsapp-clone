import { useState } from "react"
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { store } from "../../Redux/store"
import { updateUser } from "../../Redux/Auth/Action"

const Profiles = ({handleProfile}) =>{
    const [flag,setFlag] = useState(false)

    const [username,setUsername] = useState("")
    const [imagePicture,setImagePicture] = useState("")
    const {auth} = useSelector((store)=>store)
    const handleEdit = ()=>{
        setFlag(true)
    }
    const handleUserEdit = (e)=>{
        setUsername(e.target.value)
    }
    const handleEditTick = ()=>{
        const data = {
            token:localStorage.getItem("jwt"),
            group:{full_name:username}
        }
        dispatch(updateUser(data))
        setFlag(false)
    }
    const handleBackHome = () =>{
        handleProfile(false)
    }
    const dispatch = useDispatch()
    // https://api.cloudinary.com/v1_1/kushvith
    const uploadToCloudinary = (pics)=>{
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
            setImagePicture(data.url)
            console.log("image_url",data.url)
            const dataa = {
                id:auth.requser.id,
                token:localStorage.getItem("jwt"),
                group:{profile_picture:data.url}
            }
            dispatch(updateUser(dataa))
        })
    }
    return (
        <div>
            <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
                <BsArrowLeft className="cursor-pointer text-2xl font-bold" onClick={handleBackHome}/>
                <p className="font-semibold cursor-pointer"> Profile</p>
            </div>
            <div className="flex flex-col justify-center items-center my-12">
                <label htmlFor="imgInput">
                <img  className="rounded-full w-[15vw] h-[15vw] cursor-pointer" src={imagePicture? imagePicture : auth.requser?.profile_picture || "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg"} alt="" />
                    <input type="file" id="imgInput" hidden onChange={(e)=>uploadToCloudinary(e.target.files[0])}/>
                </label>
            </div>
            <div className="bg-white px-3">
                <p className="py-2">Your Name</p>
            {!flag && <div className="flex justify-between items-center">
                <p className="py-3">{username ? username : auth.requser?.full_name||"username"}</p>
                <BsPencil className="cursor-pointer" onClick={handleEdit}/>
            </div>}
            {flag && <div className="flex justify-between items-center">
                <input type="text" onChange={handleUserEdit} placeholder="Enter Your Name" value={username}className="p-2 border-b-2 border-blue-700 p-2 outline-none w-[80%]" />
                <BsCheck2 className="cursor-pointer text-2xl" onClick={handleEditTick}/>
            </div>}
            </div>
        </div>
    )
}
export default Profiles