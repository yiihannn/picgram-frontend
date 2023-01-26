import {ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import {useNavigate} from "react-router-dom";

export const PhotoCaption = ({owner, caption}) => {
    const navigate = useNavigate();

    const handleClickUser = (userId) => {
        navigate("/user/" + userId);
    }

    return (
        <List sx={{width: 1, pb: 0}}>
            <ListItem sx={{pt: 0}}>
                <ListItemAvatar>
                    <Avatar alt="" src={`${owner.profile.avatarUrl}`} sx={{'&: hover': {cursor: 'pointer'}}}
                            onClick={() => handleClickUser(owner.id)}/>
                </ListItemAvatar>
                <ListItemText primary={owner.username}
                              secondary={<Typography sx={{fontSize: 16, color: 'text.primary'}}>{caption}</Typography>}
                              primaryTypographyProps={{
                                  fontFamily: 'Arial',
                                  fontWeight: 'bold',
                                  variant: 'body1'
                              }}
                />
            </ListItem>
        </List>
    )
}