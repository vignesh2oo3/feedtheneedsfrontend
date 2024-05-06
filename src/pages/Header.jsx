import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, useTheme } from '@mui/material';
import Cookies from 'js-cookie'; // Import Cookies library
import logo from './logoi.png'; // Import the logo image

const Header = ({ handleLogout }) => {
  // Retrieve user data from cookies
  const userDataCookie = Cookies.get('userData');
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;
  const userName = userData ? userData.name : '';
  const theme = useTheme();

  const logout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwtToken');
    // Call the handleLogout function passed as props
    handleLogout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ padding: '20px', minHeight: '80px' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontFamily: 'Brightwall', 
            fontWeight: 'bold',
            transition: 'transform 0.2s', 
            '&:hover': {
              transform: 'scale(1.1)' 
            },
            marginLeft: '85px' 
          }}
        >
          <img src={logo} alt="FeedTheNeeds" style={{ height: '48px', marginRight: '10px' }} />
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              marginRight: '10px', 
              backgroundColor: '#1C5E80', // Change background color to red
              color: theme.palette.primary.contrastText 
            }}
          >
            {userName ? userName.charAt(0) : ''}
          </Avatar>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.1rem', 
              marginRight: '10px',
              transition: 'font-size 0.2s', // Add transition for font size change
              '&:hover': {
                fontSize: '1.2rem' // Increase font size on hover
              }
            }}
          >
            {userName}
          </Typography> 
          <Button 
            color="inherit" 
            onClick={logout} // Call logout function instead of handleLogout directly
            sx={{ 
              fontSize: '1.0rem',
              transition: 'font-size 0.2s', // Add transition for font size change
              '&:hover': {
                fontSize: '1.1rem' // Increase font size on hover
              }
            }}
          >
            Logout
          </Button> 
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
