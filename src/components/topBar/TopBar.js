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
import {ListItemIcon, Stack,} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {LOG_OUT} from "../../graphql/Mutations";
import {useMutation, useQuery} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {SearchAutoComplete} from "../searchWidget/searchAutoComplete/SearchAutoComplete";
import '@algolia/autocomplete-theme-classic';
import '../searchWidget/searchAutoComplete/SearchAutoComplete.css';
import {GET_CURR_USER} from "../../graphql/Queries";
import {Loading} from "../others/Loading";


const pages = ['Explore', 'Home'];


export const TopBar = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const {currUser, setCurrUser} = useContext(AppContext);
    const navigate = useNavigate();
    const path = window.location.pathname.split("/")[1];

    const [userLogOut] = useMutation(LOG_OUT, {
        onCompleted() {
            setCurrUser(null);
            navigate("/login-register");
        },
    });

    const {loading, data} = useQuery(GET_CURR_USER, {
        onError() {
            navigate("/login-register");
        }
    })

    if (loading) return <Loading/>

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        userLogOut({variables: {userData: {}}});
    }

    const handleEditProfile = () => {
        navigate("/edit-profile");
        setAnchorElUser(null);
    }

    const handleClickPage = (page) => {
        let toPage = "/explore";
        if (page === "Home") {
            toPage = "/home/" + currUser.userId;
        } else if (page === "User") {
            toPage = "/user/" + currUser.userId;
        }
        navigate(toPage);
    }

    return (
        (data &&
            <AppBar position="sticky" color="grey" elevation={0}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start"
                       sx={{pl: 5, pr: 5, mt: 2, mb: 2}}>
                    <CameraAltOutlinedIcon onClick={() => {
                        navigate("/explore")
                    }}
                                           sx={{
                                               mr: 1.5,
                                               p: 0.7,
                                               color: 'white',
                                               backgroundColor: "#d30c0c",
                                               borderRadius: 5,
                                               '&:hover': {cursor: 'pointer'}
                                           }}/>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleClickPage(page)}
                                sx={{
                                    color: path === page.toLowerCase() ? 'white' : 'black',
                                    fontSize: 15,
                                    display: 'block',
                                    textTransform: 'none',
                                    fontFamily: 'BlinkMacSystemFont',
                                    borderRadius: 10, p: 1.5,
                                    backgroundColor: path === page.toLowerCase() ? 'black' : 'white',
                                    "&:hover": {
                                        backgroundColor: path === page.toLowerCase() ? 'black' : 'white',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                {page}
                            </Button>))}
                    </Box>
                    <Box sx={{
                        ml: 2, mr: 2,
                        flexGrow: 1, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'flex-start',
                    }}>
                        <SearchAutoComplete/>
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Your homepage">
                            <IconButton onClick={() => handleClickPage("User")}>
                                <Avatar alt="" src={`${data.currentUser.profile.avatarUrl}`}/>
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
                            <MenuItem onClick={handleEditProfile}>
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
            </AppBar>)
    )
}
