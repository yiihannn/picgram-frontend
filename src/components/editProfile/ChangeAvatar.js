import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useMutation} from "@apollo/client";
import {CHANGE_AVATAR} from "../../graphql/Mutations";
import imageCompression from "browser-image-compression";

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: "none",
    borderRadius: 4,
    p: 3,
    alignItems: "center",
    justifyContent: "flex-start"
};

export const ChangeAvatar = ({closeModal}) => {

    const [userChangeAvatar] = useMutation(CHANGE_AVATAR, {
        update(cache, {data:{changeAvatar: profile}}) {
            cache.modify({
                id: cache.identify(profile),
                fields: {
                    avatarUrl() {
                        return profile.avatarUrl;
                    }
                }
            })
        }
    });

    const handleFileSelected = async (event) => {
        const file = event.target.files[0];
        const options = {
            maxSizeMB: 0.8,
        }
        try {
            const compressedPhoto = await imageCompression(file, options);
            userChangeAvatar({variables: {avatarInput: {newAvatar: compressedPhoto}}});
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Stack sx={style}>
            <Typography variant="h6">Change Profile Photo</Typography>
            <Box component='label'
                 htmlFor="upload"
                 sx={{
                     display: "flex", backgroundColor: "#d30c0c", mt: 2, pt: 1, pb: 1, pl: 3, pr: 3,
                     alignItems: "center", borderRadius: 'inherit', justifyContent: "center",
                     textTransform: "none",
                     "&:hover": {
                         cursor: "pointer",
                     }
                 }}
            >
                <Typography sx={{color: "white"}}>Upload</Typography>
                <input
                    type="file"
                    id="upload"
                    style={{display: "none"}}
                    onChange={handleFileSelected}
                />
            </Box>
        </Stack>
    )
}