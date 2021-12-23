import React, {useState} from 'react';
import {Button, Box, IconButton, Badge, Avatar} from '@mui/material';
import {AccountCircle} from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import {renderHomeIcon, renderMessageIcon, renderNotificationIcon, renderSettingsIcon, renderProfileIcon, renderLogoutIcon, renderNoNotifications} from "../common/svgImages";
import Pop from "../common/popover";
import List from "../common/list";
import {getNotifications, seeNotifications} from "../../services/userService";

function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

export default function TopNavBarMenu({user, notificationCount, setNotificationCount}){

    const history = useHistory();
    const [dropDownStatus, setDropDownStatus] = useState({
        open: false,
        target: null,
        content: null,
        title: null,
        css: ""
    });

    const openDropDownMenu = (target=null, menu=[], title=null, css="")=>{
        const content = <List list={menu}/>
        const open = true;
        const status = {open, target, content, title, css};
        setDropDownStatus(status);
    }

    const closeDropDownMenu = ()=>{
        const status = {open: false, target: null, content: null, title: null};
        setDropDownStatus(status);
    }

    const openNotification = async(target)=>{
        const notificationData = (await getNotifications()).data;
        if(notificationData.length!==0){
            for(let a=0;a<notificationData.length;a++){
                notificationData[a].text = notificationData[a].notification;
                notificationData[a].bold = !notificationData[a].seen;
                notificationData[a].link = `/profile/${notificationData[a].cause}`;
                notificationData[a].icon = <Avatar/>;
                delete notificationData[a].notification;
                delete notificationData[a].seen;
                delete notificationData[a].cause;
            }
            openDropDownMenu(target, notificationData, "Notifications");
            seeNotifications();
            setNotificationCount(0);
        }else{
            openDropDownMenu(target, [{text: 'No notifications', icon: renderNoNotifications()}], "Notifications", "overflow-hidden-class");
        }
    }

    const profileMenuItems = [{text: 'Profile', icon: renderProfileIcon(), link: `/profile/${user.username}`}, {text: 'Settings', icon: renderSettingsIcon(), link: '/settings'}, {text: 'Logout', icon: renderLogoutIcon(), fn: logout}];
    const verificationFalseProfileMenuItems = [{text: 'Logout', icon: renderLogoutIcon(), fn: logout}];

    const userLoginTrueMenu = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'none', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton onClick={()=>history.push('/')}>
                {renderHomeIcon()}
            </IconButton>
            <IconButton onClick={()=>history.push('/inbox')}>
                <Badge badgeContent={10} color="error">
                    {renderMessageIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openNotification(target)}>
                <Badge badgeContent={notificationCount} color="error">
                    {renderNotificationIcon()}
                </Badge>
            </IconButton>

            <IconButton size={"medium"} onClick={({target})=>openDropDownMenu(target, profileMenuItems, null, "overflow-hidden-class")}>
                <AccountCircle sx={{fontSize: 'larger'}}/>
            </IconButton>

            {dropDownStatus.open&&<Pop {...dropDownStatus} closeDropDownMenu={closeDropDownMenu} />}
        </Box>
    );

    const userLoginTrueVerificationFalseMenu = (
        <Box sx={{position: 'absolute', right: '-10px' }}>
            <IconButton onClick={({target})=>openDropDownMenu(target, verificationFalseProfileMenuItems, null, "overflow-hidden-class")}>
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