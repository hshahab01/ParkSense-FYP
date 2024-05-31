import React from 'react';
import { Grid, List, ListItemText, Typography, Button, Stack, useTheme, Link } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export function Copyright(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Handle the click event for the logo link
    const handleLogoClick = () => {
        if (!token) {
            navigate('/');
            return;
        }

        // Decode the token to get the payload
        const [payload] = token.split('.').slice(1, 2);
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

        // Determine the redirection path based on the role
        let LogoRedirect;
        if (decodedPayload.role === 'ADMIN') {
            LogoRedirect = "/admin/dashboard";
        } else if (decodedPayload.role === 'LOTOWNER') {
            LogoRedirect = "/lot/dashboard";
        } else if (decodedPayload.role === 'KIOSK') {
            LogoRedirect = "/kiosk/dashboard";
        } else {
            LogoRedirect = "/car/dashboard";
        }

        navigate(LogoRedirect);
    };

    return (
        <Typography variant="body2" align="center" {...props} color="white.main">
            {'Copyright © '}
            <Link color="inherit" onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
                ParkSense
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const theme = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <Box
            sx={{
                background: theme.palette.black.main,
                p: { xs: 4, md: 7 },
                pt: 12,
                pb: 12,
                fontSize: { xs: '12px', md: '14px' },
            }}
        >
            <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign="center">
                <Grid item xs={12} md={6} lg={4}>
                    <Typography
                        sx={{ mb: 1 }}
                        variant="h3"
                        color="white.main">
                        About us
                    </Typography>
                    <Typography
                        variant="caption2"
                        color="white.main">
                        ParkSense - Parking made easy.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                        }}
                    >
                        <FacebookIcon sx={{ mr: 1, color: "white.main" }} />
                        <TwitterIcon sx={{ mr: 1, color: "white.main" }} />
                        <InstagramIcon sx={{ color: "white.main" }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <Typography variant="body2" color="white.main">Information</Typography>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Contact Us
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Privacy &amp; Policy
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Terms &amp; Conditions
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <Typography variant="body2" color="white.main">Usage</Typography>
                    <List>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Login
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Dashboard
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography lineHeight={2} variant="caption2" color="white.main">
                                Profile
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
                {
                    !token && (

                        <Grid item xs={12} md={6} lg={4}>
                            <Stack>
                                <Button
                                    onClick={() => {
                                        navigate('/kiosk/login');
                                    }}
                                    sx={{ mt: 4, mb: 4 }}
                                    variant="contained"
                                >
                                    Kiosk Portal
                                </Button>
                            </Stack>
                        </Grid>
                    )
                }
            </Grid>
            <Copyright sx={{ mt: 2 }} />
        </Box >
    );
}
