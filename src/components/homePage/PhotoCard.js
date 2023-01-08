import {CardMedia, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getTimeDiff, stringAvatar} from "../utils";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {ReactionBar} from "../photoPage/ReactionBar";
import Paper from "@mui/material/Paper";
import {CommentsBelow} from "./CommentsBelow";
import {Fragment} from "react";

export const PhotoCard = ({index, photoData, handleOpen}) => {
    const fullName = photoData.user.firstName + " " + photoData.user.lastName;
    const comments = photoData.commentSet.edges;
    return (
        <Paper key={index} direction="column" sx={{width: 500, borderRadius: 5}}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: 1,
                height: 65,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <List sx={{width: 0.8, p: 0, ml: 2}}>
                    <ListItem key="currUser" sx={{p: 0}}>
                        <ListItemAvatar sx={{minWidth: 40}}>
                            <Avatar {...stringAvatar(fullName)} />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{p: 0, pt: photoData.location ? 0 : 2.5, m: 0, height: 40}}
                            primary={photoData.user.username}
                                      secondary={<Typography
                                          sx={{fontSize: 13, height: 17}}
                                          component="span"
                                      >
                                          {photoData.location}
                                      </Typography>}
                                      primaryTypographyProps={{
                                          fontFamily: 'Arial',
                                          fontWeight: 'bold',
                                          fontSize: 14,
                                          height: 19
                                      }}
                        />
                    </ListItem>
                </List>
                {/*<Button>Unfollow</Button>*/}
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <CardMedia
                    component={"img"}
                    src={`${photoData.photoUrl}`}
                    sx={{width: '100%', height: 'auto', objectFit: 'cover', border: 'none'}}
                />
            </Box>
            <Box sx={{mt: 1}}>
                <ReactionBar commentAction={handleOpen} photoId={photoData.id} likedCount={photoData.likedCount}
                             isLikedByCurr={photoData.isLikedByCurr} commentsCount={photoData.commentSet.edges.length
                }/>
            </Box>
            {photoData.caption && (
                <List sx={{p: 0}}>
                    <ListItem key="caption" sx={{minHeight: 20, p: 0, ml: 2.5}}>
                        <ListItemText
                            primary={
                                <Fragment>
                                    <Typography
                                        sx={{display: 'inline', fontWeight: 'bold', mr: 1}}
                                        component="span"
                                        variant="body2"
                                    >
                                        {photoData.user.username}
                                    </Typography>
                                    {photoData.caption}
                                </Fragment>
                            }
                            primaryTypographyProps={{variant: 'body2', fontFamily: 'Arial'}}
                        />
                    </ListItem>
                </List>)}
            {comments.length > 2 &&
                <Typography
                    onClick={() => {
                        handleOpen(photoData.id)
                    }}
                    sx={{
                        ml: 2.5, color: "text.secondary",
                        variant: 'body2', fontFamily: 'Arial', fontSize: 13,
                        "&:hover": {
                            cursor: "pointer",
                        }
                    }}>
                    {"View all " + comments.length + " comments"}
                </Typography>}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                ml: 0.5
            }}>
                <CommentsBelow comments={comments}/>
            </Box>
            <Typography sx={{
                ml: 2.5, color: "text.secondary",
                fontFamily: 'Arial', fontSize: 12,
                mb: 1
            }}>
                {getTimeDiff(photoData.dateTime)}
            </Typography>
        </Paper>
    )
}