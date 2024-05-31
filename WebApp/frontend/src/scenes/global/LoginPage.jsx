import React, { useState, useEffect } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../constants/firebaseConfig';
import axios from 'axios';

export default function SignInSide() {
  const theme = useTheme();
  const [details, setDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [loginImages, setLoginImages] = React.useState({
    login_l: '',
    login_d: '',
  });
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

  const loadLoginImages = async () => {
    try {
      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app, 'gs://parksense-82db2.appspot.com');

      const login_l_url = await getDownloadURL(ref(storage, 'LoginPage/login_l.png'));
      const login_d_url = await getDownloadURL(ref(storage, 'LoginPage/login_d.png'));

      setLoginImages({
        login_l: login_l_url,
        login_d: login_d_url,
      });
    } catch (error) {
      console.error('Error loading login images:', error);
    }
  };

  useEffect(() => {
    loadLoginImages();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (emailError) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/login', details);
      localStorage.setItem('token', response.data.token);

      const [payload] = response.data.token.split('.').slice(1, 2);
      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      if (decodedPayload.role.toUpperCase() === 'CAROWNER') {
        window.location.assign(`/car/dashboard`);
      } else if (decodedPayload.role.toUpperCase() === 'LOTOWNER') {
        window.location.assign(`/lot/dashboard`);
      } else {
        window.location.assign(`/admin/dashboard`);
      }
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${theme.palette.mode === 'dark' ? loginImages.login_d : loginImages.login_l
            })`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h4" color="text.primary">
              Log in to your account
            </Typography>
          </Grid>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
              id="password"
              autoComplete="current-password"
              size="small"
            />
            <Grid container justifyContent="space-between">
              <Grid item>
                <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
              </Grid>
              <Grid item>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer', mt: 1 }}
                  variant="subtitle2"
                  color="text.primary"
                  onClick={() => {
                    setSnackbarSeverity('info');
                    // setSnackbarMessage('A recovery email has been sent to your email');
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
            <Grid container>
              <Grid item>
                <Typography
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  variant="subtitle2"
                  color="text.primary"
                  onClick={() => {
                    window.location.assign('/register');
                  }}
                >
                  Don't have an account? Register
                </Typography>
              </Grid>
            </Grid>
            {error && (
              <MuiAlert severity={snackbarSeverity} sx={{ mt: 2 }}>
                {error}
              </MuiAlert>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}