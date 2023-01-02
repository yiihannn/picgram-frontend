import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    ListItemIcon,
    Stack,
} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {LOG_OUT} from "../../graphql/Mutations";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {stringAvatar} from "../utils";
import SearchIcon from "@mui/icons-material/Search";
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


const pages = ['Explore', 'Home'];

const Search = styled('form')(({theme}) => ({
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

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
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


export const TopBar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {currPage, setCurrPage, currUser, setCurrUser} = useContext(AppContext);
    const navigate = useNavigate();

    const [userLogOut] = useMutation(LOG_OUT, {
        onCompleted(data) {
            console.log("User logged out: ", data);
            setCurrPage("Explore");
            setCurrUser(null);
            navigate("/login-register");
        },
    });

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        userLogOut({variables: {userData: {}}});
    }

    const handleClickPage = (page) => {
        let toPage = "";
        if (page === "Home") {
            toPage = "/home/" + currUser.userId;
        } else if (page === "User") {
            toPage = "/user/" + currUser.userId;
        }
        setCurrPage(page);
        navigate(toPage);
    }

    return (
        <AppBar position="sticky" color="grey" elevation={0}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" sx={{pl: 5, pr: 5, mt: 2, mb: 2}}>
                <CameraAltOutlinedIcon
                    sx={{mr: 1.5, p: 0.7, color: 'white', backgroundColor: "#d30c0c", borderRadius: 5}}/>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handleClickPage(page)}
                            sx={{
                                color: currPage === page ? 'white' : 'black',
                                fontSize: 15,
                                display: 'block',
                                textTransform: 'none',
                                fontFamily: 'BlinkMacSystemFont',
                                borderRadius: 10, p: 1.5,
                                backgroundColor: currPage === page ? 'black' : 'white',
                                "&:hover": {
                                    backgroundColor: currPage === page ? 'black' : 'white',
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {page}
                        </Button>))}
                </Box>
                <Box sx={{
                    ml: 2, mr: 2,
                    flexGrow: 1, display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'flex-start',
                }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: "#767676"}}/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                </Box>
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Your homepage">
                        <IconButton onClick={() => handleClickPage("User")}>
                            <Avatar {...stringAvatar(currUser.fullName)}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Accounts and more options">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0, color: 'black'}}>
                            <KeyboardArrowDownIcon/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <EditOutlinedIcon fontSize="small"/>
                            </ListItemIcon>
                            Edit Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Stack>
        </AppBar>);
}
