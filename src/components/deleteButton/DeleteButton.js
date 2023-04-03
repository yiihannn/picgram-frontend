import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {IconButton} from "@mui/material";

export const DeletePhotoButton = ({openModal}) => {

    return (
        <IconButton onClick={openModal}>
            <MoreHorizIcon/>
        </IconButton>
    )
}

export const DeleteCommentButton = ({commentId, openModal, setCommentId}) => {
    const handleClick = () => {
        setCommentId(commentId);
        openModal();
    }

    return (
        <IconButton onClick={handleClick}>
            <MoreHorizIcon/>
        </IconButton>
    )
}