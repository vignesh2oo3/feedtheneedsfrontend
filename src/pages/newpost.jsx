import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Location from "./location";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const StyledInput = styled("input")({
  display: "none", // Hide the default file input
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const StyledButton = styled(Button)({
  marginTop: "15px",
  backgroundColor: "#1976D2",
  color: "white",
  "&:hover": {
    backgroundColor: "#125699",
  },
});
const names = [
  'idly/dosa',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const defaultCenter = { lat: 0, lng: 0 };
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [postType, setPostType] = useState("");
  const [image, setImage] = useState(null);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [locationLink, setLocationLink] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [markedLocation, setMarkedLocation] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    handleGetLocationLink();
  }, []); // Fetch location link on component mount

  const handleGetLocationLink = () => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          setCurrentLocation({ lat: latitude, lng: longitude });

          try {
            const response = await axios.post('http://localhost:2003/Location', {
              latitude,
              longitude,
              apiKey: 'AIzaSyBk8JKEJNIi1v67GOJc5FS5UEXaOpQ7MWA', // Replace with your API key
            });

            setLocationLink(response.data.link);
          } catch (error) {
            console.error('Error sending location to the server:', error.message);
          }

          // If you only need the location once, uncomment the line below to stop watching
          // navigator.geolocation.clearWatch(watchId);
        },
        (error) => {
          console.error('Error getting current position:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };

  const handleSendLocation = async () => {
    try {
      const response = await axios.post('http://localhost:2003/Location', {
        latitude,
        longitude,
        apiKey: 'AIzaSyBk8JKEJNIi1v67GOJc5FS5UEXaOpQ7MWA', // Replace with your API key
      });

      setLocationLink(response.data.link);
    } catch (error) {
      console.error('Error getting location link:', error.message);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const latitude = latLng.lat();
    const longitude = latLng.lng();
    setLatitude(latitude);
    setLongitude(longitude);
    setMarkedLocation({ lat: latitude, lng: longitude });
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setCurrentLocation({ lat: latitude, lng: longitude });
      setMarkedLocation(null);
    });
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const caption2=caption+"/n"+locationLink;
    const formData = new FormData();
    formData.append("caption", caption2);
    formData.append("image", image);
    formData.append("post_type", "food");

    try {
      const response = await axios.post(
        "http://localhost:2003/new_posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    console.log(event)
    var values= event.target.value;
    setCaption(values)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <Container maxWidth="xs">
     <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">New Post</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Caption"
                variant="outlined"
                value={caption}
                onChange={handleCaptionChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Foods</InputLabel>
                <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleImageChange} />
              {image && (
                <Box mt={2} display="flex" justifyContent="center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    style={{ maxWidth: "50%", maxHeight: "50%" }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <h1>Live Location</h1>
      <LoadScript googleMapsApiKey="AIzaSyBk8JKEJNIi1v67GOJc5FS5UEXaOpQ7MWA"> {/* Replace with your API key */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          onClick={handleMapClick}
        >
          {markedLocation && <Marker position={markedLocation} />}
          <Marker position={currentLocation} />
        </GoogleMap>
      </LoadScript>
      <button onClick={handleGetLocationLink}>Get Live Location Link</button>
      <button onClick={handleGetCurrentLocation}>Show Current Location</button>
      <button onClick={handleSendLocation}>Send Location</button>
      {locationLink && (
        <div>
          <p>Live Location Link:</p>
          <a href={locationLink} target="_blank" rel="noopener noreferrer">
            {locationLink}
          </a>
        </div>
      )}
    </Container>
  );
};

export default NewPost;
