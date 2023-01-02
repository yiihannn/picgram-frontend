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
import {useForm} from "react-hook-form"
import {AppContext} from "../../App";
import {useMutation} from "@apollo/client";
import {LOG_IN} from "../../graphql/Mutations";
import {Alert} from "@mui/material";
import {Navigate} from "react-router-dom";
import Copyright from "../others/Copyright";


const theme = createTheme();


export default function SignInSide() {

    const {currUser, setCurrUser, setCurrPage} = useContext(AppContext);
    const {register, handleSubmit, setError, formState: {errors}, clearErrors} = useForm({
        defaultValues: {
            username: "",
            password: "",
            customError: ""
        }
    });


    const [userLogIn] = useMutation(LOG_IN, {
        onCompleted(data) {
            if (data.logIn?.user?.id) {
                console.log("user logged in: ",data.logIn?.user?.username);
                const name = data.logIn?.user?.firstName + " " + data.logIn?.user?.lastName;
                const user = {
                    userId: data.logIn?.user?.id,
                    username: data.logIn?.user?.username,
                    fullName: name
                };
                setCurrUser(user);
            }
        },
        onError({networkError, graphQLErrors}) {
            if (networkError) {
                setError("customError", {type: "network", message: "Login fails, please try again!"});
            }
            if (graphQLErrors) {
                graphQLErrors.forEach(err => {
                    if (err.extensions?.code === 1001) {
                        setError("customError", {type: "graphql", message: "Invalid username or password!"});
                    }
                });
            }
        }
    });

    if (currUser) return <Navigate to="/"/>;

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
                            Sign in
                        </Typography>
                        {errors.customError?.message && (
                            <Alert severity="error">{errors.customError?.message}</Alert>)}
                        <Box component="form" noValidate onChange={() => {
                            clearErrors(["username", "password", "customError"]);
                        }} onSubmit={handleSubmit((data) => {
                            delete data.customError;
                            userLogIn({variables: {userData: data}});
                        })} sx={{mt: 1}}>
                            <TextField
                                inputProps={{
                                    ...register("username",
                                        {required: "Username is required!"})
                                }}
                                required
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                helperText={errors.username?.message}
                            />
                            <TextField
                                inputProps={{
                                    ...register("password", {
                                        required: "Password is required!",
                                        minLength: {
                                            value: 3,
                                            message: "Password length should >= 3!"
                                        }
                                    })
                                }}
                                required
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={errors.password?.message}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link onClick={() => {
                                        setCurrPage("signup")
                                    }} variant="body2">
                                        {"Don't have an account? Sign Up"}
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