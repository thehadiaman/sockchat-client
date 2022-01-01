import React, {useState} from 'react';
import {Container, Typography, IconButton, Avatar, CardActions, CardMedia, CardHeader, Card} from '@mui/material';
import {MoreHoriz as MoreHorizIcon} from '@mui/icons-material';
import {renderNoLike, renderLike, renderComment} from "../common/svgImages"


export default function Post() {
    const [like, setLike] = useState(false);
    const [numberOfLike, setNumberOfLike] = useState(0);

    const handleLike = async () => {
        setLike(!like);
        let add = -1;
        if(!like) add = 1;
        setNumberOfLike(numberOfLike+add);
    }

    return (
        <Card sx={{width: {lg: '60%'}, pb: '10px'}}>
            <CardHeader
                avatar={
                    <Avatar src={'https://picsum.photos/50'}/>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreHorizIcon />
                    </IconButton>
                }
                title="HADI AMAN"
            />
            <CardMedia
                height={'425px'}
                component="img"
                image="https://picsum.photos/425/300"
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    {like?renderLike():renderNoLike()}
                </IconButton>
                <IconButton aria-label="share">
                    {renderComment()}
                </IconButton>
            </CardActions>
            <Container>
                <Typography>
                    {numberOfLike} {numberOfLike>1?'likes':'like'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Sock chat demo images from picsum.photo/[number]
                </Typography>
            </Container>
        </Card>
    );
}
