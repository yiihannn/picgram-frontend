import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton} from "@mui/material";

export const DeleteButton = ({photoId, openModal}) => {

    return (
        <IconButton onClick={openModal}>
            <MoreHorizIcon/>
        </IconButton>
    )
}