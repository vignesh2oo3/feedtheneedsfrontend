import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography, Container, Grid, Box, Card, Link, useMediaQuery, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImg from './logoi.png';
import logoGif from './icons/signleft.svg';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const signupEndpoint = 'http://localhost:2003/signup';

    axios.post(signupEndpoint, { name: capitalizeFirstLetter(name), email, password, user_name: userName })
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        alert('Sign up failed');
      });
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        {/* Left half with GIF image */}
        <Grid item xs={12} md={6}>
          <img src={require('./icons/signleft.svg').default} alt="Logo" style={{ width: '100%', height: 'auto', display: isMobile ? 'none' : 'block' }} />
        </Grid>

        {/* Right half with login card */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ padding: 3, borderRadius: 5, backgroundColor: '#fff', boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)', margin: isMobile ? '0' : '75px' }}>
            {!isMobile && <img src={logoImg} alt="Logo" style={{ width: '304px', height: '84px', marginBottom: '20px', marginLeft: '144px' }} />}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ margin: 1, backgroundColor: '#4CAF50' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 3 }}>

                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                  label="Name"
                  sx={{ marginBottom: '10px' }}
                />

                <TextField
                  autoComplete="username"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  label="Username"
                  sx={{ marginBottom: '10px' }}
                />

                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ marginBottom: '10px' }}
                />

                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  sx={{ marginBottom: '10px' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={navigateToLogin} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
