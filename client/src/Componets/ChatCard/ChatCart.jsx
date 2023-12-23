
 const ChatCard = ({userImage,name})=>{
    return(
        <div className="flex items-center justify-center px-3 py-2 cursor-pointer"> 
            <div className="w-[20%] p-3">
            <img className="rounded-full w-14 h-14 cursor-pointer" src={userImage || "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg"} alt="" />
            </div>
            <div className=" w-[80%]">
                <div className="flex justify-between items-center">
                    <p className="text-lg">{name}</p>
                    <p className="text-sm"> timestamp</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Message..</p>
                    <div className="flex space-x-2 items-center">
                    <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">5</p>
                </div>
                </div>
                
            </div>
        </div>
    );
 }
 export default ChatCard;