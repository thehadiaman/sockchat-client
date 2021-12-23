import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Box, Avatar } from "@mui/material";
import { ArrowBackIosNew as ArrowBackIosIcon } from '@mui/icons-material';
import { useWindowSize } from "../common/windowSize";
import ChatBox from "./chatBox";
import ChatInput from "./chatInput";
import { Message } from 'react-chat-ui'

export default function Chat({user, match}){
    const [messages, setMessages] = useState([]);
    const history = useHistory();
    const size = useWindowSize();
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);

    useEffect(()=>{
        getInitialMessages();
    })

    async function getInitialMessages(){
        await setMessages([
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)"
            }),
            new Message({
                id: 0,
                message: "I'm you -- the blue bubble!" }),
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)"
            }),
            new Message({
                id: 0,
                message: "I'm you -- the blue bubble!" }),
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)"
            }),
            new Message({
                id: 0,
                message: "I'm you -- the blue bubble!" }),
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)"
            }),
            new Message({
                id: 0,
                message: "I'm you -- the blue bubble!1231231231231212312312312312123123121231231231231231231231212312312123123123123123123123121231231212312312312312312312312123123121231231231231231231231212312312123123123123123123123121231231212312312312312312312312123123121231231231231231231231212312312123123123123123123123121231231212312312312312312312312123123121231231231231231231231212312312123123123" }),
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)"
            }),
            new Message({
                id: 0,
                message: "I'm you -- the blue bubble!" }),
            new Message({
                id: 0,
                message: <span><img className={"chat-img"} src={"https://picsum.photos/500"}  alt={"..."} />Messages</span> }),
            new Message({
                id: 1,
                message: <span><img className={"chat-img"} src={"https://picsum.photos/100/20"} height={'max-height'} alt={"..."} />HELLo</span> }),
            new Message({
                id: 1,
                message: <span><img className={"chat-img"} src={"https://picsum.photos/800/200"} height={'max-height'} alt={"..."} />HELLo</span> }),
        ]);
        scrollElement('main-chat-container');
    }

    async function handleChange({value}){
        setMessage(value)
    }

    async function handleMessageSubmit({key}){
        if(!(key==='Enter' && message.trim()!=='')) return;
        setMessage('');
        const copy_of_messages = [...messages];
        const new_message = new Message({
            id: 0,
            message
        });
        copy_of_messages.push(new_message);
        await setMessages(copy_of_messages);
        scrollElement('main-chat-container');
    }

    function scrollElement(class_name){
        const element = document.getElementsByClassName(class_name)[0];
        element.scrollTo(0, element.scrollHeight)
    }

    return <div>
        <AppBar position={size.width>900?"static":"fixed"} sx={{backgroundColor: '#fff', padding: "10px", boxShadow: 'none', borderBottom: '1px solid #dddddd'}}>
            <Toolbar>
                <Avatar className={"cursor-pointer"} onClick={()=>history.push('/profile/hadiaman')}/> <span className={"cursor-pointer"} onClick={()=>history.push('/profile/hadiaman')} style={{color: 'black', marginLeft: "5px"}}>hadiaman</span>
                <Box sx={{ flexGrow: 1 }}/>
                {size.width<900&&<IconButton edge={"end"} onClick={()=>history.replace('/inbox')}><ArrowBackIosIcon fontSize={"large"}/></IconButton>}
            </Toolbar>
        </AppBar>
        <div className="main-chat-container" style={size.width>900?{}:{marginBottom: "45px"}} ><ChatBox messages={messages} user={user} typing={typing} /></div>
        <ChatInput value={message} handleMessageSubmit={handleMessageSubmit} handleChange={handleChange}/>
    </div>
}