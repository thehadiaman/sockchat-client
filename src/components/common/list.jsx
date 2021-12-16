import React from "react";
import { List as TheList, ListItemButton, ListItemIcon, ListItemText, styled, Divider } from '@mui/material';
import { useHistory } from "react-router-dom";

export default function List({list}){
    const history = useHistory();

    function handleListItemClick(func, link){
        if(func) func()
        else history.push(link)
    }

    const ListButton = styled((props) => (
        <ListItemButton disableRipple {...props} />
    ))(() => ({
        '&:active': {
            backgroundColor: '#dddddd'
        }
    }))

    return(
        <TheList
            sx={{ width: '100%', bgcolor: 'background.paper', padding: '0', overflowX: 'hidden' }}
            component="nav"
        >
            {
                list.map(m=>(
                    <div key={m.text}>
                        <ListButton selected={history.location.pathname===m.link?true:false} style={{width: m.width||"100%", textAlign: (m.center&&"center")||null}} onClick={()=>{handleListItemClick(m.fn, m.link)}}>
                            {m.icon&&(
                                <ListItemIcon>
                                    {m.icon}
                                </ListItemIcon>
                            )}
                            <ListItemText><span className={m.bold?'list-text-bold':''}>{m.text}</span></ListItemText>
                        </ListButton>
                    <Divider/>
                </div>
                ))
            }
        </TheList>
    )
}