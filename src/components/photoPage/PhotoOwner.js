import List from "@mui/material/List";
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getTimeDiff} from "../utils";
import Box from "@mui/material/Box";
import {useContext} from "react";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import {FollowButton} from "../followButton/FollowButton";


export const PhotoOwner = ({owner, time}) => {
    const {currUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleClickUser = (userId) => {
        navigate("/user/" + userId);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", pr: 2}}>
            <List component="span" sx={{width: 1, pb: 0}}>
                <ListItem sx={{pt: 0}}>
                    <ListItemAvatar>
                        <Avatar alt="" src={`${owner.profile.avatarUrl}`}/>
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
            <FollowButton targetUser={owner}/>}
        </Box>
    )
}