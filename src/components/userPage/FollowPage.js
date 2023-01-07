import {createTheme, ThemeProvider} from "@mui/material/styles";
import { IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import {GET_USER_FOLLOWER, GET_USER_FOLLOWING} from "../../graphql/Queries";
import {useContext} from "react";
import {AppContext} from "../../App";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../utils";

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.3,
    height: 0.5,
    backgroundColor: 'white',
    boxShadow: "none",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "flex-start"
};

const theme = createTheme();

export const FollowPage = ({follow, closeModal}) => {
    const {currUser} = useContext(AppContext);
    const query = follow === "Follower" ? GET_USER_FOLLOWER : GET_USER_FOLLOWING;
    const {loading, error, data} = useQuery(query, {
        variables: {userId: currUser.userId},
    });
    if (loading) return <Loading/>;
    if (error) return <QueryError errorMessage={error}/>;

    const users = follow === "Follower" ? data.user.followingUser.edges : data.user.followedByUser.edges;

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={style}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: 1,
                    height: 0.15,
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <IconButton onClick={() => {
                        closeModal(false)
                    }} sx={{position: "absolute", left: "1em"}}>
                        <KeyboardBackspaceIcon/>
                    </IconButton>
                    <Typography component="span"
                                color={theme.palette.grey.A700}
                                sx={{fontSize: 18, fontFamily: 'BlinkMacSystemFont', fontWeight: "bold"}}>
                        {follow}
                    </Typography>
                </Box>
                <List>
                    {users.map((user, index) => (
                        <ListItem key={index} sx={{p: 0, pl: 2}}>
                            <ListItemAvatar sx={{minWidth: 40}}>
                                <Avatar {...stringAvatar(user.firstName + " " + user.lastName)} />
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={user.firstName + " " + user.lastName}
                                          primaryTypographyProps={{
                                              fontFamily: 'Arial',
                                              fontWeight: 'medium',
                                              variant: 'body2',
                                          }}/>
                        </ListItem>))}
                </List>
            </Stack>
        </ThemeProvider>

    )
}