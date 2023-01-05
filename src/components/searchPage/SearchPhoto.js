import {ImageList, ImageListItem, Modal, ThemeProvider, Typography, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import {PhotoPage} from "../photoPage/PhotoPage";
import {useState} from "react";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

export const SearchPhoto = ({photoList}) => {

    const belowSM = useMediaQuery(theme.breakpoints.down('sm'));
    const SMtoMD = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const MDtoXL = useMediaQuery(theme.breakpoints.between('md','xl'));
    const beyondXL = useMediaQuery(theme.breakpoints.up('xl'));
    let numOfCols = 6;
    if (belowSM) numOfCols = 2;
    else if (SMtoMD) numOfCols = 3;
    else if (MDtoXL) numOfCols = 4;
    else if (beyondXL) numOfCols = 6;

    const [open, setOpen] = useState(false);
    const [openedPhoto, setOpenedPhoto] = useState(null);
    const handleOpen = (photoId) => {
        setOpen(true);
        setOpenedPhoto(photoId);
    }
    const handleClose = () => setOpen(false);

    return (
        photoList.length === 0 ? <Typography sx={{fontSize: 20}}> No photo is found</Typography> :
            <ThemeProvider theme={theme}>
                <Box sx={{m: 5, mt: 0}}>
                    <ImageList variant="standard" cols={numOfCols} gap={8}>
                        {photoList.map((item) => (
                            <ImageListItem key={item.node.id}>
                                <img
                                    src={`${item.node.photoUrl}`}
                                    srcSet={`${item.node.photoUrl}`}
                                    alt={item.node.photoUrl}
                                    loading="lazy"
                                    onClick={() => handleOpen(item.node.id)}
                                    style={{borderRadius: '30px', width: '220px', height:'300px'}}
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