import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'
import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Grid,
    Typography,
    Paper,
    useTheme,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export default function KioskLogin() {
    const theme = useTheme();
    const [details, setDetails] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [loading, setLoading] = useState(false);
    const { email, password } = details;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'email' && value) {
            setEmailError(!isValidEmailFormat(value));
        }
    };

    const isValidEmailFormat = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (emailError) {
            setError('Invalid email format.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/kiosk/login', details);
            localStorage.setItem('token', response.data.token);
            window.location.assign(`/kiosk/dashboard`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setSnackbarSeverity('error');
                setError(error.response.data.message || 'Invalid Credentials.');
            } else {
                setSnackbarSeverity('error');
                setError('An error occurred during login.');
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid item xs={10} sm={8} md={5}>
                <Paper elevation={6} sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar sx={{ m: 'auto', bgcolor: theme.palette.primary.main }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" color="text.primary" sx={{ mt: 2 }}>
                        Log in as a Kiosk Manager
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoComplete="email"
                            size="small"
                            error={emailError}
                            helperText={emailError ? 'Incorrect email format.' : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            onChange={handleChange}
                            type="password"
                            autoComplete="current-password"
                            size="small"
                        />
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                            <Grid item>
                                <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle2"
                                    color="text.primary"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setSnackbarSeverity('info');
                                        setError('A recovery email has been sent to your email');
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            size="medium"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.main }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                        </Button>
                        <Typography variant="subtitle2" color="text.primary" sx={{ cursor: 'pointer' }} onClick={() => {
                            window.location.assign('/kiosk/register');
                        }}>
                            Don't have an account? Register
                        </Typography>
                        {error && (
                            <MuiAlert severity={snackbarSeverity} sx={{ mt: 2 }}>
                                {error}
                            </MuiAlert>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
