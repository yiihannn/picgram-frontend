import {useHits} from "react-instantsearch-hooks-web";
import Box from "@mui/material/Box";
import {ImageList, ImageListItem, Modal, Stack, ThemeProvider, Typography, useMediaQuery} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {PhotoPage} from "../../photoPage/PhotoPage";
import {useState} from "react";

const theme = createTheme();

export const PhotoSearchHits = () => {
    const {hits} = useHits();
    const belowSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [openedPhoto, setOpenedPhoto] = useState(null);

    const handleOpen = (photoId) => {
        setOpen(true);
        setOpenedPhoto(photoId);
    }
    const handleClose = () => setOpen(false);

    return (
        hits.length === 0 ? <Typography sx={{fontSize: 20}}>No user is found</Typography> :
        <ThemeProvider theme={theme}>
            <Stack sx={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ImageList rowHeight={300} cols={belowSM ? 2 : 4} gap={15}>
                    {hits.map((item) => (
                        <ImageListItem key={item.global_id}>
                            <img
                                src={`${item.photo_url}`}
                                srcSet={`${item.photo_url}`}
                                alt={item.photo_url}
                                loading="lazy"
                                onClick={() => handleOpen(item.global_id)}
                                style={{borderRadius: '30px', width: '220px', height: '300px'}}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Stack>
            <Modal open={open} onClose={handleClose} aria-labelledby="image-modal">
                <Box>
                    <PhotoPage photoId={openedPhoto}/>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}