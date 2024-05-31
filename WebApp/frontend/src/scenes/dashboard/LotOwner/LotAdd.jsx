import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, Alert, FormControl, InputLabel, MenuItem, Select, Grid, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { margins } from '../../../constants/theme';
import { countries } from '../../../constants/countries';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { storage } from '../../../constants/firebaseConfigNew'
import { ref, uploadBytes } from 'firebase/storage';

export default function LotAdd() {
    const [newLot, setNewLot] = useState({
        LotName: '',
        PostalCode: '',
        AddressL1: '',
        AddressL2: '',
        City: '',
        Country: '',
        zones: [0],
    });

    const token = localStorage.getItem('token');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [imageUpload, setImageUpload] = useState([]);
    const [docUpload, setDocUpload] = useState([]);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [payload] = token.split('.').slice(1, 2);
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const lotID = decodedPayload.id;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLot(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        setAgreeTerms(e.target.checked);
    };

    const handleZoneChange = (index, e) => {
        const { value } = e.target;
        const updatedZones = [...newLot.zones];
        updatedZones[index] = value;
        setNewLot(prev => ({
            ...prev,
            zones: updatedZones
        }));
    };

    const handleAddZone = () => {
        if (newLot.zones.length < 10) {
            setNewLot(prev => ({
                ...prev,
                zones: [...prev.zones, '']
            }));
            setSnackbarMessage('');
            setSnackbarSeverity('');
        }
        else {
            setSnackbarSeverity('error');
            setSnackbarMessage('A lot can have a maximum of 10 zones.');
        }
    };

    const handleRemoveZone = (index) => {
        if (newLot.zones.length <= 1) {
            return;
        }
        const updatedZones = [...newLot.zones];
        updatedZones.splice(index, 1);
        setNewLot(prev => ({
            ...prev,
            zones: updatedZones
        }));
        if (newLot.zones.length < 10) {
            setSnackbarSeverity('');
            setSnackbarMessage('');
        }
    };


    const handleAddLot = async () => {
        if (!newLot.LotName || !newLot.AddressL1 || !newLot.PostalCode || !newLot.City || !newLot.Country) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Enter all required fields")
        }
        else if (!agreeTerms) {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Please accept the terms and conditions');
        }
        else {
            const totalCapacity = newLot.zones.reduce((acc, capacity) => acc + parseInt(capacity || 0), 0);
            const data = {
                ...newLot,
                TotalCapacity: totalCapacity
            };
            setLoading(true);
            try {
                await uploadImg();
                await uploadDoc();
                await axios.post('http://localhost:8000/lot/add', data, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setSnackbarMessage('Request sent successfully!');
                setSnackbarSeverity('success');
            } catch (error) {
                setSnackbarMessage('Error sending request');
                setSnackbarSeverity('error');
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

    };

    const uploadImg = async () => {
        if (imageUpload.length === 0) return;
        const promises = imageUpload.map(file => {
            const imageRef = ref(storage, `ID#${lotID}/${newLot.LotName}/images/${file.name}`);
            return uploadBytes(imageRef, file);
        });
        await Promise.all(promises);
    };

    const uploadDoc = async () => {
        if (docUpload.length === 0) return;
        const promises = docUpload.map(file => {
            const docRef = ref(storage, `ID#${lotID}/${newLot.LotName}/docs/${file.name}`);
            return uploadBytes(docRef, file);
        });
        await Promise.all(promises);
    };



    return (
        <Box p={2}>
            <Typography align='left' sx={{ mt: 2 }} variant="h2">
                Add New Lot
            </Typography>
            <Paper elevation={3} sx={{ p: 4, ...margins }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="LotName"
                            label="Lot Name"
                            value={newLot.LotName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    {newLot.zones.map((zone, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={10} sm={5}>
                                <TextField
                                    value={`Zone ${index + 1}`}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <TextField
                                    name={`Zone ${index + 1} Capacity`}
                                    label={`Zone ${index + 1} Capacity`}
                                    type="number"
                                    value={zone.capacity}
                                    onChange={(e) => handleZoneChange(index, e)}
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ min: 1 }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={2} sm={1} alignSelf="center">
                                {index === newLot.zones.length - 1 && (
                                    <IconButton onClick={handleAddZone} color='primary' size="small">
                                        <AddCircleIcon />
                                    </IconButton>
                                )}
                                {index > 0 && index === newLot.zones.length - 1 && (
                                    <IconButton onClick={() => handleRemoveZone(index)} color='error' size="small">
                                        <RemoveCircleIcon />
                                    </IconButton>
                                )}
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <TextField
                            name="AddressL1"
                            label="Address Line 1"
                            value={newLot.AddressL1}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="AddressL2"
                            label="Address Line 2"
                            value={newLot.AddressL2}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="PostalCode"
                            label="Postal Code"
                            value={newLot.PostalCode}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="City"
                            label="City"
                            value={newLot.City}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                id="country"
                                value={newLot.Country}
                                onChange={handleChange}
                                name="Country"
                                required
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
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="left">
                            <Grid item>
                                <label htmlFor="upload-images">
                                    <Button
                                        component="span"
                                        role={undefined}
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Images
                                    </Button>
                                </label>
                                <input
                                    id="upload-images"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(event) => {
                                        setImageUpload([...imageUpload, ...event.target.files]);
                                    }}
                                    accept=".png,.jpg,.jpeg"
                                    multiple
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {imageUpload.length !== 0 ? imageUpload.map((file, index) => (
                                        <React.Fragment key={index}>
                                            {file.name}
                                            {index !== imageUpload.length - 1 && ', '}
                                        </React.Fragment>
                                    )) : 'No file chosen'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center" justifyContent="left">
                            <Grid item>
                                <label htmlFor="upload-documents">
                                    <Button
                                        component="span"
                                        role={undefined}
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload Documents
                                    </Button>
                                </label>
                                <input
                                    id="upload-documents"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(event) => {
                                        setDocUpload([...docUpload, ...event.target.files]);
                                    }}
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {docUpload.length !== 0 ? docUpload.map((file, index) => (
                                        <React.Fragment key={index}>
                                            {file.name}
                                            {index !== docUpload.length - 1 && ', '}
                                        </React.Fragment>
                                    )) : 'No file chosen'}
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Alert severity={snackbarSeverity} sx={{ width: '100%', mt: 2 }} hidden={!snackbarMessage}>
                    {snackbarMessage}
                </Alert>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox checked={agreeTerms} onChange={handleCheckboxChange} />}
                        label="I agree to the terms and conditions"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddLot}
                            disabled={
                                !newLot.LotName ||
                                !newLot.AddressL1 ||
                                !newLot.PostalCode ||
                                !newLot.City ||
                                !newLot.Country ||
                                imageUpload.length === 0 ||
                                docUpload.length === 0 ||
                                loading
                            }
                            sx={{ width: '100%' }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                        </Button>
                    </Box>
                </Grid>
            </Paper>
        </Box>
    );
}