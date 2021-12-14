import * as React from 'react';
import {Box, BottomNavigation, BottomNavigationAction, styled, Badge} from '@mui/material';
import {renderHomeIcon, renderMessageIcon, renderNotificationIcon, renderProfileIcon} from "../components/common/svgImages";
import { useHistory } from "react-router-dom";

function getIcon(icon, notificationCount){
    return <Badge badgeContent={notificationCount} color={"error"}>{icon}</Badge>
}

export default function BottomNavBar({user, notificationCount}) {
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const NavButton = styled(BottomNavigationAction)`
      color: #adadad;

      & .Mui-selected {
        color: #red
      }
    `;

    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'block', md: 'none' }}}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <NavButton onClick={()=>history.push('/')} disableRipple icon={renderHomeIcon()} />
                    <NavButton onClick={()=>history.push('/inbox')} disableRipple icon={getIcon(renderMessageIcon())} />
                    <NavButton onClick={()=>history.push('/notifications')} disableRipple icon={getIcon(renderNotificationIcon(), notificationCount)} />
                <NavButton onClick={()=>history.push(`/profile/${user.username}`)} disableRipple icon={renderProfileIcon()} />

            </BottomNavigation>
        </Box>
    );
}
