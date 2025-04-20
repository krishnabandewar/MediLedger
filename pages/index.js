import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Stack,
  useTheme,
  Paper
} from '@mui/material';
import { useRouter } from 'next/router';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();

  const features = [
    {
      icon: <TimelineIcon />,
      title: 'Supply Chain Visibility',
      description: 'Complete end-to-end tracking of pharmaceutical products with real-time updates and verification'
    },
    {
      icon: <SecurityIcon />,
      title: 'Secure Records',
      description: 'Encrypted storage and controlled access to sensitive medical information using blockchain'
    },
    {
      icon: <HealthAndSafetyIcon />,
      title: 'Patient Safety',
      description: 'Ensure medication authenticity and prevent counterfeits through blockchain verification'
    }
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          width: '100%',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 15 },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            width: '100%',
            background: 'linear-gradient(to bottom right, transparent 49%, white 50%)',
          }
        }}
      >
        <Container maxWidth="xl" sx={{ width: '100%' }}>
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.2
                  }}
                >
                  Transforming Healthcare Through Blockchain
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    lineHeight: 1.6,
                    opacity: 0.9
                  }}
                >
                  MediLedger provides a secure, transparent, and efficient platform 
                  for managing medical records and drug traceability using advanced blockchain technology.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  justifyContent="center" // Changed from flex-start to center
                  alignItems="center"     // Added alignItems center
                  sx={{ width: '100%' }} // Added full width
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      minWidth: '160px',  // Added minimum width
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }}
                    onClick={() => router.push('/dashboard')}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      minWidth: '160px',  // Added minimum width
                      '&:hover': {
                        borderColor: 'grey.100',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onClick={() => router.push('/about')}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ mt: -5, position: 'relative', zIndex: 2, width: '100%' }}>
        <Grid container spacing={3} justifyContent="center">
          {['Secure Transactions', 'Verified Providers', 'Protected Records'].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  bgcolor: 'white',
                  borderRadius: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Typography variant="h4" color="primary.main" gutterBottom>
                  {index === 0 ? '100%' : index === 1 ? '500+' : '10K+'}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {stat}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Solutions Section */}
      <Box sx={{ width: '100%', py: { xs: 8, md: 12 }, backgroundColor: 'grey.50' }}>
        <Container maxWidth="xl" sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h2" 
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2
              }}
            >
              Our Solutions
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Revolutionizing healthcare management with secure blockchain technology
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    borderRadius: 4,
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.light',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        '& svg': {
                          fontSize: 40,
                          color: 'white'
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          width: '100%',
          py: 10, 
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100px',
            width: '100%',
            background: 'linear-gradient(to top right, transparent 49%, #f5f5f5 50%)'
          }
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Transform Healthcare?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join healthcare providers, manufacturers, and patients who are already 
            benefiting from our blockchain solution.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              py: 2,
              px: 6,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
            onClick={() => router.push('/dashboard')}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}