import React, { useState } from 'react';
import { Grid, Box, Button, Typography, TextField, Paper, Alert } from '@mui/material';
import { margins } from '../../../constants/theme';
import axios from 'axios';

export default function CarSupport() {
    const token = localStorage.getItem('token');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/car/support', { subject, body }, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setSnackbarMessage('Request sent successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error sending request');
            setSnackbarSeverity('error');
            console.log(error)
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
                <Box p={2}>
                    <Typography align='left' variant="h2" gutterBottom>
                        Support
                    </Typography>
                    {snackbarMessage && (
                        <Alert severity={snackbarSeverity} sx={{ width: '100%', mb: 2 }}>
                            {snackbarMessage}
                        </Alert>
                    )}
                    <Paper elevation={3} sx={{ p: 4, ...margins }}>
                        <form>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="Subject"
                                        required
                                        fullWidth
                                        label="Subject (max 60 characters)"
                                        variant="outlined"
                                        inputProps={{ maxLength: 60 }}
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Details (max 500 characters)"
                                        multiline
                                        rows={7}
                                        fullWidth
                                        variant="outlined"
                                        required
                                        inputProps={{ maxLength: 500 }}
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={handleSubmit}
                                    >
                                        Submit
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
