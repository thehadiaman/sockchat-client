import React from 'react';
import {Snackbar, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';

export default function SimpleSnackbar({message, closeSnackMessage}) {

    const handleClose = (event, reason) => {
        closeSnackMessage(null);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <Close fontSize="small" />
        </IconButton>
    );

    return (
        <div>
            <Snackbar
                open={message?true:false}
                autoHideDuration={5000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
}
