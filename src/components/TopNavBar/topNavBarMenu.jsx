import React, {useState} from 'react';
import {Button, Box, IconButton, Badge} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import {renderHomeIcon, renderMessageIcon, renderNotificationIcon, renderSettingsIcon, renderProfileIcon, renderLogoutIcon} from "../common/svgImages";
import Pop from "../common/popover";
import List from "../common/list";

function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

export default function TopNavBarMenu({user}){

    const history = useHistory();
    const [dropDownStatus, setDropDownStatus] = useState({
        open: false,
        target: null,
        content: null,
        title: null
    });

    const openDropDownMenu = (target=null, menu=[], title=null)=>{
        const content = <List list={menu}/>
        const open = true;
        const status = {open, target, content, title};
        setDropDownStatus(status);
    }

    const closeDropDownMenu = ()=>{
        const status = {open: false, target: null, content: null, title: null};
        setDropDownStatus(status);
    }

    const notificationData = [{text: 'Notification One'}, {text: 'Notification Two'}, {text: 'Notification Three'}, {text: 'Notification Four'}];
    const profileMenuItems = [{text: 'Profile', icon: renderProfileIcon(), link: '/profile'}, {text: 'Settings', icon: renderSettingsIcon(), link: 'Settings'}, {text: 'Logout', icon: renderLogoutIcon(), fn: logout}];
    const verificationFalseProfileMenuItems = [{text: 'Logout', icon: renderLogoutIcon(), fn: logout}];

    const userLoginTrueMenu = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'none', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton onClick={()=>history.push('/')}>
                {renderHomeIcon()}
            </IconButton>
            <IconButton>
                <Badge badgeContent={3} color="error">
                    {renderMessageIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openDropDownMenu(target, notificationData, "Notifications")}>
                <Badge badgeContent={5} color="error">
                    {renderNotificationIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openDropDownMenu(target, profileMenuItems)}>
                <AccountCircle sx={{fontSize: 'larger'}}/>
            </IconButton>

            {dropDownStatus.open&&<Pop {...dropDownStatus} closeDropDownMenu={closeDropDownMenu} />}

        </Box>
    );

    const userLoginTrueVerificationFalseMenu = (
        <Box sx={{position: 'absolute', right: '-10px' }}>
            <IconButton onClick={({target})=>openDropDownMenu(target, verificationFalseProfileMenuItems)}>
                <AccountCircle sx={{fontSize: 'larger'}}/>
            </IconButton>
            {dropDownStatus.open&&<Pop {...dropDownStatus} closeDropDownMenu={closeDropDownMenu} />}
        </Box>
    );

    const userLoginFalseMenu = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <Button disableRipple variant={'contained'} onClick={()=>history.push('/')}>Login</Button><Button disableRipple onClick={()=>history.push('/signup')}>SignUp</Button>
        </Box>
    );

    if(user.name&&user.verification.verified) return userLoginTrueMenu
    else if(user.name&&!user.verification.verified) return userLoginTrueVerificationFalseMenu
    else return userLoginFalseMenu

}