import React from "react";
import {IconButton, InputBase, AppBar, Toolbar} from "@mui/material"
import {EmojiEmotions as EmojiEmotionsIcon, AddPhotoAlternate as AddPhotoAlternateIcon, Send as SendIcon} from '@mui/icons-material';
import { useWindowSize } from "../common/windowSize";

export default function ChatInput({handleMessageSubmit, handleChange, value}){

    const size = useWindowSize();

    const inputContainerStyle = {
        display: 'flex',
        border: '1px solid #dddddd',
        top: 'auto',
        bottom: 0,
        backgroundColor: '#ffffff',
        borderRadius: size.width>900?"20px":"0",
        boxShadow: 'none'
    };

    return <AppBar position={size.width>900?"static":"fixed"} sx={inputContainerStyle}>
        <Toolbar>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <EmojiEmotionsIcon />
            </IconButton>
            <InputBase
                autoFocus onKeyPress={handleMessageSubmit} value={value} className={'chat-input'} onChange={({target})=>handleChange(target)}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <AddPhotoAlternateIcon />
            </IconButton>
            {
                value.trim()!==''&&<IconButton onClick={()=>handleMessageSubmit({key: 'Enter'})} sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            }
        </Toolbar>
    </AppBar>
}