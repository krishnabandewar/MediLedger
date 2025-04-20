import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navigation />
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'background.paper',
            flex: 1
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default Layout;