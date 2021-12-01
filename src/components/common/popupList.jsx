import React, {useState} from 'react';
import {IconButton, List, ListItem, ListItemText, Dialog} from '@mui/material';
import { useHistory } from "react-router-dom";

function SimpleDialog(props) {
    const { onClose, open } = props;
    const history = useHistory();

    const handleClose = (value) => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <List sx={{ p: 0 }}>
                {props.menu.map(m=>(
                    <ListItem key={m.text} onClick={['cancel', 'close'].includes(m.text.toLowerCase())?()=>handleClose():(m.fn?m.fn:()=>history.push(m.link))} button sx={{padding: {xs: '15px 100px 15px 100px', lg: '15px 200px 15px 200px'}, textAlign: 'center'}}>
                        <ListItemText primary={m.text}/>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default function PopupList({LaunchButton, menu}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <span>
            <IconButton onClick={handleClickOpen}>
                {LaunchButton}
            </IconButton>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                menu={menu}
            />
        </span>
    );
}
