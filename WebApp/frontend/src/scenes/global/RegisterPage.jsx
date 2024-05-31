import * as React from 'react';
import { Typography, Container, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Lot from '../../images/lot2.png';
// import Admin from '../../images/admin.png';
// import Car from '../../images/suv.png';

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    const data = [
        {
            title: 'Become a Parking Lot Hero',
            description:
                'Discover a new level of control with your parking spaces! List and manage your parking space, customize pricing to suit your preferences, and utilize valuable data analytics to streamline operations. With ParkSense, provide a seamless parking experience for all users.\n\n Join us and lead the way in hassle-free parking management!',
            buttonText: 'Become a Parking Partner',
            // image: Lot,
            route: '/lot/register',
        },
        {
            title: 'Park Like a Pro',
            description:
                'Unlock the art of effortless parking with ParkSense! Seamlessly locate the ideal parking spot for your vehicle, enjoy hassle-free and quick in-app payments, and indulge in a stress-free parking experience. \n\nJoin us to simplify your parking routine, and access a range of convenient features tailored to your needs.',
            buttonText: 'Park Smarter',
            // image: Car,
            route: '/car/register',
        },
        {
            title: 'Keep Our Community Organized',
            description:
                'Play a pivotal role in upholding community safety and organization. Your responsibilities extend from meticulously managing user listings to implementing robust security measures for every transaction.\n\nJoin us in maintaining the highest standards of safety, organization, and user satisfaction as a key player in the ParkSense community.',
            buttonText: 'Register as ParkSense Admin',
            // image: Admin,
            route: '/admin/register',
        },
    ];

    return (
        <>
            <Container sx={{ p: 5 }}>
                <Typography variant="h2" align="center" color="text.primary" gutterBottom>
                    Join ParkSense
                </Typography>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {data.map((item, index) => (
                        <Grid item xs={12} sm={4} key={index} sx={{mb:5}}>
                            <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxHeight: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{ marginBottom: 2, marginTop: 2 }}>
                                        {item.description.split('\n').map((line, lineIndex) => (
                                            <React.Fragment key={lineIndex}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                        onClick={() => handleButtonClick(item.route)}
                                    >
                                        {item.buttonText}
                                    </Button>
                                </CardContent>
                            </Card>
                            {/* <img src={item.image} alt={item.title} style={{ width: '100%', alignSelf: 'center', maxHeight: '100%' }} /> */}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
