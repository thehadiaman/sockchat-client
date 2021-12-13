import React from 'react';
import {Snackbar, IconButton, Alert, AlertTitle, Slide} from '@mui/material';
import {Close} from '@mui/icons-material';

export default function SimpleSnackbar({message, closeSnackMessage, severity, title}) {

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
                action={action}
                TransitionComponent={(props)=><Slide {...props} direction="up" />}
            >
                <Alert onClose={handleClose} variant="filled" severity={severity||"info"} sx={{ width: '100%' }}>
                    {title&&<AlertTitle>{title}</AlertTitle>}
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
