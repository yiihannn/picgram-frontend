import {useParams} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
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
import {UploadPhoto} from "./UploadPhoto";


const theme = createTheme({
        typography: {
            "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        }
    }
);


export const UserPage = () => {
    const belowSM = useMediaQuery(theme.breakpoints.down('sm'));
    const {currUser} = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
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

    const {userId} = useParams();
    const {loading: userLoading, error: userInfoError, data: userData} = useQuery(GET_USER_INFO, {
        variables: {userId: userId},
    });
    if (userLoading) return <div>Loading...</div>;
    if (userInfoError) return `Error in fetching user! ${userInfoError}`;

    const photos = userData.user.userPhotos?.edges;
    const name = userData.user.firstName + " " + userData.user.lastName;
    return (
        <ThemeProvider theme={theme}>
            <Stack
                sx={{
                    bgcolor: 'background.paper',
                    pt: 4,
                    pb: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flexStart',
                        direction: 'column',
                        maxWidth: 'sm'
                    }}
                    spacing={1}
                >
                    <Avatar {...stringAvatar(name)} sx={{
                        ...stringAvatar(name).sx,
                        width: 90, height: 90, fontSize: 50
                    }}/>
                    <Typography variant="h4" align="center" color="text.primary">{name}</Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary">
                        {"@" + userData.user.username}
                    </Typography>
                    {currUser?.userId === userId && (
                        <Stack
                            sx={{pt: 3}}
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
                            <Fab variant="extended" aria-label="edit" sx={{
                                backgroundColor: theme.palette.grey["300"],
                                boxShadow: "none", textTransform: "none", fontSize: "15px"
                            }}
                            >
                                <EditOutlinedIcon sx={{mr: 1}}/>
                                Edit Profile
                            </Fab>
                        </Stack>)}
                </Stack>
            </Stack>
            <Container disableGutters maxWidth="md">
                <ImageList rowHeight={300} cols={belowSM ? 2 : 4} gap={15}>
                    {photos.map((item) => (
                        <ImageListItem key={item.node?.id}>
                            <img
                                src={`/images/${item.node?.fileName}`}
                                srcSet={`/images/${item.node?.fileName}`}
                                alt={item.node?.fileName}
                                loading="lazy"
                                onClick={() => handleOpen(item.node?.id)}
                                style={{borderRadius: 25}}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="image-modal"
            >
                <Box>
                    <PhotoPage photoId={openedPhoto}/>
                </Box>
            </Modal>
            <Modal open={upload} onClose={handleCloseUpload} aria-labelledby="upload-modal">
                <Box>
                    <UploadPhoto closeModal={setUpload}/>
                </Box>
            </Modal>

        </ThemeProvider>
    )

}