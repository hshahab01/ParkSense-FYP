import React from 'react';
import { Grid, Box, Button, Typography, TextField, Checkbox, FormControlLabel, Alert, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { margins } from '../../../constants/theme';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../../constants/firebaseConfig'

export default function AdminRegister() {

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, "gs://parksense-82db2.appspot.com");
    const [logoUrl, setLogoUrl] = React.useState(null);
    const logoRef = ref(storage, '/Homepage/adminreg.png');
    React.useEffect(() => {
        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error('Error fetching logo URL:', error);
            });
    }, [logoRef]);
    const [terms, setTerms] = React.useState(false);
    const [details, setDetails] = React.useState({
        role: 'Admin',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
    });
    const { firstName, lastName, email, password, password2 } = details;
    const [passwordError, setPasswordError] = React.useState(false);
    const [password2Error, setPassword2Error] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleTerms = (event) => {
        setTerms(event.target.checked);
    };

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email' && value.includes('@')) {
            return;
        }

        setDetails((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'password' && value.length < 7) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (name === 'password2' && value.length < 7) {
            setPassword2Error(true);
        } else {
            setPassword2Error(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!terms) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Please accept the terms and conditions');
        } else if (password.length < 7 || password2.length < 7) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords should be at least 7 characters long.');
        } else if (password !== password2) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords do not match.');
        } else {
            details.email = details.email + '@parksense.com';
            console.log(details);
            axios
                .post('http://localhost:8000/admin/register', details)
                .then(() => {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Registration Successful. Redirecting to login page.');

                    (async () => {
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        navigate('/login');
                    })();
                })
                .catch((error) => {
                    if (error.request && error.request.response && error.request.response.status === 403) {
                        setSnackbarSeverity('info');
                        setSnackbarMessage('User already exists. Log in instead.');
                    } else {
                        setSnackbarSeverity('error');
                        setSnackbarMessage('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
                        console.log(error);
                    }
                });

        }
    };

    return (
        <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
                <Box p={2}>
                    <Typography align='left' sx={{ mt: 5, mb: 1 }} variant="h2">
                        Register as an Admin
                    </Typography>
                    {snackbarMessage && (
                        <Alert severity={snackbarSeverity} sx={{ width: '100%', mb: 2 }}>
                            {snackbarMessage}
                        </Alert>
                    )}
                    <Paper elevation={3} sx={{ p: 4, ...margins }}>
                        <form onSubmit={onSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="firstName"
                                            required
                                            fullWidth
                                            style={margins}
                                            value={firstName}
                                            onChange={handleChange}
                                            label="First Name"
                                            placeholder="eg. Ali"
                                            variant="standard"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="lastName"
                                            required
                                            fullWidth
                                            style={margins}
                                            value={lastName}
                                            onChange={handleChange}
                                            label="Last Name"
                                            placeholder="eg. Raza"
                                            variant="standard"
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    style={margins}
                                    value={email}
                                    onChange={handleChange}
                                    label="Company Email"
                                    placeholder="eg. email"
                                    variant="standard"
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>@parksense.com</Typography>
                                        ),
                                    }}
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="password"
                                            required
                                            fullWidth
                                            style={margins}
                                            label="Password"
                                            value={password}
                                            onChange={handleChange}
                                            variant="standard"
                                            type="password"
                                            inputProps={{ minLength: 7 }}
                                            error={passwordError}
                                            margin="normal"
                                            helperText={
                                                passwordError ? 'Password should be at least 7 characters long.' : ''
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="password2"
                                            required
                                            fullWidth
                                            style={margins}
                                            label="Confirm Password"
                                            value={password2}
                                            onChange={handleChange}
                                            variant="standard"
                                            type="password"
                                            inputProps={{ minLength: 7 }}
                                            error={password2Error}
                                            margin="normal"
                                            helperText={
                                                password2Error
                                                    ? 'Password should be at least 7 characters long.'
                                                    : ''
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item align="left">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={terms}
                                                onChange={handleTerms}
                                                name="terms"
                                                color="primary"
                                            />
                                        }
                                        label="I accept the terms & conditions"
                                    />
                                </Grid>

                                <Grid item container justifyContent="center">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={onSubmit}
                                        color="primary"
                                        sx={{ mt: 5, mb: 5 }}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box p={2}>
                    <img src={logoUrl} alt="Admin Registration" style={{ width: '100%' }} />
                </Box>
            </Grid>
        </Grid>
    );
}
