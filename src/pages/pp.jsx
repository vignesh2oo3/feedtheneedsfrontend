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
  OutlinedInput,
  Autocomplete,
} from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/lab';

const ScheduledPostForm = () => {
  const [formData, setFormData] = useState({
    userid: '',
    caption: '',
    image: null,
    selectedType: 'veg',
    quantity: 1,
    selectedCity: null,
    contactNumber: '+91',
    scheduledTime: new Date(), // Default scheduled time
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [value, setValue] = useState('newfood');
  const [chennaiCities, setChennaiCities] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const userDataCookie = Cookies.get('userData');
  
    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      const { name, userid } = userData;
      setUserName(name);
      setFormData(prevState => ({ ...prevState, userid }));
    }
  
    fetchChennaiCities();
  }, []);

  const fetchChennaiCities = () => {
    const cities = [
      // Chennai cities list...
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

    const { userid, caption, image, selectedType, quantity, selectedCity, contactNumber, scheduledTime } = formData;

    const captionWithDetails = `"Hello folks! ${userName} have ${selectedType} food for ${quantity} people in ${selectedCity} Chennai, so grab it fast! Contact Number ${contactNumber} for more details ${caption}  #feedtheneeds #donation #food."`;

    const formDataToSend = new FormData();
    formDataToSend.append('userid', userid);
    formDataToSend.append('caption', captionWithDetails);
    formDataToSend.append('image', image);
    formDataToSend.append('scheduledtime', moment(scheduledTime).format('YYYY-MM-DD HH:mm:ss'));

    try {
      const response = await axios.post('http://localhost:2003/api/scheduled_posts', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setOpenSnackbar(true);
      setFormData({
        userid: '',
        caption: '',
        image: null,
        selectedType: 'veg',
        quantity: 1,
        selectedCity: null,
        contactNumber: '+91',
        scheduledTime: new Date(),
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

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Container maxWidth="md" sx={{ margin: '150px auto' }}>
        {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Schedule Post
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
                      <TextField
                        fullWidth
                        type="datetime-local"
                        label="Scheduled Time"
                        name="scheduledtime"
                        value={formData.scheduledtime}
                        onChange={handleInputChange}
                        InputLabelProps={{
                          shrink: true,
                        }}              
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
                  <DateTimePicker
                    label="Select Scheduled Time"
                    value={formData.scheduledTime}
                    onChange={(newValue) => setFormData({ ...formData, scheduledTime: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
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
                  <Link onClick={() => handleNavigate('/scheduler')} variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.0rem' }}>
                    Click here to schedule the post
                  </Link>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
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
      </Container>
      <Footer value={value} setValue={setValue} navigate={handleNavigate} />
    </>
  );
};

export default ScheduledPostForm;
