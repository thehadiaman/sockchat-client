import React, {useState, useRef} from "react";
import {IconButton, InputBase, AppBar, Toolbar} from "@mui/material"
import {EmojiEmotions as EmojiEmotionsIcon, AddPhotoAlternate as AddPhotoAlternateIcon, Send as SendIcon} from '@mui/icons-material';
import { useWindowSize } from "../common/windowSize";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'
import Pop from "../common/popover";

export default function ChatInput({handleMessageSubmit, handleChange, value, addEmoji, setImageMessage, isImageMessage, setImage, image}){

    const size = useWindowSize();
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [emojiPickerTarget, setEmojiPickerTarget] = useState(null);
    const imageInputRef = useRef(null);

    function openEmojiPicker(target){
        setEmojiOpen(true);
        setEmojiPickerTarget(target);
    }

    function closeEmojiPicker(){
        setEmojiOpen(false);
        setEmojiPickerTarget(null);
    }

    function handleAddImageButtnn(){
        imageInputRef.current.click();
    }

    async function handleChangeImageInput(e){
        if(e.target.files.length>0){
            await setImageMessage(true);
            const src = URL.createObjectURL(e.target.files[0]);
            setImage(src);
        }
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
            <IconButton sx={{ p: '10px' }} onClick={handleAddImageButtnn}>
                {
                    isImageMessage? <img height={"30px"} src={image} alt="chat"/>:<AddPhotoAlternateIcon />
                }
            </IconButton>
            {
                (value.trim()!==''||isImageMessage)&&<IconButton onClick={()=>handleMessageSubmit({key: 'Enter'})} sx={{ p: '10px' }} aria-label="directions">
                    <SendIcon />
                </IconButton>
            }
            {emojiOpen&&<Pop open={emojiOpen} target={emojiPickerTarget} closeDropDownMenu={closeEmojiPicker} content={emojiContent} closeOnCLick={true} placement={"top"} scroll={'none'}/>}
        </Toolbar>
        <input type={"file"} style={{display: 'none'}} ref={imageInputRef} onChange={handleChangeImageInput} alt={"input-image"} />
    </AppBar>
}