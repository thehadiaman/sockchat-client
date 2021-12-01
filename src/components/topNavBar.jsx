import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Container, Button, Box, Toolbar, IconButton, InputBase, Badge} from '@mui/material';
import {AccountCircle, Search as SearchIcon} from '@mui/icons-material';
import {Logout as LogoutIcon, PersonOutline as AccountCircleIcon} from '@mui/icons-material';
import logo from "./images/logo.png";
import { useHistory } from "react-router-dom";
import {renderHomeIcon, renderMessageIcon, renderNotificationIcon, renderSettingsIcon} from "../components/common/svgImages";
import DropDownMenu from "./common/dropDownMenu.jsx";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #dddddd',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    color: '#000000',
    marginLeft: 0,
    width: '85%',
    [theme.breakpoints.up('sm')]: {
        width: '40%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: '#000000',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    color: '#000000',
    '& .MuiInputBase-input': {

        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),

        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '100%',
        },
    },
}));

function logout(){
    localStorage.removeItem('jwtToken');
    window.location = '/';
}

export default function TopNavBar({user}) {

    const history = useHistory();

    const notificationData = [{text: 'Notification One'}, {text: 'Notification Two'}, {text: 'Notification Three'}, {text: 'Notification Four'}];

    const profileMenu = [{text: 'Profile', icon: <AccountCircleIcon/>, link: '/profile'}, {text: 'Settings', icon: renderSettingsIcon(), link: 'Settings'}, {text: 'Logout', icon: <LogoutIcon/>, fn: ()=>logout()}]

    const userLoginTrue = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton onClick={()=>history.push('/')}>
                {renderHomeIcon()}
            </IconButton>
            <IconButton>
                <Badge badgeContent={4} color="error">
                    {renderMessageIcon()}
                </Badge>
            </IconButton>
            <DropDownMenu badgeText={5} title={"Notification"} icon={renderNotificationIcon()} menu={notificationData} />
            <DropDownMenu title={user.name} icon={<AccountCircle sx={{fontSize: 'larger'}}/>} menu={profileMenu} />
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
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                />
                            </Search>
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
