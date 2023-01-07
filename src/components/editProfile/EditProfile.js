import {Stack} from "@mui/material";
import {stringAvatar} from "../utils";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export const EditProfile = ({userData}) => {
    const name = userData.user.firstName + " " + userData.user.lastName;

    return (
        <Stack alignItems="center" justifyContent="flex-start">
            <Avatar {...stringAvatar(name)} sx={{
                ...stringAvatar(name).sx,
                width: 90, height: 90, fontSize: 50
            }}/>
            <Grid>
                <Box gridColumn="span 8">

                </Box>
            </Grid>
        </Stack>
    )
}