import React, {useState} from "react";
import {Avatar, ButtonGroup, Divider, styled, Tabs, Tab} from "@mui/material";
import {renderSettingsIcon} from "../components/common/svgImages";
import PopupList from "./common/popupList";

function logout (){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}


export default function Profile({user}){
    const {name, username, followers, following} = user;
    const [tabValue, setTabValue] = useState("posts");

    const ProfileImage = styled((props) => (
        <Avatar {...props} />
    ))(() => ({
        padding: '4rem',
        '& .MuiAvatar-fallback': {
            width: '7rem',
            height: '7rem'
        }
    }))

    const userNameStyle={
        fontFamily: 'Bitstream Vera Sans Mono',
        fontSize: '30px',
        userSelect: 'none'
    };

    const Btn = styled((props)=>(
        <div {...props}>{props.title}</div>
    ))(()=>({
        margin: '10px 10px 10px 0',
        cursor: 'pointer',
        textTransform: 'lowercase',
        fontFamily: 'Bitstream Vera Sans Mono',
        padding: '10px 10px 10px 0',
        userSelect: 'none',
        '&:hover': {
            color: '#343434'
        },
        '&:active': {
            color: '#838383'
        }
    }));

    const BtnValue = styled((props)=>(
        <div {...props}>{props.value}</div>
    ))(()=>({
        margin: '10px 0 10px 10px',
        textTransform: 'uppercase',
        fontFamily: 'Bitstream Vera Sans Mono',
        padding: '10px 4px 10px 10px',
        userSelect: 'none'
    }));

    const TabBtn = styled((props)=>(
        <Tab value={props.value} onClick={()=>setTabValue(props.value)} label={props.label}/>
    ))(()=>({
        width: "33%"
    }));

    document.title = `${name} (@${username})`;

    const profileMenu = [{text: 'Settings', link: 'Settings', width: "300px", center: true}, {text: 'Edit profile', link: '/settings', width: "300px", center: true}, {text: 'Change Password', link: 'settings/changePassword', width: "300px", center: true}, {text: 'Logout', fn: ()=>logout(), width: "300px", center: true}]

    return (
        <center>
            <ProfileImage/>
            <span style={userNameStyle}>{username}<PopupList list={profileMenu} LaunchButton={renderSettingsIcon()}/></span>
            <br/>
            <p style={{textAlign: 'left'}}>{name}</p>
            <br/>
            <ButtonGroup disableRipple disableElevation sx={{ display: { sm: 'none', xs:'none', md: 'inline-flex'} }}>
                <BtnValue value={"0"}/> <Btn title={"Posts"}/>
                <BtnValue value={followers.length}/> <Btn title={"Followers"}/>
                <BtnValue value={following.length}/> <Btn title={"Following"}/>
            </ButtonGroup>
            <Divider/>
            <Tabs sx={{ display: { sm: 'inline-flex', xs:'inline-flex', md: 'none' }}} value={tabValue}>
                <TabBtn value={"posts"} label={`0 Posts`} />
                <TabBtn value={"followes"} label={`${followers.length} Followers`} />
                <TabBtn value={"following"} label={`${following.length} Following`} />
            </Tabs>
        </center>
    );
}