import * as React from 'react';
import {Box, BottomNavigation, BottomNavigationAction} from '@mui/material';
import {Home, Notifications, AccountCircle, Favorite as FavoriteIcon} from '@mui/icons-material';

export default function BottomNavBar() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' }}}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >

                <BottomNavigationAction sx={{width: '20%', padding: '0'}} icon={<Home />} />
                <BottomNavigationAction sx={{width: '20%', padding: '0'}} icon={<Notifications />} />
                <BottomNavigationAction sx={{width: '20%', padding: '0'}} icon={<FavoriteIcon />} />
                <BottomNavigationAction sx={{width: '20%', padding: '0'}} icon={<AccountCircle />} />

            </BottomNavigation>
        </Box>
    );
}
