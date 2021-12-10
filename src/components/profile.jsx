import React, {useState, useEffect} from "react";
import {Avatar, ButtonGroup, Divider, styled, Tabs, Tab, Button} from "@mui/material";
import {renderSettingsIcon} from "../components/common/svgImages";
import PopupList from "./common/popupList";
import NotFound from "./notFound";
import {getUser, followOrUnFollow} from "../services/userService";

function logout (){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}


export default function Profile(props){
    const [user, setUserData] = useState({_id: '', name: '', username: '', followers: [], following: [], bio: ''});
    const [invalidUserName, setInvalidUser] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState("posts");

    useEffect(()=>{
        async function setUser(){
            try{
                const userData = (await getUser(props.match.params.username)).data;
                setUserData(userData)
            }catch (e) {
                console.log(e)
                setInvalidUser(true)
            }
            setLoading(false)
        }
        setUser();
    }, [props.match])

    if(invalidUserName){
        return <NotFound/>
    }

    if(isLoading){
        return <div>Loaging.</div>
    }

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

    const handleFollow = (username)=>{
        const copyOfUser = {...user};
        if(copyOfUser.followers.includes(props.user.username)){
            const index = copyOfUser.followers.indexOf('X')
            copyOfUser.followers.splice(index);
        }else copyOfUser.followers.push(props.user.username);
        setUserData(copyOfUser)
        followOrUnFollow({username: username});
        props.socket.emit('follow', {username: username, isFollowed: user.followers.includes(props.user.username)?true:false});
    }

    const {name, username, followers, following, bio} = user;
    document.title = `${name} (@${username})`;

    const profileMenuitems = [{text: 'Settings', link: '/settings', width: "300px", center: true}, {text: 'Edit profile', link: '/settings/profile', width: "300px", center: true}, {text: 'Change Password', link: '/settings/password', width: "300px", center: true}, {text: 'Logout', fn: logout, width: "300px", center: true}, {text: "Cancel", center: true}];

    return (
        <center>
            <ProfileImage/>
            <span style={userNameStyle}>{username}
                {username===props.user.username?<PopupList list={profileMenuitems} LaunchButton={renderSettingsIcon()}/>:
                    <Button onClick={()=>handleFollow(username)} style={{size: '20px', marginLeft: '10px', padding: '5px 20px 5px 20px'}} variant={'contained'}>{user.followers.includes(props.user.username)?'unfollow':'follow'}</Button>}
                <br/>
                {name}
            </span>
            {bio&&(<span><br/>{bio}</span>)}
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