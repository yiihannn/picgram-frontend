import {useHits} from "react-instantsearch-hooks-web";
import {ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {FollowButtonUseId} from "../../followButton/FollowButtonUseId";
import {useNavigate} from "react-router-dom";

export const UserSearchHits = () => {
    const {hits} = useHits();
    const navigate = useNavigate();

    return (
        hits.length === 0 ? <Typography sx={{fontSize: 20}}>No user is found</Typography> :
            <List sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'center', width: '600px'
            }}>
                {hits.map((user, index) => (
                    <Box component="button"
                         onClick={() => {
                             navigate('/user/' + user.global_id)
                         }}
                         sx={{
                             display: 'flex', flexDirection: 'row', alignItems: 'center', borderRadius: 10,
                             justifyContent: 'center', width: 1, border: 'none', backgroundColor: 'white',
                             '&:hover': {cursor: 'pointer', backgroundColor: 'rgba(217,217,209,0.33)'}
                         }}>
                        <ListItem key={index} sx={{p: 0}}>
                            <ListItemAvatar>
                                <Avatar alt="" src={`${user.avatar_url}`}/>
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={user.first_name + " " + user.last_name}
                                          primaryTypographyProps={{
                                              fontFamily: 'Arial',
                                              fontWeight: 'medium',
                                              fontSize: 15
                                          }}/>
                        </ListItem>
                        <ListItem button="false" key={index + 'description'} width="270px">
                            <ListItemText primary={user.description} primaryTypographyProps={{
                                color: "text.secondary",
                                fontFamily: 'Arial',
                                fontWeight: 'medium',
                                fontSize: 16
                            }}/>
                        </ListItem>
                        <ListItemIcon width="130px" key={index + 'followButton'}>
                            <FollowButtonUseId targetUserId={user.global_id}/>
                        </ListItemIcon>
                    </Box>
                ))}
            </List>
    )
}