import {GET_ALL_PHOTOS} from "../../graphql/Queries"
import {useQuery} from "@apollo/client";
import {ImageList, ImageListItem, Modal, ThemeProvider, useMediaQuery} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {PhotoPage} from "../photoPage/PhotoPage";
import {useState} from "react";

const theme = createTheme();


export const Explore = () => {
    const belowXS = useMediaQuery(theme.breakpoints.down('xs'));
    const XStoSM = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const SMtoMD = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const MDtoLG = useMediaQuery(theme.breakpoints.between('md','lg'));
    const LGtoXL = useMediaQuery(theme.breakpoints.between('lg','xl'));
    const beyondXL = useMediaQuery(theme.breakpoints.up('xl'));
    let numOfCols = 6;
    if (belowXS) numOfCols = 1;
    else if (XStoSM) numOfCols = 2;
    else if (SMtoMD) numOfCols = 3;
    else if (MDtoLG) numOfCols = 4;
    else if (LGtoXL) numOfCols = 5;
    else if (beyondXL) numOfCols = 6;

    const [open, setOpen] = useState(false);
    const [openedPhoto, setOpenedPhoto] = useState(null);
    const handleOpen = (photoId) => {
        setOpen(true);
        setOpenedPhoto(photoId);
    }
    const handleClose = () => setOpen(false);

    const {loading: photoListLoading, error: photoListError, data: photoListData} = useQuery(GET_ALL_PHOTOS);

    if (photoListLoading) return <div>Loading...</div>;
    if (photoListError) return `Error in fetching photo list! ${photoListError}`;

    const photos = photoListData.getPhotos.edges;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{m: 5, mt: 0}}>
                <ImageList variant="masonry" cols={numOfCols} gap={8}>
                    {photos.map((item) => (
                        <ImageListItem key={item.node?.id}>
                            <img
                                src={`/images/${item.node?.fileName}`}
                                srcSet={`/images/${item.node?.fileName}`}
                                alt={item.node?.fileName}
                                loading="lazy"
                                onClick={() => handleOpen(item.node?.id)}
                                style={{borderRadius: '30px'}}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="image-modal"
            >
                <Box><PhotoPage photoId={openedPhoto}/></Box>
            </Modal>
        </ThemeProvider>


    )
}