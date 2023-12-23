import { AiOutlineClose } from "react-icons/ai"
import { StatusCard } from "./StatusCard"
import { useNavigate } from "react-router-dom"

const Status = ()=>{
    const navigate = useNavigate()
    const handleNavigateBack = ()=>{
        navigate("/status/{userId}")
    }
    return (
        <div>
            <div className="flex items-center px-[14vw] py-[7vh]">
                <div className="left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-5">
                    <div className="pt-5 h-[13%]">{<StatusCard/>}  <hr /></div>
                   <div className="overflow-y-scroll h-[85%] pt-2">
                    {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item)=><StatusCard/>)}
                   </div>

                </div>
                <div className="relative right h-[85vh] bg-[#0b141a] lg:w-[70%] w-[50%]">
                    <AiOutlineClose className="absolute text-2xl top-5 right-10 text-white cursor-pointer" onClick={handleNavigateBack}/>
                </div>
            </div>
        </div>
    )
}
export default Status