import {useMutation} from "@apollo/client";
import {LIKE_PHOTO} from "../../graphql/Mutations";
import {Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import {GET_PHOTO_DETAILS} from "../../graphql/Queries";


export const ReactionBar = ({photoId, likedCount, isLikedByCurr, commentsCount, commentAction}) => {
    const [userLikePhoto] = useMutation(LIKE_PHOTO, {
        refetchQueries: [{query: GET_PHOTO_DETAILS, variables: {photoId: photoId}}, 'photoDetails']
    });


    const handleClickLike = (event) => {
        event.preventDefault();
        userLikePhoto({variables: {photoInput: {photoId: photoId}}});
    }

    const handleClickComment = (event) => {
        event.preventDefault();
        if (commentAction) {
            commentAction(photoId);
        }
    }

    return (
        <Stack direction='row' alignItems="center" sx={{ml: 1}}>
            <IconButton onClick={handleClickLike}>
                {isLikedByCurr ? <FavoriteIcon sx={{
                        fontSize: 25, color: '#ed4956',
                        "&:hover": {
                            cursor: "pointer",
                        }
                    }}/> :
                    <FavoriteBorderIcon sx={{
                        fontSize: 25, color: 'black',
                        "&:hover": {
                            cursor: "pointer",
                        }
                    }}/>}
            </IconButton>
            <Typography fontFamily="Arial" color="text.secondary"> {likedCount}</Typography>
            <ModeCommentOutlinedIcon onClick={handleClickComment}
                                     sx={{
                                         fontSize: 25, color: 'black', ml: 1,
                                         "&:hover": {
                                             cursor: commentAction ? "pointer" : "initial",
                                         }
                                     }}/>
            <Typography fontFamily="Arial" color="text.secondary" ml={1}> {commentsCount}</Typography>
        </Stack>
    )
}