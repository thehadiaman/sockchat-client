import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Container, Button, Box, Toolbar, IconButton, InputBase, Badge} from '@mui/material';
import {Home, AccountCircle, Search as SearchIcon, Mail as MailIcon} from '@mui/icons-material';
import {Notifications as NotificationsIcon} from '@mui/icons-material';
import logo from "./images/logo.png";
import { useHistory } from "react-router-dom";

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

export default function TopNavBar({user}) {

    const history = useHistory();

    const userLoginTrue = (
        <Box sx={{ display: { xs: 'none', md: 'flex', sm: 'flex', lg: 'flex' }, position: 'absolute', right: '-10px' }}>
            <IconButton>
                <Home sx={{fontSize: 'larger'}}/>
            </IconButton>
            <IconButton>
                <Badge badgeContent={4} color="error">
                    <MailIcon  sx={{fontSize: 'larger'}}/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon  sx={{fontSize: 'larger'}}/>
                </Badge>
            </IconButton>
            <IconButton>
                <AccountCircle sx={{fontSize: 'larger'}}/>
            </IconButton>
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
