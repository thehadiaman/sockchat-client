import React, {useState, useEffect} from "react";
import {Container, Grid} from "@mui/material";
import List from "../common/list";
import {Route, useHistory} from 'react-router-dom';
import ProfileSettings from "./profileSettings";
import PasswordSettings from "./passwordSettings";
import DeleteAccountSettings from "./deleteAccountSettings";
import {renderSettingsGear} from "../common/svgImages";

function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default function Settings({user, setUser}){

    const size = useWindowSize();
    const history = useHistory();

    const settingsList = [{text: "Edit Profile", link: "/settings/profile", center: (size.width<900)},
        {text: "Change Password", link: "/settings/password", center: (size.width<900)},
        {text: "Delete Account", link: "/settings/delete", center: (size.width<900)},
        {text: "Logout", fn: logout, center: (size.width<900)}];

    document.title = "Account Settings";

    return (<Container>
        {(size.width >= 900 || (history.location.pathname === '/settings')) && (<h1>Settings</h1>)}
        <Grid container columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
            {(size.width>=900||(history.location.pathname==='/settings'))&&(
                <Grid item xs={12} dm={12} md={3} lg={3} style={{border: '1px solid #dddddd'}}>
                    <List list={settingsList}/>
                </Grid>)
            }
            <Grid item xs={12} sm={12} md={9} lg={9} style={{border: '1px solid #dddddd'}}>
                <Container>
                    <Route exact path={'/settings/profile'} render={(props)=><ProfileSettings user={user} setUser={setUser} {...props}/>}/>
                    <Route exact path={'/settings/password'} render={(props)=><PasswordSettings user={user} setUser={setUser} {...props}/>}/>
                    <Route exact path={'/settings/delete'} render={(props)=><DeleteAccountSettings user={user} setUser={setUser} {...props}/>}/>
                    {
                        (history.location.pathname==='/settings')&&(size.width>=900)&&(
                            <Route exact path={'/settings'}>
                                <center>
                                    {renderSettingsGear()}
                                    <h1>Settings</h1>
                                </center>
                            </Route>
                        )
                    }
                </Container>
            </Grid>
        </Grid>
    </Container>)
}