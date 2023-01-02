import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../utils";
import List from "@mui/material/List";
import {useContext} from "react";
import {AppContext} from "../../App";

export const FollowingList = ({users}) => {
    const {currUser} = useContext(AppContext);
    return (
        <List sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', width: 1}}>
            <ListItem key="currUser">
                <ListItemAvatar sx={{mr: 0.5}}>
                    <Avatar {...stringAvatar(currUser.fullName)} sx={{
                        ...stringAvatar(currUser.fullName).sx,
                        width: 45, height: 45, fontSize: 25
                    }}/>
                </ListItemAvatar>
                <ListItemText primary={currUser.username} secondary={currUser.fullName}
                              primaryTypographyProps={{
                                  fontFamily: 'Arial',
                                  fontWeight: 'bold',
                                  variant: 'body1',
                              }}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={"Following"}
                              primaryTypographyProps={{
                                  fontFamily: 'Arial',
                                  variant: 'body1',
                                  color: "#8e8e8e"
                              }}/>
            </ListItem>
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
    )
}