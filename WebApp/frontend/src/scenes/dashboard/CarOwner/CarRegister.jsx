import React from 'react';
import { Grid, Box, Button, Typography, TextField, Checkbox, FormControlLabel, Alert, Paper, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { margins } from '../../../constants/theme';
import { genderArr } from '../../../constants/Menus';
import { TextMaskCustomReg } from '../../../constants/phoneNumber';
import { countries } from '../../../constants/countries';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../../constants/firebaseConfig'

export default function CarRegister() {

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, "gs://parksense-82db2.appspot.com");
    const [logoUrl, setLogoUrl] = React.useState(null);
    const logoRef = ref(storage, '/Homepage/parker.png');
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
        role: 'CAROWNER',
        firstName: '',
        lastName: '',
        gender: '',
        DOB: '',
        email: '',
        city: '',
        country: '',
        phoneNo: '',
        password: '',
        password2: '',
    });

    const { firstName, lastName, email, password, password2, gender, DOB, city, country, phoneNo } = details;
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Invalid email.');
        }
        else if (!terms) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Please accept the terms and conditions');
        } else if (password.length < 7 || password2.length < 7) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords should be at least 7 characters long.');
        } else if (password !== password2) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Passwords do not match.');
        } else {
            axios
                .post('http://localhost:8000/car/register', details)
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
                        Register as a Car Owner
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

                                <Grid item style={margins}>
                                    <FormControl style={{ width: '45%', marginRight: '20px' }} required>
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            required
                                            value={gender}
                                            label="Gender"

                                            onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                                            fullWidth
                                        >
                                            {genderArr.map((s, i) => (
                                                <MenuItem key={i} value={s}>{s}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        style={{ width: '45%' }}
                                        name="DOB"
                                        required
                                        label="Date of Birth"
                                        value={DOB}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        type="date"
                                        fullWidth
                                    />
                                </Grid>

                                <TextField
                                    name="email"
                                    required
                                    fullWidth
                                    style={margins}
                                    value={email}
                                    onChange={handleChange}
                                    label="Email"
                                    placeholder="eg. email@example.com"
                                    variant="standard"
                                    margin="normal"
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

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth variant="standard">
                                            <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                                            <Input
                                                value={phoneNo}
                                                onChange={handleChange}
                                                placeholder="eg. (3xx) xxx-xxxx"
                                                name="phoneNo"
                                                id="formatted-text-mask-input"
                                                inputComponent={TextMaskCustomReg}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            value={city}
                                            name='city'
                                            onChange={handleChange}
                                            label="City"
                                            placeholder="eg. New York"
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item style={{ marginBottom: '20px', marginTop: '20px' }}>
                                    <FormControl required fullWidth style={{ minWidth: 250 }}>
                                        <InputLabel>Country</InputLabel>
                                        <Select
                                            required
                                            value={country}
                                            label='Country'
                                            onChange={(e) => {
                                                setDetails({ ...details, country: e.target.value });
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 250,
                                                        width: 'auto',
                                                    },
                                                },
                                            }}
                                            renderValue={(value) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {value}
                                                </Box>
                                            )}
                                        >
                                            {countries.map((country, index) => (
                                                <MenuItem key={index} value={country.label}>
                                                    <Box
                                                        component="img"
                                                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                                        sx={{ mr: 1 }}
                                                    />
                                                    {country.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                    <img src={logoUrl} alt="Car Owner Registration" style={{ width: '100%' }} />
                </Box>
            </Grid>
        </Grid>
    );
}