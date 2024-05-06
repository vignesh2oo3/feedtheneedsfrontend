import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Swiggy orange color
    },
    secondary: {
      main: '#00cc66', // Swiggy green color
    },
    background: {
      default: '#FEFEFA', // Swiggy background color
    },
    text: {
      primary: '#333333', // Text color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
