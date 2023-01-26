import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {useContext} from "react";
import {AppContext} from "../../App";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {SIGN_UP} from "../../graphql/Mutations";
import {Alert} from "@mui/material";
import Copyright from "../others/Copyright";


const theme = createTheme();

export default function SignUpSide() {
    const {setCurrPage} = useContext(AppContext);

    const {register, handleSubmit, setError, formState: {errors}, clearErrors} = useForm({
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            location: "",
            description: "",
            occupation: "",
            customError: ""
        }
    });

    const [userSignUp] = useMutation(SIGN_UP, {
        onCompleted(data) {
            if (data.signUp?.user?.id) {
                setCurrPage("signin");
            }
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
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {errors.customError?.message && (
                            <Alert severity="error">{errors.customError?.message}</Alert>)}
                        <Box component="form" noValidate onChange={() => {
                            clearErrors("customError");
                        }} onSubmit={handleSubmit((data) => {
                            delete data.customError;
                            userSignUp({variables: {userData: data}});
                        })} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputProps={{
                                            ...register("firstName",
                                                {required: "Required field!"})
                                        }}
                                        helperText={errors.first_name?.message}
                                        required
                                        autoComplete="given-name"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputProps={{
                                            ...register("lastName",
                                                {required: "Required field!"})
                                        }}
                                        helperText={errors.last_name?.message}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("username",
                                                {required: "Required field!"})
                                        }}
                                        required
                                        margin="normal"
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoComplete="username"
                                        helperText={errors.username?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("password",
                                                {required: "Required field!"})
                                        }}
                                        helperText={errors.password?.message}
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("email")
                                        }}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("location")
                                        }}
                                        fullWidth
                                        id="location"
                                        label="Location"
                                        autoComplete="location"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("occupation")
                                        }}
                                        fullWidth
                                        id="occupation"
                                        label="Occupation"
                                        autoComplete="occupation"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{
                                            ...register("description")
                                        }}
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        autoComplete="description"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={() => {
                                        setCurrPage("signin")
                                    }} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}