import React from "react";


export default function ChatInput({handleMessageSubmit, handleChange, value}){
    return <input autoFocus onKeyPress={handleMessageSubmit} value={value} className={'chat-input'} onChange={({target})=>handleChange(target)} />
}