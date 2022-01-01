import React from "react";
import StatusBar from './statusBar';
import Post from "../common/post";
import {Container} from "@mui/material";

export default function Home({user}) {

    document.title = 'SockChat';

    return (
        <Container sx={{mb: '20px'}}>
            <StatusBar user={user}/>
            <Post/>
        </Container>
    );
};