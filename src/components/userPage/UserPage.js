import {useNavigate, useParams} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useQuery} from "@apollo/client";
import {GET_USER_INFO} from "../../graphql/Queries";
import {
    Fab,
    ImageList,
    ImageListItem,
    Modal,
    Stack,
    useMediaQuery
} from "@mui/material";
import Typography from "@mui/material/Typography";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Avatar from "@mui/material/Avatar";
import {stringAvatar} from "../utils";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {PhotoPage} from "../photoPage/PhotoPage";
import Box from "@mui/material/Box";
import {UploadPhoto} from "../uploadPhoto/UploadPhoto";
import {FollowPage} from "./FollowPage";


const theme = createTheme();


export const UserPage = () => {
    const {currUser} = useContext(AppContext);
    const navigate = useNavigate();
    const belowSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);
    const [openedPhoto, setOpenedPhoto] = useState(null);

    const handleOpen = (photoId) => {
        setOpen(true);
        setOpenedPhoto(photoId);
    }
    const handleClose = () => setOpen(false);

    const handleOpenUpload = () => {
        setUpload(true);
    }
    const handleCloseUpload = () => setUpload(false);

    const handleOpenFollower = () => {
        setFollower(true);
    }
    const handleCloseFollower = () => setFollower(false);

    const handleOpenFollowing = () => {
        setFollowing(true);
    }
    const handleCloseFollowing = () => setFollowing(false);

    const handleClickEdit = () => {
        navigate("/edit-profile");
    }

    const {userId} = useParams();
    const {loading: userLoading, error: userInfoError, data: userData} = useQuery(GET_USER_INFO, {
        variables: {userId: userId},
    });
    if (userLoading) return <div>Loading...</div>;
    if (userInfoError) return `Error in fetching user! ${userInfoError}`;

    const photos = userData.user.userPhotos?.edges;
    const profile = userData.user.profile;
    const name = userData.user.firstName + " " + userData.user.lastName;

    return (
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flexStart',
                        maxWidth: 'sm',
                    }}
                >
                    <Avatar {...stringAvatar(name)} sx={{
                        ...stringAvatar(name).sx,
                        width: 90, height: 90, fontSize: 50
                    }}/>
                    <Typography mt={1} variant="h4" align="center" color="text.primary">{name}</Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary">
                        {"@" + userData.user.username}
                    </Typography>
                    <Typography>{profile.description}</Typography>
                    <Stack sx={{m: 1}} direction="row" alignItems="center" justifyContent="center">
                        <Typography
                            onClick={handleOpenFollower}
                            sx={{
                            fontSize: 16, color: "text.primary", textTransform: "none", pr: 1,
                            fontWeight: "medium",
                            "&:hover": {
                                cursor: "pointer",
                            }
                        }}>
                            {profile.followerCount} follower
                        </Typography>
                        <Typography sx={{fontSize: 16, color: "text.primary"}}>·</Typography>
                        <Typography
                            onClick={handleOpenFollowing}
                            sx={{
                            fontSize: 16, color: "text.primary", textTransform: "none", pl: 1,
                            fontWeight: "medium",
                            "&:hover": {
                                cursor: "pointer",
                            }
                        }}>
                            {profile.followingCount} following
                        </Typography>
                    </Stack>
                    {currUser?.userId === userId && (
                        <Stack
                            sx={{m: 1}}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Fab variant="extended" aria-label="upload" sx={{
                                backgroundColor: theme.palette.grey["300"],
                                boxShadow: "none", textTransform: "none", fontSize: "15px"
                            }} onClick={handleOpenUpload}
                            >
                                <FileUploadOutlinedIcon sx={{mr: 1}}/>
                                Upload
                            </Fab>
                            <Fab variant="extended" aria-label="edit"
                                 onClick={handleClickEdit}
                                 sx={{
                                backgroundColor: theme.palette.grey["300"],
                                boxShadow: "none", textTransform: "none", fontSize: "15px"
                            }}
                            >
                                <EditOutlinedIcon sx={{mr: 1}}/>
                                Edit Profile
                            </Fab>
                        </Stack>)}
                </Stack>
                <Stack sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: 'lg',
                }}>
                    <ImageList rowHeight={300} cols={belowSM ? 2 : 4} gap={15}>
                        {photos.map((item) => (
                            <ImageListItem key={item.node?.id}>
                                <img
                                    src={`${item.node?.photoUrl}`}
                                    srcSet={`${item.node?.photoUrl}`}
                                    alt={item.node?.photoUrl}
                                    loading="lazy"
                                    onClick={() => handleOpen(item.node?.id)}
                                    style={{borderRadius: '30px', width: '220px', height: '300px'}}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Stack>
            </Stack>

            <Modal open={open} onClose={handleClose} aria-labelledby="image-modal">
                <Box>
                    <PhotoPage photoId={openedPhoto}/>
                </Box>
            </Modal>
            <Modal open={upload} onClose={handleCloseUpload} aria-labelledby="upload-modal">
                <Box>
                    <UploadPhoto closeModal={setUpload}/>
                </Box>
            </Modal>
            <Modal open={follower} onClose={handleCloseFollower} aria-labelledby="follower-modal">
                <Box>
                    <FollowPage follow="Follower" closeModal={setFollower}/>
                </Box>
            </Modal>
            <Modal open={following} onClose={handleCloseFollowing} aria-labelledby="following-modal">
                <Box>
                    <FollowPage follow="Following" closeModal={setFollowing}/>
                </Box>
            </Modal>

        </ThemeProvider>
    )

}