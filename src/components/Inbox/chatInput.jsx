import React, {useState} from "react";
import {IconButton, InputBase, AppBar, Toolbar} from "@mui/material"
import {EmojiEmotions as EmojiEmotionsIcon, AddPhotoAlternate as AddPhotoAlternateIcon, Send as SendIcon} from '@mui/icons-material';
import { useWindowSize } from "../common/windowSize";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'
import Pop from "../common/popover";

export default function ChatInput({handleMessageSubmit, handleChange, value, addEmoji}){

    const size = useWindowSize();
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [emojiPickerTarget, setEmojiPickerTarget] = useState(null);

    function openEmojiPicker(target){
        setEmojiOpen(true);
        setEmojiPickerTarget(target);
    }

    function closeEmojiPicker(){
        setEmojiOpen(false);
        setEmojiPickerTarget(null);
    }

    const emojiContent = <Picker
        style={{width: '100%'}}
        onClick={({native})=>addEmoji(native)}
    />;

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
            <IconButton sx={{ p: '10px' }} onClick={({target})=>openEmojiPicker(target)}>
                <EmojiEmotionsIcon />
            </IconButton>
            <InputBase
                autoFocus onKeyPress={handleMessageSubmit} value={value} className={'chat-input'} onChange={({target})=>handleChange(target)}
            />
            <IconButton sx={{ p: '10px' }}>
                <AddPhotoAlternateIcon />
            </IconButton>
            {
                value.trim()!==''&&<IconButton onClick={()=>handleMessageSubmit({key: 'Enter'})} sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            }
            {emojiOpen&&<Pop open={emojiOpen} target={emojiPickerTarget} closeDropDownMenu={closeEmojiPicker} content={emojiContent} closeOnCLick={true} placement={"top"} scroll={'none'}/>}
        </Toolbar>
    </AppBar>
}