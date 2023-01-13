import {createTheme, ThemeProvider} from "@mui/material/styles";
import {IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_FOLLOWER, GET_USER_FOLLOWING, GET_USER_INFO} from "../../graphql/Queries";
import {useContext} from "react";
import {AppContext} from "../../App";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {FOLLOW_USER} from "../../graphql/Mutations";
import {useNavigate, useParams} from "react-router-dom";

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
    const {userId} = useParams();
    const navigate = useNavigate();

    const query = follow === "Follower" ? GET_USER_FOLLOWER : GET_USER_FOLLOWING;
    const {loading, error, data} = useQuery(query, {
        variables: {userId: userId},
    });

    const [followUser] = useMutation(FOLLOW_USER, {
        refetchQueries: [{query: GET_USER_INFO, variables: {userId: userId}}, 'userInfo']
    });

    const handleClickFollow = (userId) => {
        followUser({variables: {userInput: {userId: userId}}});
    }
    const handleClickUser = (userId) => {
        closeModal(false);
        navigate("/user/" + userId);
    }

    if (loading) return <Loading/>;
    if (error) return <QueryError errorMessage={error}/>;

    const users = follow === "Follower" ? data.user.followedByUser.edges : data.user.followingUser.edges;

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
                <List sx={{width: '100%'}}>
                    {users.map((user, index) => (
                        <ListItem key={index} sx={{p: 0, pl: 2, pr: 2}}>
                            <ListItemAvatar>
                                <Avatar alt="" src={`${user.node.user.profile.avatarUrl}`}/>
                            </ListItemAvatar>
                            <ListItemText primary={user.node.user.username}
                                          secondary={user.node.user.firstName + " " + user.node.user.lastName}
                                          primaryTypographyProps={{
                                              fontFamily: 'Arial',
                                              fontWeight: 'medium',
                                              variant: 'body2',
                                          }}
                                          onClick={() => handleClickUser(user.node.user.id)}
                            />
                            {user.node.user.id === currUser.userId ?
                                <Typography sx={{mr: 2, color: "#8e8e8e", fontSize: 16}}>This is you</Typography> :
                                <Button
                                    onClick={() => handleClickFollow(user.node.user.id)}
                                    sx={{
                                        display: "inline-flex", textTransform: "none", fontSize: 16,
                                        backgroundColor: user.node.user.isFollowedByCurr ? "#cecec8" : "#d30c0c",
                                        color: user.node.user.isFollowedByCurr ? "black" : "white",
                                        pl: 2, pr: 2, borderRadius: 10, "&:hover": {
                                            backgroundColor: user.node.user.isFollowedByCurr ? "#e0e0d8" : "#a90909",
                                        }
                                    }}>{user.node.user.isFollowedByCurr ? "Following" : "Follow"}</Button>}
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </ThemeProvider>

    )
}