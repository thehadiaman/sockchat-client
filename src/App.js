import React, {useEffect, useState} from "react";
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from "./components/welcomePage/welcome";
import ResetPassword from "./components/resetPassword";
import {authUser} from "./services/userService";
import LoadePage from "./components/loadingPage/loadePage";

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
        return <div>Login succeed</div>;
    }

    return(
        <Switch>
            <Route exact path={'/'} render={(props)=><Welcome {...props}/>}/>
            <Route exact path={'/signup'} render={(props)=><Welcome {...props}/>}/>
            <Route exact path={'/forgetPassword'} render={(props)=><Welcome {...props}/>}/>
            <Route exact path={'/verification'} render={(props)=><Welcome {...props}/>}/>
            <Route path={'/resetPassword'} render={(props)=><ResetPassword {...props}/>}/>
            <Route render={(props)=><div><h1>404</h1></div>}/>
        </Switch>
    );
}

export default App;