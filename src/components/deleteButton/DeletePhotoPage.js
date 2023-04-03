import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ListItem, ListItemButton, ListItemText, Stack} from "@mui/material";

import List from "@mui/material/List";
import {useMutation} from "@apollo/client";
import {DELETE_PHOTO} from "../../graphql/Mutations";
import {GET_ALL_PHOTOS, GET_USER_INFO} from "../../graphql/Queries";
import {useContext} from "react";
import {AppContext} from "../../App";


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

export const DeletePhotoPage = ({photoId, closePhotoModal, closeDeleteModal}) => {
    const {currUser} = useContext(AppContext);
    const [deletePhoto] = useMutation(DELETE_PHOTO, {
        refetchQueries: [{query: GET_USER_INFO, variables: {userId: currUser.userId}},
            {query: GET_ALL_PHOTOS}]
    });

    const handleClickDelete = () => {
        deletePhoto({variables: {deletePhotoInput: {photoId: photoId}}});
        closePhotoModal(false);
    }

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
                        onClick={handleClickDelete} sx={{width: 1, color: "#d30c0c", textAlign: "center"}}
                    >
                        <ListItemText primary="Delete" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {closeDeleteModal(false)}} sx={{textAlign: "center"}}
                    >
                        <ListItemText primary="Cancel" />
                    </ListItemButton>

                </List>
            </Stack>
        </ThemeProvider>
    )
}