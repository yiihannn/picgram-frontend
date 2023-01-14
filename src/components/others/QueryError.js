import {Alert, AlertTitle, Snackbar, Typography} from "@mui/material";

export const QueryError = ({errorMessage}) =>{
    return (
        <div>
            <Snackbar open autoHideDuration={6000}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    <AlertTitle>Error</AlertTitle>
                    <Typography>{"Error in fetching data! " + errorMessage}</Typography>
                </Alert>
            </Snackbar>
        </div>
    )
}