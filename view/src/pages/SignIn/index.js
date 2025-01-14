import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFirebaseUserCollection } from "../../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { validateLoginService } from '../../services/UserService';
import { GoogleLogin } from 'react-google-login';

const theme = createTheme();

export default function SignIn() {
    const userCollectionRef = useFirebaseUserCollection();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['user']);
    const userCookie = cookies['user'];

    const [email, setEmail] = useState(userCookie && userCookie.email ? userCookie.email : "");
    const [password, setPassword] = useState(userCookie && userCookie.password ? userCookie.password : "");
    // const [remember, setRemember] = useState(userCookie ? true : false);

    const loginWithEmailPassword = (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Email/ Password must not be empty!");
            return;
        }

        const data = { email, password };
        // if success, save user email/password to cookie
        validateLoginService(userCollectionRef,
            data, setEmail, setPassword, setCookie, navigate);
    };

    const loginWithGoogleOAuth = async (response) => {
        const data = {
            username : response.profileObj.name,
            email : response.profileObj.email,
            imageUrl : response.profileObj.imageUrl,
            source : "google"
        }

        setCookie('user', JSON.stringify(data), 
        { path: '/', expires: new Date(Date.now() + 30 * 60 * 1000), httpOnly: false });
        navigate('/');
    };

    const handleGoogleOAuthFailure = (response) => {
        console.error(response);
    }

    useEffect(()=> {
        // prevent logged-in user accessing sign-in
        if(userCookie) {
            navigate('/');
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            onChange={(e) => { setRemember(!remember) }}
                            checked={remember}
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={loginWithEmailPassword}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <GoogleLogin
                            render={renderProps => (
                                <Button
                                    type="submit"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    variant="contained"
                                    sx={{ mb: 2 }}
                                >
                                    Sign In With Google
                                </Button>
                            )}
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onSuccess={loginWithGoogleOAuth}
                            onFailure={handleGoogleOAuthFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <Grid container>
                            {/*<Grid item xs>*/}
                            {/*    <Link href="#" variant="body2">*/}
                            {/*        Forgot password?*/}
                            {/*    </Link>*/}
                            {/*</Grid>*/}
                            <Grid item>
                                <Link href="sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}