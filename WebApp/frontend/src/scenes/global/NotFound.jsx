import React from 'react';
import { Grid, Button, Container, Typography } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../constants/firebaseConfig'

function NotFound() {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app, "gs://parksense-82db2.appspot.com");
    const [logoUrl, setLogoUrl] = React.useState(null);
    const logoRef = ref(storage, '/NotFound/find.png');
    React.useEffect(() => {
        getDownloadURL(logoRef)
            .then((url) => {
                setLogoUrl(url);
            })
            .catch((error) => {
                console.error('Error fetching logo URL:', error);
            });
    }, [logoRef]);

    const token = localStorage.getItem('token');
    const [payload] = token.split('.').slice(1, 2);
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

    var LogoRedirect;
    if (decodedPayload.role === 'ADMIN') {
        LogoRedirect = "admin/dashboard"
    } else if (decodedPayload.role === 'LOTOWNER') {
        LogoRedirect = "lot/dashboard"
    } else if (decodedPayload.role === 'KIOSK') {
        LogoRedirect = "kiosk/dashboard"
    } else {
        LogoRedirect = "car/dashboard"
    }

    return (
        <Container sx={{ p: 5 }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" align="center" color="text.primary" sx={{ mb: 1 }}>
                        Lost?
                    </Typography>
                    <Typography variant="h4" align="center" color="text.primary" sx={{ mb: 1 }}>
                        Page not found
                    </Typography>
                    <Grid sx={{ mt: 2 }} align="center">
                        <Button
                            variant="contained"
                            onClick={() => {
                                !decodedPayload.role ? window.location.assign('/login') : window.location.assign(`/${LogoRedirect}`);
                            }}
                        >
                            Take me back
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={logoUrl} alt="404" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default NotFound;
