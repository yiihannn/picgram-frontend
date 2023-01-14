import {Backdrop, CircularProgress} from "@mui/material";

export const Loading = () => {
    return (
        <div>
            <Backdrop
                sx={{color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    )
}