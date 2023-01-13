import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

export const PhotoPlaceholder = () => {
    return (
        <Box
            sx={{
                width: 0.9, height: 0.9, display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", border: "1px dashed grey", backgroundColor: "transparent",
                borderRadius: 'inherit', textTransform: "none"
            }}>
            <DriveFolderUploadOutlinedIcon/>
            <Typography color={theme.palette.grey.A700}
                        sx={{fontSize: 15}}>Click here to upload photo</Typography>
        </Box>
    )
}