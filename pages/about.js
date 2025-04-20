import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function About() {
  const sections = [
    {
      title: "Drug Supply Chain Management",
      icon: <AccountTreeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      description: "Our blockchain-based system ensures complete visibility and traceability of pharmaceutical products from manufacturer to patient.",
      benefits: [
        "Real-time tracking of drug movements",
        "Verification of drug authenticity",
        "Prevention of counterfeit medications",
        "Complete chain of custody records",
        "Temperature and storage condition monitoring"
      ]
    },
    {
      title: "Medical Records Management",
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      description: "Secure and efficient management of patient medical records with granular access control.",
      benefits: [
        "Encrypted storage of sensitive information",
        "Patient-controlled access permissions",
        "Seamless sharing between healthcare providers",
        "Immutable audit trail of all access",
        "Quick access in emergencies"
      ]
    },
    {
      title: "Blockchain Security",
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      description: "Advanced blockchain technology ensures the highest level of security and transparency.",
      benefits: [
        "Immutable record keeping",
        "Decentralized data storage",
        "Smart contract automation",
        "Cryptographic security",
        "Transparent transactions"
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              mb: 3 
            }}
          >
            About MediLedger
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            Revolutionizing Healthcare Through Blockchain Technology
          </Typography>
        </Box>

        {/* Mission Statement */}
        <Card sx={{ mb: 8, backgroundColor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              To create a secure, transparent, and efficient healthcare ecosystem that ensures patient safety 
              and streamlines healthcare operations through innovative blockchain technology.
            </Typography>
          </CardContent>
        </Card>

        {/* Detailed Sections */}
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ mb: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        {section.icon}
                        <Typography variant="h5" sx={{ mt: 2, color: 'primary.main' }}>
                          {section.title}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="body1" sx={{ mb: 3 }}>
                        {section.description}
                      </Typography>
                      <List>
                        {section.benefits.map((benefit, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={benefit} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Information */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary.main">
            Start Your Journey with MediLedger
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Join healthcare providers, manufacturers, and patients who are already benefiting from our blockchain solution.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <VerifiedUserIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    100% Secure
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enterprise-grade security with blockchain technology
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <HealthAndSafetyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Patient-Centric
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Designed with patient safety and privacy in mind
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}