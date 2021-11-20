import React, {Component} from "react";
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Welcome from "./components/home";

class App extends Component {
    render() {
        return(
            <Switch>
                <Route exact path={'/'} render={(props)=><Welcome {...props}/>}/>
                <Route exact path={'/signup'} render={(props)=><Welcome {...props}/>}/>
                <Route exact path={'/forgetPassword'} render={(props)=><Welcome {...props}/>}/>
                <Route render={(props)=><div><h1>404</h1></div>}/>
            </Switch>
        );
    }
}

export default App;