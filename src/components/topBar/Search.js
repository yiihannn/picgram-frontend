import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled('form')(({theme}) => ({
    position: 'relative',
    borderRadius: 30,
    backgroundColor: "#e9e9e9",
    '&:hover': {
        backgroundColor: theme.palette.grey["300"],
    },
    margin: 0,
    width: '100%',
    height: '100%'
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1.5, 1.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));