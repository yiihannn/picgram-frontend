import {ListItem, ListItemAvatar, ListItemText, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../utils";
import List from "@mui/material/List";
import Button from "@mui/material/Button";

export const SearchUser = ({userList}) => {
    return (
        userList.length === 0 ? <Typography sx={{fontSize: 20}}>No user is found</Typography> :
        <List sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', width: 1}}>
            {userList.map((user, index) => (
                <Stack direction="row" alignItems="center" spacing={20}>
                    <ListItem key={index} sx={{p: 0}}>
                        <ListItemAvatar sx={{minWidth: 40}}>
                            <Avatar {...stringAvatar(user.node.firstName + " " + user.node.lastName)} />
                        </ListItemAvatar>
                        <ListItemText primary={user.node.username} secondary={user.node.firstName + " " + user.node.lastName}
                                      primaryTypographyProps={{
                                          fontFamily: 'Arial',
                                          fontWeight: 'medium',
                                          fontSize: 15
                                      }}/>
                    </ListItem>
                    <Button
                        key="follow"
                        sx={{
                            fontSize: 15, backgroundColor: "#d30c0c", borderRadius: 10, p: 0,
                            color: "white", textTransform: 'none', "&:hover": {
                                backgroundColor: "#d30c0c"
                            }
                        }}
                    >
                        follow
                    </Button>
                </Stack>
                ))}
        </List>
    )
}