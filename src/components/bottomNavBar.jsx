import * as React from 'react';
import {Box, BottomNavigation, BottomNavigationAction, styled} from '@mui/material';
import {Home, Notifications, AccountCircle, Favorite as FavoriteIcon} from '@mui/icons-material';

export default function BottomNavBar() {
    const [value, setValue] = React.useState(0);

    const NavButton = styled((props) => (
        <BottomNavigationAction showLabel={false} {...props} />
    ))(() => ({
        color: '#b2b2b2',
        '& .Mui-selected': {
            color: '#000000'
        }
    }))

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' }}}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >

                <NavButton disableRipple sx={{width: '20%', padding: '0'}} icon={<Home />} />
                <NavButton disableRipple sx={{width: '20%', padding: '0'}} icon={<Notifications />} />
                <NavButton disableRipple sx={{width: '20%', padding: '0'}} icon={<FavoriteIcon />} />
                <NavButton disableRipple sx={{width: '20%', padding: '0'}} icon={<AccountCircle />} />

            </BottomNavigation>
        </Box>
    );
}
