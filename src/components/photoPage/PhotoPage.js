import {useQuery} from "@apollo/client";
import {GET_PHOTO_DETAILS} from "../../graphql/Queries";
import {CardMedia, Divider, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {PhotoOwner} from "./PhotoOwner";
import {PhotoComments} from "./PhotoComments";
import {ReactionBar} from "./ReactionBar";
import {MakeComment} from "./MakeComment";


const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.6,
    height: 0.8,
    backgroundColor: 'white',
    boxShadow: "none",
    borderRadius: 10
};

export const PhotoPage = ({photoId}) => {
    const {loading: photoLoading, error: photoInfoError, data: photoData}
        = useQuery(GET_PHOTO_DETAILS, {variables: {photoId: photoId}});

    if (photoLoading) return <div>Loading...</div>;
    if (photoInfoError) return `Error in fetching user! ${photoInfoError}`;

    const comments = photoData.photo.commentSet.edges;

    return (
        <Stack direction="row" sx={style}>
            <Box sx={{
                width: 0.5, height: 1, backgroundColor: 'black',
                borderBottomLeftRadius: 'inherit', borderTopLeftRadius: 'inherit'
            }}>
                <CardMedia
                    component={"img"}
                    src={`${photoData.photo.photoUrl}`}
                    sx={{width: '100%', height: '100%', objectFit: 'contain', border: 'none'}}
                />
            </Box>
            <Stack sx={{width: 0.5, height: 1}}>
                <Box sx={{width: 1, height: 0.12}}>
                    <PhotoOwner owner={photoData.photo.user} time={photoData.photo.dateTime}
                                photoId={photoData.photo.id}/>
                </Box>
                <Divider sx={{mb: 1}}/>
                <PhotoComments comments={comments}/>
                <Box sx={{width: 1, height: 0.08}}>
                    <ReactionBar isLikedByCurr={photoData.photo.isLikedByCurr} likedCount={photoData.photo.likedCount}
                                 commentsCount={comments.length} photoId={photoData.photo.id}/>
                </Box>
                <Box sx={{width: 1, mb: 2}}>
                    <MakeComment photoId={photoData.photo.id}/>
                </Box>
            </Stack>
        </Stack>
    )
}

