import Scrollbars from "react-custom-scrollbars-2";
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getTimeDiff} from "../utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";


export const PhotoComments = ({comments}) => {
    const navigate = useNavigate();

    const handleClickUser = (userId) => {
        navigate("/user/" + userId);
    }

    return (
        <Scrollbars
            direction="column"
            justifycontent="flex-end"
            alignitems="center"
            overflow='auto'
            spacing={1}
            sx={{width: 1, height: 1}}>
            {comments.map((cmt, i) => (
                <ListItem alignItems="flex-start" key={i} sx={{pb: 0, pt: 0}}>
                    <ListItemAvatar>
                        <Avatar alt="" src={`${cmt.node.user.profile.avatarUrl}`}
                                onClick={() => handleClickUser(cmt.node.user.id)}
                                sx={{'&: hover': {cursor: 'pointer'}}}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={cmt.node.user.username}
                        secondary={
                            <Box component='span'>
                                <Typography component='span'
                                            sx={{fontSize: 16, color: 'text.primary'}}>{cmt.node.comment}</Typography>
                                <br/>
                                <Typography component='span' sx={{
                                    fontSize: 12,
                                    color: 'text.secondary',
                                    mt: 0.5
                                }}>{"· " + getTimeDiff(cmt.node.dateTime)}</Typography>
                            </Box>
                        }
                        primaryTypographyProps={{
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            variant: 'body1'
                        }}/>
                </ListItem>
            ))}
        </Scrollbars>
    )
}
