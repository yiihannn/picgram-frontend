import List from "@mui/material/List";
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getTimeDiff, stringAvatar} from "../utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useMutation} from "@apollo/client";
import {FOLLOW_USER} from "../../graphql/Mutations";
import {GET_PHOTO_DETAILS} from "../../graphql/Queries";
import {useContext} from "react";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";


export const PhotoOwner = ({owner, time, photoId}) => {
    const fullName = owner.firstName + " " + owner.lastName;
    const followText = owner.isFollowedByCurr ? "Following" : "Follow";
    const {currUser, setCurrPage} = useContext(AppContext);
    const navigate = useNavigate();

    const [followUser] = useMutation(FOLLOW_USER, {
        refetchQueries: [{query: GET_PHOTO_DETAILS, variables: {photoId: photoId}}, 'photoDetails']
    });

    const handleClickFollow = (event) => {
        event.preventDefault();
        followUser({variables: {userInput: {userId: owner.id}}});
    }

    const handleClickUser = (userId) => {
        setCurrPage("User");
        navigate("/user/" + userId);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <List component="span" sx={{width: 1, pb: 0}}>
                <ListItem sx={{pt: 0}}>
                    <ListItemAvatar sx={{minWidth: 40}}>
                        <Avatar {...stringAvatar(fullName)} />
                    </ListItemAvatar>
                    <ListItemText primary={owner.username} secondary={getTimeDiff(time) + " ago"}
                                  primaryTypographyProps={{
                                      fontFamily: 'Arial',
                                      fontWeight: 'bold',
                                      fontSize: 16,
                                      height: 19
                                  }}
                                  onClick={() => handleClickUser(owner.id)}
                    />
                </ListItem>
            </List>
            {currUser.userId !== owner.id &&
            <Button
                onClick={handleClickFollow}
                sx={{
                    position: "absolute", right: "1em", textTransform: "none", fontSize: 16,
                    backgroundColor: owner.isFollowedByCurr ? "#cecec8" : "#d30c0c",
                    color: owner.isFollowedByCurr ? "black" : "white",
                    width: "105px", height: "40px",
                    pl: 2, pr: 2, borderRadius: 10, "&:hover": {
                        backgroundColor: owner.isFollowedByCurr ? "#e0e0d8" : "#a90909",
                    }
                }}>
                {followText}
            </Button>}
        </Box>
    )
}