import React from "react";
import { List as TheList, ListItemButton, ListItemIcon, ListItemText, styled, Divider } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function List({menu}){
    const history = useHistory();

    const ListButton = styled((props) => (
        <ListItemButton disableRipple {...props} />
    ))(() => ({
        '&:active': {
            backgroundColor: '#dddddd'
        }
    }))

    return(
        <TheList
            sx={{ width: '100%', bgcolor: 'background.paper', padding: '0' }}
            component="nav"
        >
            {
                menu.map(m=>(
                    <div>
                        <ListButton key={m.text} onClick={()=>{m.fn?m.fn():history.push(m.link)}}>
                            {m.icon&&(
                                <ListItemIcon>
                                    {m.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText primary={m.text} />
                        </ListButton>
                    <Divider/>
                </div>
                ))
            }
        </TheList>
    )
}