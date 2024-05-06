import React from 'react';
import { BottomNavigation, BottomNavigationAction, styled } from '@mui/material';
import {
  Home as HomeIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Schedule as ScheduleIcon,
  VolunteerActivism as VolunteerActivismIcon,
} from '@mui/icons-material';
import announcementIcon from './icons/announcement.png'; // Adjust the path according to your project structure

// Define a styled component for BottomNavigationAction with 3D color animation on hover
const AnimatedBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  '&:hover': {
    transform: 'scale(1.2)', // Scale effect on hover
    color: theme.palette.secondary.main, // Change to your desired hover color
    transition: 'color 0.3s, transform 0.3s', // Add a smooth transition effect
  },
  '&.Mui-selected': {
    color: 'black', // Set the active (selected) icon color to white
  },
}));

const Footer = ({ value, setValue, navigate }) => {
  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 'home':
        navigate('/home');
        break;
      case 'explore':
        navigate('/announcement');
        break;
      case 'newfood':
        navigate('/newfood');
        break;
      case 'scheduler':
        navigate('/scheduler');
        break;
      case 'profile':
        navigate('/donationform');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => handleNavigation(newValue)}
      showLabels
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#4CAF50', // Green background color
      }}
    >
      {/* Use the AnimatedBottomNavigationAction component instead of BottomNavigationAction */}
      <AnimatedBottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <AnimatedBottomNavigationAction 
        label="Show Announcement" 
        value="explore" 
        icon={<img src={announcementIcon} alt="Announcement" style={{ width: '24px', height: '24px' }} />} // Set width and height
      />
      <AnimatedBottomNavigationAction label="New Food" value="newfood" icon={<AddCircleOutlineIcon />} />
      <AnimatedBottomNavigationAction label="Scheduler" value="scheduler" icon={<ScheduleIcon />} />
      <AnimatedBottomNavigationAction label="Post Announcement" value="profile" icon={<VolunteerActivismIcon />} />
    </BottomNavigation>
  );
};

export default Footer;
