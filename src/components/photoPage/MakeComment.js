import {Alert} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {MAKE_COMMENT} from "../../graphql/Mutations";
import {GET_PHOTO_DETAILS} from "../../graphql/Queries";
import {useNavigate} from "react-router-dom";


export const MakeComment = ({photoId}) => {
    const navigate = useNavigate();

    const {
        register, resetField, handleSubmit, watch, setError,
        formState: {errors}, clearErrors
    } = useForm({
        defaultValues: {
            content: "",
            customError: ""
        }
    });

    const [userMakeComment] = useMutation(MAKE_COMMENT, {
        onError({networkError, graphQLErrors}) {
            if (networkError) {
                setError("customError", {type: "network", message: "Make comment fails, please try again!"});
            }
            if (graphQLErrors) {
                graphQLErrors.forEach(err => {
                    if (err.extensions?.code === 1004) {
                        setError("customError", {type: "graphql", message: "Login session expired!"});
                        navigate("/login-register");
                    }
                });
            }
        },
        refetchQueries: [{query: GET_PHOTO_DETAILS, variables: {photoId: photoId}}, 'photoDetails']
    });

    return (
        <Box component='form'
             onChange={() => {
                 clearErrors(["content", "customError"]);
             }}
             onSubmit={handleSubmit((data) => {
                 userMakeComment({variables: {commentInput: {photoId: photoId, content: data.content}}});
                 resetField("content");
                 resetField("customError");
                 clearErrors(["content", "customError"]);
             })}
             sx={{
                 border: '1px solid black', borderRadius: '26px', p: 0.5, mr: 3, ml: 2,
                 display: 'flex', justifyContent: 'space-between', flexDirection: 'row'
             }}>

            {errors.customError?.message && (
                <Alert severity="error">{errors.customError?.message}</Alert>)}
            <TextField
                inputProps={{
                    ...register("content",
                        {required: "Empty comment!"})
                }}
                variant="standard"
                id="content"
                placeholder="  Add a comment..."
                multiline
                maxRows={2}
                InputProps={{disableUnderline: true, sx: {flexGrow: 1, ml: 1}}}
            />
            <Button type="submit" disabled={watch("content") === ""}
                    sx={{color: 'black', fontSize: 14, p: 0.5}}>
                Send
            </Button>
        </Box>

    )
}