import React, {useEffect, useState} from "react";
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from "./components/welcomePage/welcome";
import ResetPassword from "./components/resetPassword";
import {authUser} from "./services/userService";
import LoadePage from "./components/LoadingPage/loadePage";
import Profile from "./components/profile";
import Settings from "./components/Settings/settings";
import Home from "./components/home/home";
import NotFound from "./components/notFound";
import TopNavBar from "./components/TopNavBar/topNavBar";
import BottomNavBar from "./components/bottomNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {io} from "socket.io-client";

function App(){

    const [user, setUser] = useState({});
    const [isLoad, setLoad] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [socket, setSocket] = useState({});

    async function authenticateUser(){
        try {
            const jwt = localStorage.getItem('jwtToken');
            const user = (await authUser()).data;
            if (jwt !== null) setUser(user);
            setLogin(true);
        } catch (ex){
            localStorage.removeItem('jwtToken');
        }
        setLoad(true)
    }

    useEffect(() => {
        async function auth(){
            await authenticateUser();
            const newSocket = io('http://localhost:3001');
            await setSocket(newSocket);
        }
        auth();
    }, [setSocket]);

    if(!isLoad){
        return <LoadePage/>;
    }

    if(isLogin && socket.emit){
        socket.emit('new', user.username);
    }

    if(user.name){
        return <div>
            <TopNavBar user={user}/>
            <Switch>
                <Route exact path={'/verification'} render={(props)=><Welcome {...props}/>}/>
                <Route exact path={'/profile/:username'} render={(props)=><Profile socket={socket} user={user} {...props}/>}/>
                <Route path={'/settings'} render={(props)=><Settings user={user} setUser={authenticateUser} {...props}/>}/>
                <Route exact path={'/'} render={(props)=><Home user={user} {...props}/>}/>
                <Route render={(props)=><NotFound/>}/>
            </Switch>
            <BottomNavBar user={user}/>
        </div>;
    }

    return(
        <Switch>
            <Route exact path={'/signup'} render={(props)=><Welcome {...props}/>}/>
            <Route exact path={'/forgetPassword'} render={(props)=><Welcome {...props}/>}/>
            <Route path={'/resetPassword'} render={(props)=><ResetPassword {...props}/>}/>
            <Route exact path={'/'} render={(props)=><Welcome {...props}/>}/>
            <Route render={(props)=><NotFound/>}/>
        </Switch>
    );
}

export default App;