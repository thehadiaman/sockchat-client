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
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <Route exact path={'/profile'} render={(props)=><Profile user={user} {...props}/>}/>
                <Route path={'/settings'} render={(props)=><Settings user={user} {...props}/>}/>
                <Route exact path={'/'} render={(props)=><Home user={user} {...props}/>}/>
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