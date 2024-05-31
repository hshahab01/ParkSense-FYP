import React, { useState } from 'react';
import { Grid, Box, Button, Typography, TextField, Checkbox, FormControlLabel, Alert, Paper, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextMaskCustomReg } from '../../../constants/phoneNumber';
import { countries } from '../../../constants/countries';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


export default function KioskRegister() {
    const navigate = useNavigate();
    const [terms, setTerms] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = React.useState({
        Role: 'KIOSK',
        Name: '',
        Email: '',
        AddressL1: '',
        AddressL2: '',
        PostalCode: '',
        City: '',
        Country: '',
        PhoneNo: '',
        Password: '',
        Password2: '',
    });
    const { Name, Email, Password, Password2, PostalCode, AddressL1, AddressL2, City, Country, PhoneNo } = details;
    const [PasswordError, setPasswordError] = React.useState(false);
    const [Password2Error, setPassword2Error] = React.useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const handleTerms = (event) => {
        setTerms(event.target.checked);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setDetails((prevState) => ({ ...prevState, [name]: value }));

        if (name === 'Password' && value.length < 7) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (name === 'Password2' && value.length < 7) {
            setPassword2Error(true);
        } else {
            setPassword2Error(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Invalid email.');
        }
        else if (!terms) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Please accept the terms and conditions');
        } else if (Password.length < 7 || Password2.length < 7) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords should be at least 7 characters long.');
        } else if (Password !== Password2) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords do not match.');
        } else {
            setLoading(true);
            axios
                .post('http://localhost:8000/kiosk/register', details)
                .then(() => {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Registration Successful. Redirecting to login page.');

                    (async () => {
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        navigate('/kiosk/login');
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
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };


    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid item xs={10} sm={8} md={6}>
                <Box p={2}>
                    <Typography align='center' variant="h2" sx={{ mb: 2 }}>
                        Register as a Kiosk Manager
                    </Typography>
                    {snackbarMessage && (
                        <Alert severity={snackbarSeverity} sx={{ mb: 2 }}>
                            {snackbarMessage}
                        </Alert>
                    )}
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="Name"
                                        required
                                        fullWidth
                                        value={Name}
                                        onChange={handleChange}
                                        label="Name"
                                        placeholder="eg. Ali"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="Email"
                                        required
                                        fullWidth
                                        value={Email}
                                        onChange={handleChange}
                                        label="Email"
                                        placeholder="eg. email@example.com"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="Password"
                                        required
                                        fullWidth
                                        value={Password}
                                        onChange={handleChange}
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        inputProps={{ minLength: 7 }}
                                        error={PasswordError}
                                        helperText={PasswordError ? 'Password should be at least 7 characters long.' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="Password2"
                                        required
                                        fullWidth
                                        value={Password2}
                                        onChange={handleChange}
                                        label="Confirm Password"
                                        variant="standard"
                                        type="password"
                                        inputProps={{ minLength: 7 }}
                                        error={Password2Error}
                                        helperText={Password2Error ? 'Password should be at least 7 characters long.' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required>Phone Number</InputLabel>
                                        <Input
                                            value={PhoneNo}
                                            onChange={handleChange}
                                            placeholder="eg. (3xx) xxx-xxxx"
                                            name="PhoneNo"

                                            inputComponent={TextMaskCustomReg}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={AddressL1}
                                        name='AddressL1'
                                        required
                                        onChange={handleChange}
                                        label="Address Line 1"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={AddressL2}
                                        name='AddressL2'
                                        onChange={handleChange}
                                        label="Address Line 2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        value={PostalCode}
                                        required
                                        name='PostalCode'
                                        onChange={handleChange}
                                        label="Postal Code"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        value={City}
                                        name='City'
                                        required
                                        onChange={handleChange}
                                        label="City"
                                        placeholder="eg. New York"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required fullWidth>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            value={Country}
                                            onChange={(e) => setDetails({ ...details, Country: e.target.value })}
                                            renderValue={(value) => (
                                                <Box component="span">
                                                    {value}
                                                </Box>
                                            )}
                                        >
                                            {countries.map((country, index) => (
                                                <MenuItem key={index} value={country.label}>
                                                    <Box component="span">
                                                        <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.label} style={{ marginRight: 8 }} />
                                                        {country.label}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={terms} onChange={handleTerms} color="primary" />}
                                        label="I accept the terms & conditions"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" fullWidth onClick={onSubmit} color="primary">
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
}
