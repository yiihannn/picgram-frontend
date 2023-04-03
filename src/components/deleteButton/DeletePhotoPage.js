import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ListItem, ListItemButton, ListItemText, Stack} from "@mui/material";

import List from "@mui/material/List";


const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.25,
    backgroundColor: 'white',
    boxShadow: "none",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "flex-start"
};

const theme = createTheme();

export const DeletePhotoPage = ({photoId, closeModal}) => {

    return (
        <ThemeProvider theme={theme}>
            <Stack direction="column" sx={style}>
                <List sx={{width: 1}}>
                    <ListItem>
                        <ListItemText
                            primary="Are you sure to delete this photo?"
                            primaryTypographyProps={{variant: 'h6', textAlign: "center"}}
                        />
                    </ListItem>
                    <ListItemButton alignItems="center"
                        onClick={() => {closeModal(false)}} sx={{width: 1, color: "#d30c0c", textAlign: "center"}}
                    >
                        <ListItemText primary="Delete" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {closeModal(false)}} sx={{textAlign: "center"}}
                    >
                        <ListItemText primary="Cancel" />
                    </ListItemButton>

                </List>
            </Stack>
        </ThemeProvider>
    )
}