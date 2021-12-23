import React, {useState, useEffect} from "react";
import { ChatFeed } from 'react-chat-ui'
import { Container } from "@mui/material";

export default function ChatBox({messages, typing}){

    return (
        <Container>
            <ChatFeed
                messages={messages}
                isTyping={typing}
                hasInputField={false}
                bubblesCentered={false}
                bubbleStyles={
                    {
                        userBubble: {
                            background: '#dddddd',
                            padding: 10,
                            width: 'max-content',
                            maxWidth: '60%',
                            overflowWrap: 'break-word',
                        },
                        chatbubble: {
                            background: 'none',
                            border: '1px solid #dddddd',
                            padding: 10,
                            width: 'max-content',
                            maxWidth: '60%',
                            overflowWrap: 'break-word',
                        },
                        text: {
                            color: '#000000'
                        }
                    }
                }
            />
        </Container>
    )
}