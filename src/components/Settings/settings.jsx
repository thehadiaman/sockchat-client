import React from "react";
import {Container, Grid} from "@mui/material";
import List from "../common/list";
import {Route} from 'react-router-dom';
import ProfileSettings from "./profileSettings";
import PasswordSettings from "./passwordSettings";
import DeleteAccountSettings from "./deleteAccountSettings";


function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

export default function Settings({user, setUser}){

    const settingsList = [{text: "Edit Profile", link: "/settings/profile"},
        {text: "Change Password", link: "/settings/password"},
        {text: "Delete Account", link: "/settings/delete"},
        {text: "Logout", fn: logout}];

    document.title = "Account Settings";

    return (<Container>
        <Grid container columns={{xs: 12}}>
            <Grid item xs={3} style={{border: '1px solid #dddddd'}}>
                <List list={settingsList}/>
            </Grid>
            <Grid item xs={9} style={{border: '1px solid #dddddd'}}>
                <Container>
                    <Route path={'/settings/profile'} render={(props)=><ProfileSettings user={user} setUser={setUser} {...props}/>}/>
                    <Route path={'/settings/password'} render={(props)=><PasswordSettings user={user} setUser={setUser} {...props}/>}/>
                    <Route path={'/settings/delete'} render={(props)=><DeleteAccountSettings user={user} {...props}/>}/>
                </Container>
            </Grid>
        </Grid>
    </Container>)
}