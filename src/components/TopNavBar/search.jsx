import React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import {InputBase, InputAdornment} from '@mui/material';
import {Search as SearchIcon, Cancel as Close} from '@mui/icons-material';
import Pop from "../common/popover";
import List from "../common/list";

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

const getSearchString = (string)=>{
    if(string.length>25) return `${string.slice(0, 25)}...`;
    return string;
}

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

export default function SearchBar() {

    const [searchString, setSearchString] = useState('');
    const [target, setTarget] = useState(null);
    const [open, setOpen] = useState(false);

    const closeDropDownMenu = ()=>{
        setOpen(false)
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
                    setSearchString(target.value);
                    setOpen(true);
                }}
                endAdornment={searchString&&<InputAdornment position="end">
                    <Close onClick={()=>setSearchString('')} className={'cursor-pointer'}/>
                </InputAdornment>}
            />
            {searchString&&<Pop width={"400px"} content={<List list={[{text: getSearchString(searchString)}]}/>} target={target} open={(open)?true:false} closeDropDownMenu={closeDropDownMenu}/>}
        </Search>
    );
}
