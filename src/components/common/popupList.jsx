import React, {useState} from 'react';
import {IconButton, Dialog} from '@mui/material';
import List from "../common/list";

function SimpleDialog(props) {
    const { onClose, open, list } = props;

    const handleClose = (value) => {
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div onClick={handleClose}>
                <List list={list}/>
            </div>
        </Dialog>
    );
}

export default function PopupList({LaunchButton, list}) {
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
                list={list}
            />
        </span>
    );
}
