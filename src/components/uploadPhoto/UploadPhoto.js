import Box from "@mui/material/Box";
import {
    Alert,
    CircularProgress,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Snackbar,
    Stack,
    ThemeProvider,
    Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from "@mui/material/Avatar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import List from "@mui/material/List";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {createTheme} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {PhotoPlaceholder} from "./PhotoPlaceholder";
import {useMutation, useQuery} from "@apollo/client";
import {UPLOAD_PHOTO} from "../../graphql/Mutations";
import {GET_ALL_PHOTOS, GET_CURR_USER, GET_USER_INFO} from "../../graphql/Queries";
import {TagAutoComplete} from "./TagAutoComplete";
import {useNavigate} from "react-router-dom";
import imageCompression from 'browser-image-compression'
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import Paper from "@mui/material/Paper";

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.6,
    height: 0.8,
    backgroundColor: 'white',
    boxShadow: "none",
    borderRadius: 6,
    p: 1.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
};

const theme = createTheme();

export const UploadPhoto = ({closeModal}) => {
    const {currUser} = useContext(AppContext);
    const [tags, setTags] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const navigate = useNavigate();

    const {register, handleSubmit, watch, resetField, setError, formState: {errors}, clearErrors} = useForm(
        {
            defaultValues: {
                uploadPhoto: null,
                caption: "",
                location: "",
                customError: ""
            }
        }
    );

    const photo = watch("uploadPhoto")?.[0];

    const [userUploadPhoto] = useMutation(UPLOAD_PHOTO, {
        onError({networkError, graphQLErrors}) {
            if (networkError) {
                setError("customError", {type: "network", message: "Upload fails, please try again!"});
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
        onCompleted() {
            resetField("customError");
            clearErrors(["uploadPhoto", "customError"]);
            setShowLoading(false);
            closeModal(false);
        },
        refetchQueries: [{query: GET_USER_INFO, variables: {userId: currUser.userId}}, {query: GET_ALL_PHOTOS}]
    });

    const {loading, error, data} = useQuery(GET_CURR_USER)

    if (loading) return <Loading/>
    if (error) return <QueryError errorMessage={error}/>

    return (
        (data &&
            <ThemeProvider theme={theme}>
                <Paper component="form" sx={style}
                       onChange={() => {
                           clearErrors(["uploadPhoto", "customError"]);
                       }}
                       onSubmit={handleSubmit(async (data) => {
                           setShowLoading(true);
                           delete data.customError;
                           const options = {
                               maxSizeMB: 0.8,
                           }
                           try {
                               data.uploadPhoto = await imageCompression(data.uploadPhoto[0], options);
                           } catch (error) {
                               console.log(error);
                           }
                           data.tags = tags.map((tag) => {
                               if (tag.inputValue) {
                                   tag = tag.inputValue;
                               } else if (typeof tag !== 'string') {
                                   tag = tag.name;
                               }
                               return tag;
                           });
                           userUploadPhoto({variables: {uploadInput: data}});
                       })}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: 1,
                        height: 0.08,
                        borderTopLeftRadius: 'inherit',
                        borderTopRightRadius: 'inherit',
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <IconButton onClick={() => {
                            closeModal(false)
                        }} sx={{ml: 2}}>
                            <KeyboardBackspaceIcon/>
                        </IconButton>
                        <Typography color={theme.palette.grey.A700}
                                    sx={{fontSize: 16, fontFamily: 'BlinkMacSystemFont'}}>Create new post</Typography>
                        <LoadingButton
                            loadingIndicator={<CircularProgress size={16} sx={{color: "white"}}/>}
                            loading={showLoading}
                            type="submit"
                                sx={{
                                    fontSize: 15, backgroundColor: "#d30c0c", borderRadius: 10, p: 0.4,
                                    color: "white", textTransform: 'none', mr: 2, "&:hover": {
                                        backgroundColor: "#d30c0c"
                                    }
                                }}>Share</LoadingButton>
                    </Box>
                    {errors.customError?.message && (
                        <Snackbar open autoHideDuration={6000}>
                            <Alert severity="error">{errors.customError?.message}</Alert>
                        </Snackbar>
                        )}
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-start",
                        width: 0.95, height: 0.9, p: 2, borderRadius: 'inherit'}}>
                        <Box component='label'
                             htmlFor="uploadPhoto"
                             sx={{
                                 display: "flex", flexFlow: "column", backgroundColor: photo ? "black" : theme.palette.grey.A200,
                                 alignItems: "center", justifyContent: "center",
                                 width: 0.6, height: 1, textTransform: "none",
                                 "&:hover": {
                                     cursor: "pointer",
                                 }
                             }}>
                            {photo ? <img
                                    width="100%" height="100%" style={{objectFit: "contain"}}
                                    className="image" src={URL.createObjectURL(photo)} alt=""/>
                                : <PhotoPlaceholder/>}
                            <input
                                type="file"
                                id="uploadPhoto"
                                style={{display: "none"}}
                                {...register('uploadPhoto', {required: "No photo is selected!"})}
                            />
                        </Box>
                        <Stack justifyContent="flex-start" sx={{
                            width: 0.4, m: 0, ml: 2, borderRadius: 'inherit', alignItems: 'flex-start'
                        }}>
                            <List sx={{width: 1, height: 0.06, pt: 0}}>
                                <ListItem sx={{pl: 1, pt: 0}}>
                                    <ListItemAvatar>
                                        <Avatar alt="" src={`${data.currentUser.profile.avatarUrl}`}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={data.currentUser.username}
                                                  primaryTypographyProps={{
                                                      fontFamily: 'BlinkMacSystemFont',
                                                      fontWeight: 'medium',
                                                      fontSize: 16
                                                  }}/>
                                </ListItem>
                            </List>
                            <Box sx={{width: 1, height: 0.3}}>
                                <TextField
                                    inputProps={{
                                        ...register("caption", {
                                            required: false
                                        })
                                    }}
                                    variant="standard"
                                    id="caption"
                                    placeholder="Write a caption..."
                                    multiline
                                    rows={9}
                                    sx={{width: 1}}
                                    InputProps={{sx: {height: 1, p: 0, m: 1, mt: 0, mr: 0}}}
                                />
                            </Box>

                            <Box sx={{
                                width: 1, height: 0.07, display: "flex", mb: 0,
                                flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"
                            }}>
                                <Typography sx={{
                                    m: 1, ml: 0.5, display: "flex", verticalAlign: 'center',
                                    fontFamily: 'BlinkMacSystemFont',
                                    fontWeight: 'medium',
                                    fontSize: 16
                                }}>
                                    <PlaceOutlinedIcon sx={{mr: 0.5, color: "#d30c0c"}}/> Location
                                </Typography>
                                <TextField
                                    inputProps={{
                                        ...register("location", {
                                            required: false
                                        })
                                    }}
                                    variant="standard"
                                    id="location"
                                    placeholder="Add location..."
                                    sx={{width: 1}}
                                    InputProps={{sx: {height: 1, p: 0, m: 1, mt: 0, mr: 0}}}
                                />
                            </Box>
                            <Typography sx={{
                                m: 1, ml: 0.5, display: "inline-flex", verticalAlign: 'center',
                                fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 'medium',
                                fontSize: 16
                            }}>
                                <TagOutlinedIcon sx={{mr: 0.5, color: "#d30c0c"}}/> Tag
                            </Typography>
                            <Box sx={{width: 1, height: 0.07}}>
                                <TagAutoComplete value={tags} setValue={setTags}/>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </ThemeProvider>)
    )
}