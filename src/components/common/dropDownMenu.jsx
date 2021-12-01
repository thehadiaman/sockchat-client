import React, {useState} from 'react';
import {Box, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Badge} from '@mui/material';
import { useHistory } from "react-router-dom";

export default function DropDownMenu({title, icon, menu, badgeText}){

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const handleClick = ({currentTarget}) => {
        setAnchorEl(currentTarget);
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={title}>
                    <IconButton onClick={handleClick} size={"medium"}>
                        <Badge badgeContent={badgeText} color="error">
                            {icon}
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Menu >Notification</Menu>
                {menu.map(m=><MenuItem key={m.text}>
                    {m.icon&&<ListItemIcon>
                        {m.icon}
                    </ListItemIcon>}
                        <span onClick={m.fn?m.fn:()=>history.push(m.link)}>{m.text}</span>
                    </MenuItem>)}
            </Menu>
        </React.Fragment>
    );
}