import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {useQuery} from "@apollo/client";
import {GET_FOLLOWING_LIST, GET_FOLLOWING_PHOTOS} from "../../graphql/Queries";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import {PhotoCard} from "./PhotoCard";
import Container from "@mui/material/Container";
import {Modal, Stack, Typography} from "@mui/material";
import {PhotoPage} from "../photoPage/PhotoPage";
import {FollowingList} from "./FollowingList";
import Paper from "@mui/material/Paper";

const theme = createTheme();

export const HomePage = () => {
    const {currUser} = useContext(AppContext);
    const {loading: followingPhotosLoading, error: followingPhotosError, data: followingPhotosData
    } = useQuery(GET_FOLLOWING_PHOTOS, {variables: {userId: currUser.userId}});

    const {loading: followingListLoading, error: followingListError, data: followingListData} = useQuery(
        GET_FOLLOWING_LIST, {variables: {userId: currUser.userId}});

    const [open, setOpen] = useState(false);
    const [openedPhoto, setOpenedPhoto] = useState(null);

    const handleOpen = (photoId) => {
        setOpen(true);
        setOpenedPhoto(photoId);
    }

    const handleClose = () => setOpen(false);
    if (followingListLoading) return <Loading/>
    if (followingListError) return <Box><QueryError errorMessage={followingListError}/></Box>

    if (followingPhotosLoading) return <Loading/>
    if (followingPhotosError) return <Box><QueryError errorMessage={followingPhotosError}/></Box>

    const followingUsers = followingListData.user.followingUser.edges.map(edge => edge.node.user);
    const followingPhotos = followingPhotosData?.user.followingPhotos.edges;

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-around'
                }}>
                    {followingPhotos.length === 0 ? <Typography sx={{fontSize: 20, pt: 4}}>No Followings' Activities.</Typography> :
                        <Stack direction="column" spacing={2} sx={{height: 1, mr: 1}}>
                            {followingPhotos.map((edge, index) =>
                                <PhotoCard key={index} index={index} photoData={edge.node} handleOpen={handleOpen}/>)}
                        </Stack>}
                    <Paper direction="column" sx={{height: 1, borderRadius: 5, ml: 1}}>
                        <FollowingList users={followingUsers}/>
                    </Paper>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="image-modal"
                    >
                        <Box>
                            <PhotoPage photoId={openedPhoto}/>
                        </Box>
                    </Modal>
                </Box>
            </Container>

        </ThemeProvider>
    )
}