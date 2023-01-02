import List from "@mui/material/List";
import { ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getTimeDiff, stringAvatar} from "../utils";

export const PhotoOwner = ({owner, time}) => {
    const fullName = owner.firstName + " " + owner.lastName
    return (
        <List sx={{width: 1, pb: 0}}>
            <ListItem >
                <ListItemAvatar sx={{minWidth: 40}}>
                    <Avatar {...stringAvatar(fullName)} />
                </ListItemAvatar>
                <ListItemText primary={owner.username} secondary={getTimeDiff(time) + " ago"}
                              primaryTypographyProps={{
                                  fontFamily: 'Arial',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  height: 19
                              }}/>
            </ListItem>
        </List>
    )
}