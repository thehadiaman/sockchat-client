import React from "react";
import {Container, Grid, Avatar, AppBar, IconButton, Button, Toolbar, Box, Divider} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import List from "../common/list";
import {Route, useHistory} from 'react-router-dom';
import {renderInboxIcon} from "../common/svgImages";
import {useWindowSize} from "../common/windowSize";
import Chat from "./chat";

export default function Inbox({user}){

    const size = useWindowSize();
    const history = useHistory();

    const settingsList = [
        {text: "hadiaman", link: "/inbox/6t7TIGHIYTFUY", icon: <Avatar/>, bold: true, newMessage: true, lastMessage: "Hai"},
        {text: "hadi.aman", link: "/inbox/6678FTRYHBYGU", icon: <Avatar/>, bold: true, newMessage: true, lastMessage: "Hai"},
    ];

    document.title = "Inbox";

    return (<Container style={size.width<900?{paddingLeft: "0", paddingRight: "0"}:{}}>
        <Container style={size.width<900?{paddingLeft: "0", paddingRight: "0"}:{}}>
        <Grid container columns={{xs: 12, sm: 12, md: 12, lg: 12}}>
            {(size.width>=900||(history.location.pathname==='/inbox'))&&(
                <Grid item xs={12} dm={12} md={4} lg={4} style={{border: '1px solid #dddddd'}}>
                    <AppBar position="static" sx={{backgroundColor: '#fff', padding: '10px', boxShadow: 'none'}}>
                        <Toolbar>
                            <Button>Followers</Button>
                            <Box sx={{ flexGrow: 1 }}/>
                            <IconButton edge={"end"}><AddIcon fontSize={"large"}/></IconButton>
                        </Toolbar>
                    </AppBar>
                    <Divider/>
                    <List list={settingsList}/>
                </Grid>)
            }
            <Grid item xs={12} sm={12} md={8} lg={8} style={{border: '1px solid #dddddd'}}>
                    <Route exact path={'/inbox/:id'} render={(props)=><Chat user={user} {...props} />}/>
                    {
                        (history.location.pathname==='/inbox')&&(size.width>=900)&&(
                            <Route exact path={'/inbox'}>
                                <center>
                                    {renderInboxIcon()}
                                    <h1>Inbox</h1>
                                </center>
                            </Route>
                        )
                    }
            </Grid>
        </Grid>
        </Container>
    </Container>)
}