import React from 'react';
import {AppBar, Container, Box, Toolbar} from '@mui/material';
import logo from "../images/logo.png";
import SearchBar from "./search";
import TopNavBarMenu from "./topNavBarMenu";

export default function TopNavBar({user, notificationTrue}) {
    return (
        <AppBar position="static" sx={{backgroundColor: 'rgba(var(--d87,255,255,255),1)', marginBottom: '20px'}}>
            <Container>
                <Toolbar>
                    <Box
                        sx={{ marginRight: {xs: '10px'} }}
                    >
                        <img className={'title-image'} src={logo} alt="Logo" width={'70px'} height={'20px'}/>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        (!(user.name&&!user.verification.verified)&&(
                            <SearchBar/>
                        ))
                    }
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' } }} />
                    <TopNavBarMenu user={user} notificationTrue={notificationTrue}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
