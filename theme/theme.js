import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Teal 500
      light: '#4DB6AC', // Teal 300
      dark: '#00796B', // Teal 700
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#26A69A', // Teal 400
      light: '#80CBC4', // Teal 200
      dark: '#00897B', // Teal 600
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F5F5',
      paper: '#ffffff',
    },
    text: {
      primary: '#263238', // Blue Grey 900
      secondary: '#546E7A', // Blue Grey 600
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#00796B',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#00796B',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#00796B',
    },
    h4: {
      fontWeight: 500,
      color: '#00796B',
    },
    h5: {
      fontWeight: 500,
      color: '#00796B',
    },
    h6: {
      fontWeight: 500,
      color: '#00796B',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #E0F2F1', // Teal 50
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 150, 136, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 150, 136, 0.08)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/images/grid-pattern.png")',
            backgroundRepeat: 'repeat',
            opacity: 0.02,
            zIndex: 0
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;