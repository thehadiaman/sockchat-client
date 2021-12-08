import React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {InputBase, InputAdornment, Avatar} from '@mui/material';
import {Search as SearchIcon, Cancel as Close} from '@mui/icons-material';
import Pop from "../common/popover";
import List from "../common/list";
import {findUser} from "../../services/userService";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #dddddd',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    color: '#000000',
    marginLeft: 0,
    width: '85%',
    [theme.breakpoints.up('md')]: {
        width: '40%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color: '#000000',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: '100%',
    color: '#000000',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width')
    },
}));

const createUsersList = (array)=>{
    const list = [];
    for(let a=0;a<array.length;a++){
        list[a] = {text: array[a].username, icon: <Avatar src={"https://picsum.photos/50"} alt={array[a].name}/>, link: `/profile/${array[a].username}`}
    }
    return list;
}

export default function SearchBar() {

    const [searchString, setSearchString] = useState('');
    const [target, setTarget] = useState(null);
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const closeDropDownMenu = ()=>{
        setOpen(false)
    }

    const handleChange = async({value})=>{
        setSearchString(value);
        setOpen(true);
        const listOfUsers = (await findUser(value)).data;
        const list = createUsersList(listOfUsers);
        setUsers(list);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                value={searchString}
                onClick={({target})=> {
                    setTarget(target);
                    setOpen(true);
                }}
                onChange={({target})=> {
                    handleChange(target)
                }}
                endAdornment={searchString&&<InputAdornment position="end">
                    <Close onClick={()=>setSearchString('')} className={'cursor-pointer'}/>
                </InputAdornment>}
            />
            {searchString&&<Pop width={"400px"} content={<List list={users}/>} target={target} open={(open)?true:false} closeDropDownMenu={closeDropDownMenu}/>}
        </Search>
    );
}
