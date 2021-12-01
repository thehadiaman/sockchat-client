import React from "react";
import {Card, CardContent, Typography, Avatar, styled, Badge, IconButton} from '@mui/material';
import {Add} from '@mui/icons-material';

export default function StatusBar({user}) {

    const Username = styled((props)=>(
        <Typography {...props}>{props.value}</Typography>
    ))(()=>({
        fontSize: '12px',
        textAlign: 'center'
    }));

    const SmallAvatar = styled(IconButton)(({ theme }) => ({
        width: 'min-contend',
        height: 'min-contend',
        padding: '0',
        backgroundColor: '#dddddd',
        border: `2px solid ${theme.palette.background.paper}`,
        '&:hover': {
            backgroundColor: '#dddddd'
        }
    }));

    return (
        <Card sx={{ width: {lg: "45%", md: "45%", }, marginLeft: {lg: "150px", md: "150px"}, border: '1px solid #dddddd', boxShadow: 'none', padding: "0 10px 0 10px" }}>
            <CardContent style={{paddingLeft: "0", paddingRight: "0"}}>
                <div className={'status-container'}>
                    <div>
                        <center>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar variant={'contained'}><Add/></SmallAvatar>
                                }
                            >
                                <Avatar src="https://picsum.photos/50"/>
                            </Badge>
                            <Username value={user.username}/>
                        </center>
                    </div>
                    <div style={{margin: '0 10px 0 10px'}}>
                        <center>
                            <Avatar src="https://picsum.photos/50"/>
                            <Username value={user.username}/>
                        </center>
                    </div>
                    <div style={{margin: '0 10px 0 10px'}}>
                        <center>
                            <Avatar src="https://picsum.photos/50"/>
                            <Username value={user.username}/>
                        </center>
                    </div>
                    <div style={{margin: '0 10px 0 10px'}}>
                        <center>
                            <Avatar src="https://picsum.photos/50"/>
                            <Username value={user.username}/>
                        </center>
                    </div>
                    <div style={{margin: '0 10px 0 10px'}}>
                        <center>
                            <Avatar src="https://picsum.photos/50"/>
                            <Username value={user.username}/>
                        </center>
                    </div>
                    <div style={{margin: '0 10px 0 10px'}}>
                        <center>
                            <Avatar src="https://picsum.photos/50"/>
                            <Username value={user.username}/>
                        </center>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};