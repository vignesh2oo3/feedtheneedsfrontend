import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Link, Avatar, Card, Box, Snackbar, Dialog, DialogContent, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import the check mark icon
import axios from 'axios';
import Cookies from 'js-cookie';
import MuiAlert from '@mui/material/Alert';
import logoImg from './logoi.png';

// Import your logo SVG image
import logoSvg from './icons/loginside.svg';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage whether password is visible
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [emailError, setEmailError] = useState(false); // State to manage email format error
  const navigate = useNavigate();

  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        setOpenDialog(false);
        navigate('/home');
      }, 3000); // Close the dialog after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [openDialog, navigate]);

  const handleLogin = () => {
    if (email === '' || password === '') {
      toast.error("Please Enter Email or Password");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }

    const loginEndpoint = 'http://localhost:2003/login';

    axios.post(loginEndpoint, { email, password })
      .then((response) => {
        if (response.status === 200) {
          const { userid, name, email, token } = response.data;
          localStorage.setItem('jwtToken', token); // Storing JWT token in localStorage

          Cookies.set('userData', JSON.stringify({ userid, name, email }));
          setOpenDialog(true);
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const navigateToRegister = () => {
    navigate('/signup');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/home');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailBlur = () => {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <>
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        {/* Left half with SVG image */}
        <Grid item xs={12} md={6} >
          <img src={logoSvg} alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </Grid>

        {/* Right half with login card */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ padding: 3, borderRadius: 5, backgroundColor: '#fff', boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)' }}>
            <img src={logoImg} alt="Logo" style={{ width: '304px',  height: '84px', marginBottom: '20px', marginLeft: '120px'}} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#4CAF50' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: '#333', fontWeight: 'bold' }}>
                Sign in to Your Account
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur} // Call handleEmailBlur on blur event
                  error={emailError} // Add error prop based on emailError state
                  helperText={emailError && "Invalid email format"} // Helper text for email error
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  id="password"
                  autoComplete="new-password"
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', color: '#fff', '&:hover': { backgroundColor: '#45a049' } }}
                  onClick={handleLogin}
                  disabled={emailError} // Disable button if email format is invalid
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={navigateToRegister} variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', cursor: 'pointer' }}>
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} sx={{ backgroundColor: '#f44336', color: '#fff' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          Invalid email or password. Please try again.
        </Alert>
      </Snackbar>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ backgroundColor: '#fff', textAlign: 'center', padding: '2rem' }}>
          <CheckCircleOutlineIcon sx={{ color: '#4CAF50', fontSize: '5rem', marginBottom: '1rem' }} />
          <Typography variant="h6" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
            Login successful! Welcome back!
          </Typography>
        </DialogContent>
      </Dialog>

      {/* ToastContainer from react-toastify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default Login;
