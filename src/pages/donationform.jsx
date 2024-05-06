import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone'; // Import moment library
import { TextField, Button, Typography, Snackbar, Container, Grid } from '@mui/material';
import { Alert } from '@mui/material';
import Cookies from 'js-cookie';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';

const DonationForm = () => {
    const [organisationName, setOrganisationName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [venueDateAndTime, setVenueDateAndTime] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            // Redirect to the login page if the token is missing
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = getUserIdFromCookies();
            const venueDateTimeFormatted = moment(venueDateAndTime).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'); // Convert to Asia/Kolkata timezone

            const response = await axios.post('http://localhost:2003/donations', {
                organisationName,
                title,
                description,
                place,
                venueDateAndTime: venueDateTimeFormatted,
                userId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });

            setSuccessMessage('Donation announcement created successfully!');
            setErrorMessage('');
            setOpenSnackbar(true);
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            console.error(error);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleNavigate = (route) => {
        setValue(route);
        navigate(route);
    };

    const getUserIdFromCookies = () => {
        const userDataCookie = Cookies.get('userData');
        if (userDataCookie) {
            try {
                const userData = JSON.parse(userDataCookie);
                return userData.userid;
            } catch (error) {
                console.error('Error parsing userData cookie:', error);
                return null;
            }
        }
        return null;
    };

    return (
        <>
            <Header handleLogout={handleLogout} />
            <Container maxWidth="md" sx={{ margin: '150px auto' }}>
                <Typography variant="h4" align="center" gutterBottom>Create Donation Announcement</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Organisation Name"
                                variant="outlined"
                                fullWidth
                                value={organisationName}
                                onChange={(e) => setOrganisationName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Place"
                                variant="outlined"
                                fullWidth
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Venue Date and Time"
                                    value={venueDateAndTime}
                                    onChange={(newValue) => setVenueDateAndTime(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={errorMessage ? 'error' : 'success'}>
                    {errorMessage || successMessage}
                </Alert>
            </Snackbar>
            <Footer value={value} setValue={setValue} navigate={handleNavigate} />
        </>
    );
};

export default DonationForm;
