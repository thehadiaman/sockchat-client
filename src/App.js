import React, {useEffect, useState} from "react";
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from "./components/welcomePage/welcome";
import ResetPassword from "./components/resetPassword";
import {authUser} from "./services/userService";
import LoadePage from "./components/loadingPage/loadePage";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import TopNavBar from "./components/topNavBar";
import BottomNavBar from "./components/bottomNavBar";

function App(){

    const [user, setUser] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(() => {
        async function auth(){
            try {
                const jwt = localStorage.getItem('jwtToken');
                const user = (await authUser()).data;
                if (jwt !== null) setUser(user);
            } catch (ex){
                localStorage.removeItem('jwtToken');
            }
            setLoad(true)
        }
        auth();
    }, []);

    if(!load){
        return <LoadePage/>;
    }

    if(user.name){
        return <div>
            <TopNavBar user={user}/>
            <Switch>
                <Route exact path={'/verification'} render={(props)=><Welcome {...props}/>}/>
                <Route exact path={'/'} render={(props)=><Profile user={user} {...props}/>}/>
                <Route render={(props)=><NotFound/>}/>
            </Switch>
            <BottomNavBar/>
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