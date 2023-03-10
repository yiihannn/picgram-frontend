import {Alert, Button, Modal, Stack, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {GET_USER_PROFILE} from "../../graphql/Queries";
import {useMutation, useQuery} from "@apollo/client";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../App";
import {Loading} from "../others/Loading";
import {QueryError} from "../others/QueryError";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {EDIT_PROFILE} from "../../graphql/Mutations";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {ChangeAvatar} from "./ChangeAvatar";

export const EditProfile = () => {
    const {currUser} = useContext(AppContext);

    const navigate = useNavigate();

    const {loading: profileLoading, error: profileError, data: profileData} = useQuery(GET_USER_PROFILE, {
        variables: {userId: currUser.userId},
    });

    const {register, handleSubmit, reset, setError, watch, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            description: "",
            customError: ""
        }
    });

    const [userEditProfile] = useMutation(EDIT_PROFILE, {
        update(cache, {data:{editProfile: {user}}}) {
            cache.modify({
                id: cache.identify(user),
                fields: {
                    firstName() {
                        return user.firstName;
                    },
                    lastName() {
                        return user.lastName;
                    },
                }
            });
            cache.modify({
                id: cache.identify(user.profile),
                fields: {
                    description() {
                        return user.profile.description;
                    }
                }
            });
        },
        onError({networkError, graphQLErrors}) {
            if (networkError) {
                setError("customError", {type: "network", message: "Login fails, please try again!"});
            }
            if (graphQLErrors) {
                graphQLErrors.forEach(err => {
                    if (err.extensions?.code === 1002) {
                        setError("customError", {type: "graphql", message: "Username has been taken!"});
                    }
                });
            }
        },
    });

    useEffect(() => {
        if (profileData) {
            reset({
                firstName: profileData.user.firstName,
                lastName: profileData.user.lastName,
                description: profileData.user.profile.description,
            })
        }
    }, [profileData, reset])

    const [openChangeAvatar, setOpenChangeAvatar] = useState(false);
    const handleOpen = () => setOpenChangeAvatar(true);
    const handleClose = () => setOpenChangeAvatar(false);

    if (profileLoading) return <Loading/>;
    if (profileError) return <QueryError errorMessage={profileError}/>;

    const watchFields = watch(["firstName", "lastName", "description"]);


    return (
        <Stack alignItems="center" justifyContent="center" mt={4}>
            {profileData &&
                <Stack component="form" onSubmit={handleSubmit((data) => {
                    delete data.customError;
                    userEditProfile({variables: {profileInput: data}});
                    navigate('/user/' + currUser.userId);
                })} maxWidth="md" alignItems="center" justifyContent="flex-start">
                    <Tooltip title="Change your avatar" placement="right">
                        <Button sx={{borderRadius: 100}}>
                            <Avatar alt="" src={`${profileData.user.profile.avatarUrl}`}
                                    sx={{width: 90, height: 90, fontSize: 50}}
                                    onClick={handleOpen}
                            />
                        </Button>
                    </Tooltip>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{color: "text.secondary", fontSize: 14}}>First Name</Typography>
                            <TextField
                                inputProps={{
                                    ...register("firstName",
                                        {required: "Required field!"})
                                }}
                                required
                                autoComplete="given-name"
                                fullWidth
                                id="firstName"
                                InputProps={{sx: {borderRadius: 4}}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography sx={{color: "text.secondary", fontSize: 14}}>Last Name</Typography>
                            <TextField
                                inputProps={{
                                    ...register("lastName",
                                        {required: "Required field!"})
                                }}
                                required
                                fullWidth
                                id="lastName"
                                autoComplete="family-name"
                                InputProps={{sx: {borderRadius: 4}}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{color: "text.secondary", fontSize: 14}}>Description</Typography>
                            <TextField
                                inputProps={{
                                    ...register("description")
                                }}
                                fullWidth
                                id="description"
                                autoComplete="description"
                                multiline
                                rows={4}
                                InputProps={{sx: {borderRadius: 4}}}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={watchFields[0] === profileData.user.firstName && watchFields[1] === profileData.user.lastName
                            && watchFields[2] === profileData.user.profile.description}
                        type="submit"
                        sx={{
                            width: 1, height: 1,
                            fontSize: 16, backgroundColor: "#d30c0c", borderRadius: 4, p: 0.6,
                            color: "white", textTransform: 'none', m: 2, "&:hover": {
                                backgroundColor: "#d30c0c"
                            }
                        }}>Save</Button>
                </Stack>}
            {errors.customError?.message && (
                <Alert severity="error">{errors.customError?.message}</Alert>)}
            <Modal open={openChangeAvatar} onClose={handleClose} aria-labelledby="avatar-modal">
                <Box>
                    <ChangeAvatar closeModal={handleClose}/>
                </Box>
            </Modal>
        </Stack>
    )
}