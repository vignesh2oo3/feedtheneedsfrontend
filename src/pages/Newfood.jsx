import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  IconButton,
  LinearProgress,
  Avatar,
  Box,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Autocomplete,
  CircularProgress // Import CircularProgress component
} from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Newfood = () => {
  const [formData, setFormData] = useState({
    userid: '',
    caption: '',
    image: null,
    selectedType: 'veg',
    quantity: 1,
    selectedCity: null,
    contactNumber: '+91', // Include +91 by default
    latitude: '',
    longitude: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarloc, setOpenSnackbarloc] = useState(false);

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [value, setValue] = useState('newfood');
  const [chennaiCities, setChennaiCities] = useState([]);
  const [userName, setUserName] = useState(''); // Set a default name
  const [fetchingLocation, setFetchingLocation] = useState(false); // State for fetching location
  const navigate = useNavigate();

  useEffect(() => {
    const userDataCookie = Cookies.get('userData');

    // If userData cookie exists
    if (userDataCookie) {
      // Parse JSON string into an object
      const userData = JSON.parse(userDataCookie);
  
      // Access the name property from userData object
      const { name, userid } = userData;
  
      // Set the name in component state
      setUserName(name);
  
      // Log the name
      console.log("Name:", name);
  
      // Set the userid in form data state
      setFormData(prevState => ({ ...prevState, userid }));
    }
    // Get the JWT token from local storage
  const token = localStorage.getItem('jwtToken');

    if (!token) {
      // Navigate to the login page if the token doesn't exist
      navigate('/login');
    }
  
    fetchChennaiCities();
    // Auto reload the page after successful post
    if (openSnackbar) {
      // Reload the page after 2 seconds
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 2000);

      // Clear the timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [openSnackbar,navigate]);
  

  const fetchChennaiCities = () => {
    // Simulated fetch for Chennai cities
    const cities = [
      'Adambakkam',
      'Adyar',
      'Alandur',
      'Alapakkam',
      'Alwarpet',
      'Alwarthirunagar',
      'Ambattur',
      'Aminjikarai',
      'Anna Nagar',
      'Annanur',
      'Arumbakkam',
      'Ashok Nagar',
      'Avadi',
      'Ayanavaram',
      'Beemannapettai',
      'Besant Nagar',
      'Basin Bridge',
      'Chepauk',
      'Chetput',
      'Chintadripet',
      'Chitlapakkam',
      'Choolai',
      'Choolaimedu',
      'Chrompet',
      'Egmore',
      'Ekkaduthangal',
      'Eranavur',
      'Ennore',
      'Foreshore Estate',
      'Fort St. George',
      'George Town',
      'Gopalapuram',
      'Government Estate',
      'Guindy',
      'Guduvancheri',
      'IIT Madras',
      'Injambakkam',
      'ICF',
      'Iyyapanthangal',
      'Jafferkhanpet',
      'Karapakkam',
      'Kattivakkam',
      'Kattupakkam',
      'Kazhipattur',
      'K.K. Nagar',
      'Keelkattalai',
      'Kattivakkam',
      'Kilpauk',
      'Kodambakkam',
      'Kodungaiyur',
      'Kolathur',
      'Korattur',
      'Korukkupet',
      'Kottivakkam',
      'Kotturpuram',
      'Kottur',
      'Kovilambakkam',
      'Koyambedu',
      'Kundrathur',
      'Madhavaram',
      'Madhavaram Milk Colony',
      'Madipakkam',
      'Madambakkam',
      'Maduravoyal',
      'Manali',
      'Manali New Town',
      'Manapakkam',
      'Mandaveli',
      'Mangadu',
      'Mannady',
      'Mathur',
      'Medavakkam',
      'Meenambakkam',
      'MGR Nagar',
      'Minjur',
      'Mogappair',
      'MKB Nagar',
      'Mount Road',
      'Moolakadai',
      'Moulivakkam',
      'Mugalivakkam',
      'Mudichur',
      'Mylapore',
      'Nandanam',
      'Nanganallur',
      'Nanmangalam',
      'Neelankarai',
      'Nemilichery',
      'Nesapakkam',
      'Nolambur',
      'Noombal',
      'Nungambakkam',
      'Otteri',
      'Padi',
      'Pakkam',
      'Palavakkam',
      'Pallavaram',
      'Pallikaranai',
      'Pammal',
      'Park Town',
      'Parry\'s Corner',
      'Pattabiram',
      'Pattaravakkam',
      'Pazhavanthangal',
      'Peerkankaranai',
      'Perambur',
      'Peravallur',
      'Perumbakkam',
      'Perungalathur',
      'Perungudi',
      'Pozhichalur',
      'Poonamallee',
      'Porur',
      'Pudupet',
      'Pulianthope',
      'Purasaiwalkam',
      'Puthagaram',
      'Puzhal',
      'Puzhuthivakkam/Ullagaram',
      'Raj Bhavan',
      'Ramavaram',
      'Red Hills',
      'Royapettah',
      'Royapuram',
      'Saidapet',
      'Saligramam',
      'Santhome',
      'Sembakkam',
      'Selaiyur',
      'Shenoy Nagar',
      'Sholavaram',
      'Sholinganallur',
      'Sithalapakkam',
      'Sowcarpet',
      'St. Thomas Mount',
      'Surapet',
      'Tambaram',
      'Teynampet',
      'Tharamani',
      'T. Nagar',
      'Thirumangalam',
      'Thirumullaivoyal',
      'Thiruneermalai',
      'Thiruninravur',
      'Thiruvanmiyur',
      'Tiruverkadu',
      'Thiruvotriyur',
      'Thuraipakkam',
      'Tirusulam',
      'Tiruvallikeni',
      'Tondiarpet',
      'Vandalur',
      'Vadapalani',
      'Valasaravakkam',
      'Vallalar Nagar',
      'Vanagaram',
      'Velachery',
      'Velappanchavadi',
      'Villivakkam',
      'Virugambakkam',
      'Vyasarpadi',
      'Washermanpet',
      'West Mambalam'
    ]; 
    setChennaiCities(cities);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
    generatePreviewImage(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setPreviewImage(null);
  };

  const generatePreviewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, img.height - 50, img.width, 50);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formData.caption, img.width / 2, img.height - 20);
        const previewUrl = canvas.toDataURL('image/jpeg');
        setPreviewImage(previewUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { userid, caption, image, selectedType, quantity, selectedCity, contactNumber, latitude, longitude } = formData;

    try {
      // Make a separate API call to get the location link
      const locationResponse = await axios.post('http://localhost:2003/Location', { latitude, longitude });
      const locationLink = locationResponse.data.link;

      // Construct the caption with the location link
      const captionWithDetails = `"📢📢📢📢📢📢📢📢📢\nCheck the caption below!!!👇\n👋 Hello folks! ${userName} have ${selectedType} 🥦🍗 food for ${quantity} people in ${selectedCity} Chennai.\n🍽️ So grab it fast! Contact Number ${contactNumber} for more details ${caption}.\n📍 Location: ${locationLink}\n#feedtheneeds #donation #food."`;

      // Prepare data to send for scheduled_posts API
      const formDataToSend = new FormData();
      formDataToSend.append('userid', userid);
      formDataToSend.append('caption', captionWithDetails);
      formDataToSend.append('image', image);
      formDataToSend.append('scheduledtime', moment().format('YYYY-MM-DD HH:mm:ss'));

      // Make the API call to scheduled_posts API
      const response = await axios.post('http://localhost:2003/api/scheduled_posts', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'multipart/form-data',
         
        },
      });

      console.log(response.data);
      setOpenSnackbar(true);

      // Reset form data after successful submission
      setFormData({
        userid: '',
        caption: '',
        image: null,
        selectedType: 'veg',
        quantity: 1,
        selectedCity: null,
        contactNumber: '+91',
        latitude: '',
        longitude: '',
      });
      setPreviewImage(null);
    } catch (error) {
      console.error('Error scheduling post:', error);
    } finally {
      setLoading(false);
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

  const handleRadioChange = (event) => {
    setFormData({
      ...formData,
      selectedType: event.target.value,
    });
  };

  const navigateToScheduler = () => {
    navigate('/scheduler');
  };

  const handleQuantityChange = (event) => {
    setFormData({
      ...formData,
      quantity: event.target.value,
    });
  };

  const handleCityChange = (event, value) => {
    setFormData({
      ...formData,
      selectedCity: value,
    });
  };

  const handleContactNumberChange = (event) => {
    setFormData({
      ...formData,
      contactNumber: event.target.value,
    });
  };

  const handleLocationButtonClick = async () => {
    try {
      // Set fetchingLocation to true when fetching location starts
      setFetchingLocation(true);
      setOpenSnackbarloc(true)
      
      // Get current location using Geolocation API
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          });
          
          // Set fetchingLocation to false when fetching location succeeds
          setFetchingLocation(false);
        },
        (error) => {
          console.error('Error getting current location:', error);
          
          // Set fetchingLocation to false when fetching location fails
          setFetchingLocation(false);
        }
      );
    } catch (error) {
      console.error('Error getting current location:', error);
      
      // Set fetchingLocation to false when fetching location fails
      setFetchingLocation(false);
    }
  };
