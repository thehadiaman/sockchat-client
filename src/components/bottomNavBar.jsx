import * as React from 'react';
import {Box, BottomNavigation, BottomNavigationAction, styled} from '@mui/material';
import {Home, Notifications, AccountCircle, Favorite as FavoriteIcon} from '@mui/icons-material';

export default function BottomNavBar() {
    const [value, setValue] = React.useState(0);

    const NavButton = styled(BottomNavigationAction)`
      color: #adadad;

      & .Mui-selected {
        color: #111111
      }
    `;

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' }}}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >

                <NavButton disableRipple icon={<Home />} />
                <NavButton disableRipple icon={<Notifications />} />
                <NavButton disableRipple icon={<FavoriteIcon />} />
                <NavButton disableRipple icon={<AccountCircle />} />

            </BottomNavigation>
        </Box>
    );
}
