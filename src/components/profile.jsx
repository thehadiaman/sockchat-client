import React, {Component} from "react";
import {Avatar, ButtonGroup, Divider, IconButton, styled} from "@mui/material";
import {renderSettingsIcon} from "../components/common/svgImages";

class Profile extends Component {
    render() {
        const {name, username, followers, following} = this.props.user;
        const ProfileImage = styled((props) => (
            <Avatar {...props} />
        ))(() => ({
            padding: '3rem',
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

        document.title = `${name} (@${username})`;

        return (
            <center>
                <ProfileImage/>
                <span style={userNameStyle}>{username}<IconButton>{renderSettingsIcon()}</IconButton></span>
                <br/>
                <ButtonGroup disableRipple disableElevation sx={{ display: { xs: 'none', lg: 'inline-flex', xl: 'none' } }}>
                    <BtnValue value={"0"}/> <Btn title={"Posts"}/>
                    <BtnValue value={followers.length}/> <Btn title={"Followers"}/>
                    <BtnValue value={following.length}/> <Btn title={"Following"}/>
                </ButtonGroup>
                <Divider/>
            </center>
        );
    }
}

export default Profile;