const handleCloseSnackbarloc = () =>{
  setOpenSnackbarloc(false)
}
  return (
    <>
      <Header handleLogout={handleLogout} />
      <LinearProgress style={{ position: 'absolute', top: '64px', left: 0, width: '100%' }} sx={{ zIndex: 1000 }} />
      <Container maxWidth="md" sx={{ margin: '150px auto', position: 'relative' }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Create a New Post
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Write something about food..."
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload">
                    <Button color="primary" component="span" variant="contained">
                      Add Photo
                    </Button>
                  </label>
                </Grid>
                {previewImage && (
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={previewImage} sx={{ width: 100, height: 100, marginRight: 1 }} />
                      <IconButton onClick={handleRemoveImage} size="small">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <RadioGroup row aria-label="foodType" name="selectedType" value={formData.selectedType} onChange={handleRadioChange}>
                    <FormControlLabel value="veg" control={<Radio />} label="Veg" />
                    <FormControlLabel value="non-veg" control={<Radio />} label="Non-Veg" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="quantity-label">Quantity</InputLabel>
                    <Select
                      labelId="quantity-label"
                      id="quantity"
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      label="Quantity"
                    >
                      {[...Array(100).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    options={chennaiCities}
                    renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
                    value={formData.selectedCity}
                    onChange={handleCityChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleContactNumberChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    Post
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="outlined" color="primary" onClick={handleLocationButtonClick}>
                    {fetchingLocation ? <CircularProgress size={24} di/> : 'Get Current Location'}
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Link onClick={navigateToScheduler} variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.0rem' }}>
                    Click here to schedule the post
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    message={
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ mr: 1, color: 'green' }} />
                        Upload post successfully
                      </span>
                    }
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                        <CheckCircle fontSize="small" />
                      </IconButton>
                    }  
                  />
                </Grid>
                <Grid item xs={12}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={openSnackbarloc}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbarloc}
                    message={
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ mr: 1, color: 'green' }} />
                        Your Location is Set
                      </span>
                    }
                    action={
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbarloc}>
                        <CheckCircle fontSize="small" />
                      </IconButton>
                    }  
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer value={value} setValue={setValue} navigate={handleNavigate} />
    </>
  );
};

export default Newfood;
