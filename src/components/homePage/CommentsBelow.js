import {ListItem, ListItemText, Typography} from "@mui/material";
import {Fragment} from "react";
import List from "@mui/material/List";

export const CommentsBelow = ({comments}) => {
    return (
        <List sx={{pt: 0, pb: 0}}>
            {comments.slice(0, 2).map( ( cmt, index) => (
                <ListItem key={index} sx={{pt: 0, pb: 0}}>
                    <ListItemText sx={{m: 0, minHeight: 20}}
                        primary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline', fontWeight: 'bold', mr: 1}}
                                    component="span"
                                    variant="body2"
                                >
                                    {cmt.node.user.username}
                                </Typography>
                                {cmt.node.comment}
                            </Fragment>
                        }
                        primaryTypographyProps={{variant: 'body2', fontFamily: 'Arial'}}
                    />
                </ListItem>
            ))}
        </List>
    )
}