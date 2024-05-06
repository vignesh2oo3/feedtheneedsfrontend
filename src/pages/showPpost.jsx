import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('home');
  const [expandedCaption, setExpandedCaption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      axios.get('http://localhost:2003/Showposts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const TimeAgo = ({ timestamp }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
      const updateTimeAgo = () => {
        const timeAgoString = moment(timestamp, 'DD/MM/YYYY, h:mm:ss a').fromNow();
        setTimeAgo(timeAgoString);
      };

      updateTimeAgo();

      const interval = setInterval(updateTimeAgo, 60000);

      return () => clearInterval(interval);
    }, [timestamp]);

    return <span>{timeAgo}</span>;
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigate = (route) => {
    setValue(route);
    navigate(route);
  };

  const handleExpandCaption = (caption) => {
    setExpandedCaption(caption);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', // Green color
      },
      background: {
        default: '#f0f0f0', // Background color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header handleLogout={handleLogout} />
      <div style={{ marginTop: '94px' }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="flex-start"
        >
          {posts.map((post) => (
            <Grid item key={post.PostID} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ 
                borderRadius: 12,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                borderBottom: '3px solid #4CAF50', // Green color for the line
              }}>
                <CardHeader
                  avatar={
                    <Avatar src='' >
                      F
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="Feed the need"
                  subheader={<TimeAgo timestamp={post.current_time} />}
                /> 
                <CardMedia
                  component="img"
                  alt="Post Image"
                  height="300"
                  image={post.image_url}
                  sx={{
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    objectFit: 'cover',
                    maxHeight: '100%',
                    maxWidth: '100%',
                  }}
                />
                <CardContent sx={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body1" fontWeight="bold">
                      <strong>{post.username}</strong>
                    </Typography>
                  </Stack>
                  <Typography variant="body1" style={{ marginBottom: '20px', flexGrow: 1 }}>
                    {expandedCaption === post.PostID ? post.caption : (
                      <>
                        {post.caption.substring(0, 100)}...
                        <Button
                          variant="text"
                          color="primary"
                          size="small"
                          onClick={() => handleExpandCaption(post.PostID)}
                        >
                          Read More
                        </Button>
                      </>
                    )}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<LocationOnIcon />}
                    sx={{ alignSelf: 'flex-end', borderRadius: '150px' }}
                    href={post.caption.match(/https:\/\/www\.google\.com\/maps\?q=[^"\s]+/)?.[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Location
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<WhatsAppIcon />}
                    sx={{ alignSelf: 'flex-end', borderRadius: '120px', marginTop: '20px' }}
                    href={post.whatappchart_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp Chat
                  </Button>
                </CardContent>
              </Card>
            </Grid>

          ))}
        </Grid>
        
      </div>
      <Footer value={value} setValue={setValue} navigate={handleNavigate} />
    </ThemeProvider>
  );
};

export default ShowPost;
