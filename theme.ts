import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';
import {lighten} from "@mui/material";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background:{
      paper:'#2e2e2e',
      default:'#212121',
    },
    text:{
      primary:'#d7d7d7',
      secondary:'#9a9797'
    },
    primary: {
      main: '#bb85fb',
      light: '#c595fd',
      dark:'#212121'
    },
    secondary: {
      main: '#1ddecb',
      light: '#ffffff',
      dark:'#2e2e2e'
    },
    error: {
      main: red.A400,
      light: lighten(red.A400, 0.7)
    },
  },
});

export default theme;
