import { TbCircleDashed } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi";
import { BsFilter, BsEmojiSmile, BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import Button from "@mui/material/Button"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChatCard from "./ChatCard/ChatCart";
import { useEffect, useState } from "react";
import MessageCard from "./MessageCard/MessageCard";
import "./HomePage.css"
import Profile from "./profile/Profiles";
import { useNavigate } from "react-router-dom";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout, searchUser } from "../Redux/Auth/Action";
import { store } from "../Redux/store";
import { GetAllChat, createSingleChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../Redux/Message/Action";
import {overWS} from "stompjs"

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [currentChat, setCurrentChat] = useState(null)
    const [content, setContent] = useState("")
    const [isProfile, setIsProfile] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isGroup, setIsGroup] = useState(false)
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const { auth, message, chat } = useSelector(store => store)
    const token = localStorage.getItem("jwt")
    useEffect(() => {
        if (!auth.requser) {
            navigate("/signin")
        }
    }, [auth.requser])
    useEffect(()=>{
        if(currentChat?.id ){
            dispatch(getAllMessages({token,chatId:currentChat?.id}))
        }
       
    },[currentChat,message.newmessages])
    useEffect(() => {
        dispatch(GetAllChat(token))
    }, [chat.createChat, chat.createGroup])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate()
    const handleSearch = (keyword) => {
        dispatch(searchUser({ keyword, token }))
    }
    const handleCreateMessage = (chatId) => {
        dispatch(createMessage({token,message:{chatId:chatId,content}}))
    }
    const handleClickOnChatCard = (item) => {

        dispatch(createSingleChat({ token, chat: { id: item.id } }))
        // setCurrentChat(item)
        setQuery("")

    }
    const handleNavigateProfile = () => {
        setIsProfile(true)
    }
    const handleCreateGroup = () => {
        setIsGroup(true)
    }
    const handleLogout = () => {
        dispatch(logout())
        navigate("/signin")
    }
    const handleCurrentChat = (item) => {
        setCurrentChat(item)
    }
    return (
        <div className="relative">
            <div className="py-14 bg-[#00a884] w-full"></div>
            <div className="flex bg-[#fef2f5] h-[94vh] absolute top-6 left-6 w-[98vw]">
                <div className="left w-[30%] bg-[#e8e9ec] h-full ">
                    {isGroup && <CreateGroup isSetgroup={setIsGroup}/>}
                    {isProfile && <Profile handleProfile={setIsProfile} />}
                    {!isGroup && !isProfile && <div>
                        <div className="px-3">
                            <div className="flex justify-between items-center p-3">
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <img onClick={handleNavigateProfile} className="rounded-full w-10 h-10 " src="https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg" alt="" />
                                    <p>{auth.requser?.full_name}</p>
                                </div>


                                <div className="space-x-3 flex text-2xl cursor-pointer items-center">
                                    <TbCircleDashed onClick={() => navigate("/status")} />
                                    <BiCommentDetail />


                                    <BsThreeDotsVertical id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick} />

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>


                                </div>

                            </div>


                        </div>
                        <div className="relative flex justify-center items-center bg-white py-3 px-3 ">
                            <input className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-3"
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                value={query}
                                placeholder="search or start new chat" type="text" />
                            <AiOutlineSearch className="absolute left-6 text-lg" />
                            <BsFilter className="text-3xl ml-2" />
                        </div>
                        <div className="bg-white overflow-y-scroll h-[76.8vh]">
                            {query && auth.searchuser?.map((item) => <div onClick={() => handleClickOnChatCard(item)}><hr />{auth.requser?.id !== item.id && <ChatCard name={item.full_name} userImage={item.profile_picture} />}</div>)}
                            {chat.chats.length > 0 && !query && chat?.chats?.map((item) => {

                                return <div onClick={() => handleCurrentChat(item)}>
                                    <hr />


                                    {item.group ?

                                        <ChatCard name={item.chat_name} userImage={item.chat_image} />
                                        :

                                        <ChatCard
                                            name={auth.requser?.id !== item.users[0].id ? item.users[0]?.full_name : item.users[1]?.full_name}
                                            userImage={auth.requser?.id !== item.users[0].id ? item.users[0]?.profile_picture : item.users[1]?.profile_picture}
                                        />
                                    }
                                </div>
                            })}
                        </div>
                    </div>}
                </div>
                <div className="right w-full">
                    {!currentChat && <div className="flex flex-col items-center justify-center h-full">
                        <div className="max-w-[70%] text-center">
                            <img className="rounded-full w-15 h-15 cursor-pointer" src="/images/web image.png" alt="" />
                            <h1 className="text-4xl cursor-pointer text-gray-400">WhatsApp web</h1>
                            <p className="my-9 cursor-pointer opacity-50">Make calls, share your screen and get a faster experience when you download the Windows app.</p>
                        </div>
                    </div>}
                    {currentChat &&
                        <div>
                            <div className="header bg-[#f0f2f5]">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center space-x-3 px-2 py-3">
                                        <img className="rounded-full w-10 h-10 cursor-pointer" src={currentChat.group ? currentChat.chat_image || "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg" : auth.requser?.id == currentChat.users[0].id ? currentChat.users[1].profile_picture || "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg" : currentChat.users[0].profile_picture || "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_640.jpg"} alt="" />
                                        <p className="text-gray">{currentChat.group ? currentChat.chat_name : auth.requser?.id == currentChat.users[0].id ? currentChat.users[1].full_name : currentChat.users[0].full_name}</p>
                                    </div>
                                    <div className="py-3 space-x-3 items-center px-3 flex text-2xl">
                                        <AiOutlineSearch />
                                        <BsFilter />
                                    </div>
                                </div>
                            </div>
                            <div className="px-10 h-[85vh] overflow-y-scroll ">
                                <div className="flex flex-col space-y-1 justify-center mt-2 py-2">
                                    {message.messages?.map((item, i) => <MessageCard isReqUserMessage={auth.requser.id == item.user?.id ? false:true} content={item.content} />)}
                                </div>
                            </div>
                            <div className="footer bg-[#f0f3f5] absolute bottom-0 w-[75%] py-3">
                                <div className="flex items-center justify-between px-6 text-2xl">
                                    <div className="flex space-x-5">
                                        <BsEmojiSmile className="cursor-pointer" />
                                        <ImAttachment />
                                    </div>
                                    <input className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[90%]"
                                        placeholder="type a message here"
                                        type="text" onChange={(e) => { setContent(e.target.value) }} value={content}
                                        onKeyPress={
                                            (e) => {
                                                if (e.key == "Enter") {
                                                    handleCreateMessage(currentChat.id)
                                                    setContent("")
                                                }
                                            }
                                        }
                                    />
                                    <BsMicFill />
                                </div>
                            </div>
                        </div>}
                </div>
            </div>

        </div>
    );
}
export default HomePage;