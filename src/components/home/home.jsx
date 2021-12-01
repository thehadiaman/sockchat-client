import React from "react";
import StatusBar from './statusBar';

export default function Home({user}) {

    document.title = 'SockChat';

    return (
        <div>
            <StatusBar user={user}/>
        </div>
    );
};