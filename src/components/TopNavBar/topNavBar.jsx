import React, {useState} from 'react';
import {AppBar, Container, Button, Box, Toolbar, IconButton, Badge} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";
import {renderHomeIcon, renderMessageIcon, renderNotificationIcon, renderSettingsIcon, renderProfileIcon, renderLogoutIcon} from "../common/svgImages";
import SearchBar from "./search";
import Pop from "../common/popover";

function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

export default function TopNavBar({user}) {
    const history = useHistory();
    const [dropDownStatus, setDropDownStatus] = useState({
        title: '',
        open: false,
        target: null
    });

    const openDropDownMenu = (target, title)=>{
        const status = {title, open: true, target};
        setDropDownStatus(status);
    }

    const closeDropDownMenu = ()=>{
        const status = {title: '', open: false, target: null};
        setDropDownStatus(status);
    }

    const notificationData = [{text: 'Notification One'}, {text: 'Notification Two'}, {text: 'Notification Three'}, {text: 'Notification Four'}];
    const profileMenu = [{text: 'Profile', icon: renderProfileIcon(), link: '/profile'}, {text: 'Settings', icon: renderSettingsIcon(), link: 'Settings'}, {text: 'Logout', icon: renderLogoutIcon(), fn: ()=>logout()}]

    const userLoginTrue = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'none', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton onClick={()=>history.push('/')}>
                {renderHomeIcon()}
            </IconButton>
            <IconButton>
                <Badge badgeContent={4} color="error">
                    {renderMessageIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openDropDownMenu(target, "Notifications")}>
                <Badge color="error">
                    {renderNotificationIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openDropDownMenu(target, "Profile")}>
                <Badge color="error">
                    <AccountCircle sx={{fontSize: 'larger'}}/>
                </Badge>
            </IconButton>

            {dropDownStatus.open&&<Pop {...dropDownStatus} closeDropDownMenu={closeDropDownMenu}/>}

        </Box>
    );

    const userLoginTrueVerificationFalse = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton>
                <AccountCircle sx={{fontSize: 'larger'}}/>
            </IconButton>
        </Box>
    );

    const userLoginFalse = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <Button disableRipple variant={'contained'} onClick={()=>history.push('/')}>Login</Button><Button disableRipple onClick={()=>history.push('/signup')}>SignUp</Button>
        </Box>
    );

    return (
        <AppBar position="static" sx={{backgroundColor: 'rgba(var(--d87,255,255,255),1)', marginBottom: '20px'}}>
            <Container>
                <Toolbar>
                    <Box
                        sx={{ marginRight: {xs: '10px'} }}
                    >
                        <img className={'title-image'} onClick={()=>history.push('/')} src={logo} alt="Logo" width={'70px'} height={'20px'}/>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        (!(user.name&&!user.verification.verified)&&(
                            <SearchBar/>
                        ))
                    }
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' } }} />
                    {
                        ((user.name&&user.verification.verified)&&userLoginTrue) ||
                        ((user.name&&!user.verification.verified)&&userLoginTrueVerificationFalse) ||
                        userLoginFalse
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
